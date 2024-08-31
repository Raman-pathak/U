import React, { useState, forwardRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  FormControl,
  IconButton,
  Snackbar,
  CircularProgress,
  Box,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { FileUpload as FileUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />;
});

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState(null);
  const [position, setPosition] = useState(''); // New state for position
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setMessage('Please upload a resume');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('resume', resume);
    formData.append('position', position); // Include position in form data

    try {
      await axios.post('http://localhost:5000/api/users/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(true);
      setMessage('Sign up successful!');
      setTimeout(() => navigate('/confirmation', { state: { name, email, phone, position } }), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error: An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setMessage('');
    setSuccess(false);
  };

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setResume(null);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        backgroundColor: 'lightblue', // Light blue background
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle, rgba(255,255,255,0.1) 20%, transparent 40%)`,
          opacity: 0.5,
          zIndex: -1
        }
      }}
    >
      <Container component="main" maxWidth="xs">
        <Typography variant="h3" gutterBottom align="center" sx={{ mb: 2 }}>
        
        </Typography>
        <Card sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={handleInputChange(setName)}
                  required
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  required
                />
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={handleInputChange(setPhone)}
                  required
                />
                <FormControl fullWidth>
                  <InputLabel id="position-label">Job Position</InputLabel>
                  <Select
                    labelId="position-label"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    label="Job Position"
                    required
                  >
                    <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                    <MenuItem value="Product Manager">Product Manager</MenuItem>
                    <MenuItem value="Data Scientist">Data Scientist</MenuItem>
                 
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <Box 
                    sx={{ 
                      border: '1px dashed #ccc', 
                      padding: 2, 
                      borderRadius: 2, 
                      textAlign: 'center', 
                      position: 'relative' 
                    }}
                  >
                    <input
                      accept=".pdf,.doc,.docx" 
                      id="resume-upload"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <label htmlFor="resume-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<FileUploadIcon />}
                      >
                        Upload Resume
                      </Button>
                    </label>
                    {resume && (
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          mt: 2 
                        }}
                      >
                        <Typography variant="body2" noWrap>{resume.name}</Typography>
                        <IconButton onClick={removeFile}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={loading}
                  sx={{ position: 'relative' }}
                >
                  {loading && <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', marginLeft: '-12px', marginTop: '-12px' }} />}
                  Sign Up
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
        <Snackbar open={!!message} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={success ? 'success' : 'error'}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default SignupForm;
