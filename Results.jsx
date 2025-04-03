import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, Box, Divider } from '@mui/material';
import { EmojiEvents, School, Timeline } from '@mui/icons-material';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state; 

  if (!state) {
    return (
      <Container maxWidth="sm">
        <Typography>No results found. Please take a quiz first.</Typography>
        <Button onClick={() => navigate('/')} variant="contained" sx={{ mt: 2 }}>
          Go Home
        </Button>
      </Container>
    );
  }

  const { score, totalQuestions, quizTitle, userAnswers } = state;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getFeedback = () => {
    if (percentage >= 80) return { message: 'Excellent work!', icon: <EmojiEvents fontSize="large" color="primary" /> };
    if (percentage >= 60) return { message: 'Good job!', icon: <School fontSize="large" color="primary" /> };
    return { message: 'Keep practicing!', icon: <Timeline fontSize="large" color="primary" /> };
  };

  const feedback = getFeedback();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {quizTitle} Results
          </Typography>

          <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {feedback.icon}
            <Typography variant="h2" color="primary" sx={{ mt: 2 }}>
              {percentage}%
            </Typography>
          </Box>

          <Typography variant="h6" gutterBottom>
            You scored {score} out of {totalQuestions}
          </Typography>

          <Typography variant="body1" color="textSecondary" sx={{ my: 2 }}>
            {feedback.message}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>Answer Breakdown</Typography>

          {userAnswers.map((answer, index) => (
            <Paper 
              key={index} 
              sx={{ 
                p: 2, 
                my: 2, 
                backgroundColor: answer.wasCorrect ? '#d4edda' : '#f8d7da' 
              }}
            >
              <Typography variant="body1"><strong>Q{index + 1}:</strong> {answer.question}</Typography>
              <Typography variant="body2" color="textSecondary">
                Your Answer: <strong>{answer.selected !== null ? answer.selected : "No answer selected"}</strong>
              </Typography>
              <Typography variant="body2">
                Correct Answer: <strong>{answer.correct}</strong>
              </Typography>
              <Typography variant="body2" color={answer.wasCorrect ? 'green' : 'red'}>
                {answer.wasCorrect ? "✔ Correct" : "✖ Incorrect"}
              </Typography>
            </Paper>
          ))}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Try Another Quiz
            </Button>
            <Button variant="outlined" color="primary" onClick={() => navigate('/leaderboard')}>
              View Leaderboard
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Results;
