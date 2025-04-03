import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  LinearProgress,
  Box,
} from '@mui/material';
import { quizzes } from '../../components/data/quizzes';
import { useAuth } from '../../contexts/AuthContext';
import { saveQuizResult } from '../../services/userService';
import { useThemeContext } from '../../contexts/ThemeContext'; // ✅ Import Theme Context

import mainBG from '../../assets/MainBG.jpg';
import scienceBG from '../../assets/scienceBG.jpg';
import historyBG from '../../assets/historyBG.jpg';
import mathBG from '../../assets/mathBG.jpg';
import literatureBG from '../../assets/litBG.jpg';

const quizBackgrounds = {
  science: scienceBG,
  history: historyBG,
  mathematics: mathBG,
  literature: literatureBG,
};

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { darkMode } = useThemeContext(); // ✅ Get dark mode state

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const customQuizzes = JSON.parse(localStorage.getItem('customQuizzes') || '{}');
  const quiz = id ? (quizzes[id] || customQuizzes[id]) : null;

  const timeoutHandled = useRef(false);

  useEffect(() => {
    if (!quiz) {
      navigate('/');
      return;
    }
    setTimeLeft(quiz.timePerQuestion);
    timeoutHandled.current = false;
  }, [quiz, navigate]);

  useEffect(() => {
    if (!quiz) return;

    timeoutHandled.current = false;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1 && !timeoutHandled.current) {
          timeoutHandled.current = true;
          clearInterval(timer);
          handleNextQuestion();
          return quiz.timePerQuestion;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, quiz]);

  const handleNextQuestion = () => {
    if (!quiz || !currentUser) return;

    const isCorrect = selectedAnswer === quiz.questions[currentQuestion].correctAnswer;
    const newAnswer = {
      question: quiz.questions[currentQuestion].text,
      selected: selectedAnswer !== null ? quiz.questions[currentQuestion].options[selectedAnswer] : 'No Answer',
      correct: quiz.questions[currentQuestion].options[quiz.questions[currentQuestion].correctAnswer],
      wasCorrect: isCorrect,
    };

    setUserAnswers((prevAnswers) => [...prevAnswers, newAnswer]);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(quiz.timePerQuestion);
      timeoutHandled.current = false;
    } else {
      const finalScore = isCorrect ? score + 1 : score;

      saveQuizResult(currentUser.id, {
        quizId: quiz.id,
        quizTitle: quiz.title,
        score: finalScore,
        totalQuestions: quiz.questions.length,
        date: new Date().toISOString(),
      });

      navigate(`/results/${id}`, {
        state: {
          score: finalScore,
          totalQuestions: quiz.questions.length,
          quizTitle: quiz.title,
          userAnswers: [...userAnswers, newAnswer],
        },
      });
    }
  };

  if (!quiz) {
    return (
      <Container maxWidth="md">
        <Typography>Quiz not found.</Typography>
      </Container>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <Box
      sx={{
        backgroundImage: `url(${quizBackgrounds[id] || mainBG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        backgroundColor: darkMode ? '#121212' : '#f5f5f5', // ✅ Dark mode background
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Paper
            sx={{
              p: 4,
              backgroundColor: darkMode ? '#1e1e1e' : 'white', // ✅ Dark mode paper color
              color: darkMode ? '#ffffff' : '#000000', // ✅ Dark mode text color
            }}
          >
            <Typography variant="h4" gutterBottom>
              {quiz.title}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={(timeLeft / quiz.timePerQuestion) * 100}
              sx={{ mb: 2 }}
            />

            <Typography variant="body2" color={darkMode ? 'secondary' : 'textSecondary'} sx={{ mb: 2 }}>
              Time left: {timeLeft} seconds
            </Typography>

            <Typography variant="h6" gutterBottom>
              Question {currentQuestion + 1} of {quiz.questions.length}
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {question.text}
            </Typography>

            <RadioGroup
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(Number(e.target.value))}
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio sx={{ color: darkMode ? 'white' : 'black' }} />} // ✅ Dark mode radio buttons
                  label={option}
                  sx={{ color: darkMode ? 'white' : 'black' }} // ✅ Dark mode label text
                />
              ))}
            </RadioGroup>

            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              sx={{ mt: 3 }}
            >
              {currentQuestion + 1 === quiz.questions.length ? 'Finish' : 'Next'}
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Quiz;
