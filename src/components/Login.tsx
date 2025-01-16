import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h1" gutterBottom textAlign="center">
              Giriş Yap
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center" gutterBottom>
              Sağlık analizlerinizi kaydetmek ve geçmiş analizlerinizi görüntülemek için giriş yapın.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                sx={{ mt: 2 }}
              >
                Google ile Giriş Yap
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
