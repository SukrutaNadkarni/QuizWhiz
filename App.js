import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Quiz from './components/quiz/Quiz';
import Results from './components/quiz/Results';
import Leaderboard from './components/pages/Leaderboard';
import Profile from './components/pages/Profile';
import CreateQuiz from './components/pages/CreateQuiz';
import PrivateRoute from './components/auth/PrivateRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-quiz" element={
              <PrivateRoute>
                <CreateQuiz />
              </PrivateRoute>
            } />
            <Route path="/quiz/:id" element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            } />
            <Route path="/results/:id" element={
              <PrivateRoute>
                <Results />
              </PrivateRoute>
            } />
            <Route path="/leaderboard" element={
              <PrivateRoute>
                <Leaderboard />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
