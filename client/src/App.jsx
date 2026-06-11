import { Outlet } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';

import Navbar from './components/Navbar';
import Footer from './components/Footer.jsx';
import theme from './utils/theme.js';
import './app.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          p: 0,
          m: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        boxSizing="border-box"
      >
        <Navbar />

        <Box component="main" sx={{ flex: 1, p: 2 }}>
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
