import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Grade as GradeIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { getUserStats } from '../../services/userService';
import backgroundImage from '../../assets/MainBG.jpg';

const Profile = () => {
  const { currentUser } = useAuth();
  const stats = currentUser ? getUserStats(currentUser.id) : null;

  if (!currentUser || !stats) {
    return (
      <Container maxWidth="md">
        <Typography>Please log in to view your profile.</Typography>
      </Container>
    );
  }

  const StatCard = ({ icon, title, value, color }) => (
    <Card style={{ height: '100%' }}>
      <CardContent>
        <Box style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <Box style={{ color, marginRight: 8 }}>{icon}</Box>
          <Typography color="textSecondary" variant="h6">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        // backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
    <Container maxWidth="lg" style={{ marginTop: 32, marginBottom: 32 }}>
      <Paper style={{ padding: 32 }}>
        <Typography variant="h4" gutterBottom>
          Your Profile
        </Typography>
        
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {currentUser.email}
        </Typography>

        <Grid container spacing={4} style={{ marginTop: 16 }}>
          <Grid item xs={12} md={4}>
            <StatCard
              icon={<AssessmentIcon />}
              title="Total Quizzes"
              value={stats.totalQuizzes}
              color="#2196f3"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              icon={<GradeIcon />}
              title="Best Score"
              value={`${stats.bestScore}%`}
              color="#4caf50"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              icon={<TimelineIcon />}
              title="Average Score"
              value={`${stats.averageScore}%`}
              color="#ff9800"
            />
          </Grid>
        </Grid>

        <Typography variant="h5" style={{ marginTop: 48, marginBottom: 24 }}>
          Recent Quiz Results
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Quiz</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.recentQuizzes.map((quiz) => {
                const percentage = Math.round((quiz.score / quiz.totalQuestions) * 100);
                return (
                  <TableRow key={quiz.date}>
                    <TableCell>{quiz.quizTitle}</TableCell>
                    <TableCell>
                      {new Date(quiz.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {quiz.score} / {quiz.totalQuestions}
                    </TableCell>
                    <TableCell style={{ width: '30%' }}>
                      <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <Box style={{ width: '100%', marginRight: 8 }}>
                          <LinearProgress
                            variant="determinate"
                            value={percentage}
                            color={percentage >= 70 ? 'success' : percentage >= 40 ? 'warning' : 'error'}
                          />
                        </Box>
                        <Box style={{ minWidth: 35 }}>
                          <Typography variant="body2" color="textSecondary">
                            {percentage}%
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
    </Box>
  );
};

export default Profile;
