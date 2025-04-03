import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Quiz, Question } from '../../types';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [questions, setQuestions] = useState([
    {
      id: '1',
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: (questions.length + 1).toString(),
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = {
      ...newQuestions[index],
      [field]: value,
    };
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    const newQuiz = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      timePerQuestion,
      questions,
    };

    // Get existing quizzes from localStorage or initialize empty object
    const existingQuizzes = JSON.parse(localStorage.getItem('customQuizzes') || '{}');
    
    // Add new quiz
    existingQuizzes[newQuiz.id] = newQuiz;
    
    // Save back to localStorage
    localStorage.setItem('customQuizzes', JSON.stringify(existingQuizzes));

    // Navigate back to home
    navigate('/');
  };

  const isValid = () => {
    return (
      title.trim() !== '' &&
      description.trim() !== '' &&
      timePerQuestion > 0 &&
      questions.every(
        (q) =>
          q.text.trim() !== '' &&
          q.options.every((opt) => opt.trim() !== '') &&
          q.correctAnswer >= 0
      )
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Quiz
        </Typography>

        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={2}
            required
          />

          <TextField
            type="number"
            label="Time per Question (seconds)"
            value={timePerQuestion}
            onChange={(e) => setTimePerQuestion(Number(e.target.value))}
            margin="normal"
            required
            sx={{ width: 200 }}
          />

          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Questions
          </Typography>

          {questions.map((question, questionIndex) => (
            <Card key={question.id} sx={{ mt: 3, p: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      label={`Question ${questionIndex + 1}`}
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(questionIndex, 'text', e.target.value)
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      onClick={() => handleRemoveQuestion(questionIndex)}
                      disabled={questions.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                  {question.options.map((option, optionIndex) => (
                    <TextField
                      key={optionIndex}
                      fullWidth
                      label={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(questionIndex, optionIndex, e.target.value)
                      }
                      margin="normal"
                      required
                    />
                  ))}
                </Box>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Correct Answer</InputLabel>
                  <Select
                    value={question.correctAnswer}
                    label="Correct Answer"
                    onChange={(e) =>
                      handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)
                    }
                  >
                    {question.options.map((_, index) => (
                      <MenuItem key={index} value={index}>
                        Option {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          ))}

          <Button
            startIcon={<AddIcon />}
            onClick={handleAddQuestion}
            sx={{ mt: 2 }}
          >
            Add Question
          </Button>

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!isValid()}
            >
              Create Quiz
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateQuiz;
