import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@mui/material';

// Mock leaderboard data
const mockLeaderboard = [
  {
    userId: '1',
    displayName: 'Person I',
    photoURL: '',
    score: 95,
    quizId: '1',
    quizTitle: 'General Knowledge',
  },
  {
    userId: '2',
    displayName: 'Person II',
    photoURL: '',
    score: 90,
    quizId: '1',
    quizTitle: 'General Knowledge',
  },
  {
    userId: '3',
    displayName: 'Person III',
    photoURL: '',
    score: 85,
    quizId: '2',
    quizTitle: 'Science Quiz',
  },
];

const Leaderboard = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Leaderboard
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Quiz</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockLeaderboard.map((entry, index) => (
              <TableRow key={entry.userId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={entry.photoURL}
                      alt={entry.displayName}
                      sx={{ width: 32, height: 32, mr: 2 }}
                    >
                      {entry.displayName[0]}
                    </Avatar>
                    {entry.displayName}
                  </div>
                </TableCell>
                <TableCell>{entry.quizTitle}</TableCell>
                <TableCell align="right">{entry.score}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Leaderboard;
