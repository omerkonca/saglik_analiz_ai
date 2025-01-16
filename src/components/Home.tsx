import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ChatIcon from '@mui/icons-material/Chat';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      title: 'Sağlık Analizi',
      description: 'Belirtilerinizi analiz ederek sağlık durumunuz hakkında bilgi alın.',
      icon: <HealthAndSafetyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      action: () => navigate('/health-analysis'),
      buttonText: 'Analiz Başlat'
    },
    {
      title: 'AI Sohbet',
      description: 'Yapay zeka destekli sohbet ile sağlık sorularınıza yanıt alın.',
      icon: <ChatIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      action: () => navigate('/ai-chat'),
      buttonText: 'Sohbet Başlat'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          Sağlık Analiz AI
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
        >
          Yapay zeka destekli sağlık analizi ve danışmanlık hizmeti
        </Typography>

        {!user && (
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{ minWidth: 200 }}
            >
              Giriş Yap
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Analizlerinizi kaydetmek ve geçmişinizi görüntülemek için giriş yapın
            </Typography>
          </Box>
        )}

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={feature.action}
                    size="large"
                    sx={{ minWidth: 160 }}
                  >
                    {feature.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom color="primary">
            Neden Biz?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Hızlı Analiz
              </Typography>
              <Typography color="text.secondary">
                Belirtilerinizi analiz ederek hızlı sonuçlar alın
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                7/24 Destek
              </Typography>
              <Typography color="text.secondary">
                AI sohbet ile istediğiniz zaman destek alın
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Güvenli Hizmet
              </Typography>
              <Typography color="text.secondary">
                Verileriniz güvenle saklanır ve korunur
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
