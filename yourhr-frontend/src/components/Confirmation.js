import React from 'react';
import { Container, Typography, Box, Paper, Button, Stack } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom'; 

const Confirmation = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const { name, email, phone } = location.state || {}; 

  const handleBackToHome = () => {
    navigate('/'); 
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ textAlign: 'center', mt: 4 }}>
      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Thank you for signing up!
        </Typography>
        <Typography variant="body1" paragraph>
      Your resume has been successfully submitted. We will get in touch with you soon.
            </Typography>

        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6">Registration Details</Typography>
          <Stack spacing={1} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="textSecondary">Name:</Typography>
              <Typography variant="body2">{name || 'N/A'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="textSecondary">Email:</Typography>
              <Typography variant="body2">{email || 'N/A'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="textSecondary">Phone:</Typography>
              <Typography variant="body2">{phone || 'N/A'}</Typography>
            </Box>
          </Stack>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleBackToHome} 
        >
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default Confirmation;
