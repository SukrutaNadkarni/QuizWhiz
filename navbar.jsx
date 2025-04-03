import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useThemeContext } from '../../contexts/ThemeContext'; // Import theme context
import { Brightness4, Brightness7 } from '@mui/icons-material'; // Icons for light/dark mode

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useThemeContext(); // Access dark mode state

  return (
    <AppBar position="static" color={darkMode ? "default" : "primary"}> {/* Change color based on theme */}
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          QuizWhiz
        </Typography>

        <IconButton onClick={toggleDarkMode} color="inherit"> {/* Dark Mode Toggle Button */}
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        <Box>
          {currentUser ? (
            <>
              <Button color="inherit" component={RouterLink} to="/leaderboard">
                Leaderboard
              </Button>
              <Button color="inherit" component={RouterLink} to="/profile">
                Profile
              </Button>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
