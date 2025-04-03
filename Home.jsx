import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, CardMedia, Box, Divider } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { quizzes } from '../../components/data/quizzes';
import backgroundImage from '../../assets/MainBG.jpg';

const subjectImages = {
  science: require('../../assets/scienceBG.jpg'),
  history: require('../../assets/historyBG.jpg'),
  mathematics: require('../../assets/mathBG.jpg'),
  literature: require('../../assets/litBG.jpg'),
};

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const customQuizzes = JSON.parse(localStorage.getItem('customQuizzes') || '{}');

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
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1">
            Welcome to QuizWhiz
          </Typography>
          {currentUser && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate('/create-quiz')}
            >
              Create Quiz
            </Button>
          )}
        </Box>
        
        {!currentUser && (
          <Typography variant="h6" color="textSecondary" paragraph>
            Sign in to start taking quizzes and track your progress!
          </Typography>
        )}

        <Typography variant="h4" sx={{ mt: 4, mb: 3, textAlign: 'center' }}>
          Featured Quizzes
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {Object.values(quizzes).map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz.id}>
              <Box display="flex" justifyContent="center">
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={subjectImages[quiz.id]}
                    alt={quiz.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {quiz.title}
                    </Typography>
                    <Typography color="textSecondary" paragraph>
                      {quiz.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Time per question: {quiz.timePerQuestion} seconds
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="large"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => currentUser ? navigate(`/quiz/${quiz.id}`) : navigate('/login')}
                    >
                      {currentUser ? 'Start Quiz' : 'Login to Start'}
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>

        {currentUser && Object.keys(customQuizzes).length > 0 && (
          <>
            <Divider sx={{ my: 6 }} />
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
              Your Custom Quizzes
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              {Object.values(customQuizzes).map((quiz) => (
                <Grid item xs={12} sm={6} md={4} key={quiz.id}>
                  <Box display="flex" justifyContent="center">
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: 345 }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                          {quiz.title}
                        </Typography>
                        <Typography color="textSecondary" paragraph>
                          {quiz.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Time per question: {quiz.timePerQuestion} seconds
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Questions: {quiz.questions.length}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="large"
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={() => navigate(`/quiz/${quiz.id}`)}
                        >
                          Start Quiz
                        </Button>
                      </CardActions>
                    </Card>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Home;
