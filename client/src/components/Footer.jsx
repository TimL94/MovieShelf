import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        Movie Tracker
      </Typography>
    </Box>
  );
}

export default Footer;
