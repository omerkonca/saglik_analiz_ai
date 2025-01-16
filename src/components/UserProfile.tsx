import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const UserProfile = () => {
  const { user, updateUserProfile, getAnalysisHistory } = useAuth();
  const [profileData, setProfileData] = useState({
    age: user?.age || '',
    gender: user?.gender || '',
    height: user?.height || '',
    weight: user?.weight || '',
    chronicDiseases: user?.chronicDiseases || [],
    medications: user?.medications || []
  });
  const [analysisHistory, setAnalysisHistory] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAnalysisHistory();
  }, []);

  const loadAnalysisHistory = async () => {
    try {
      const history = await getAnalysisHistory();
      setAnalysisHistory(history);
    } catch (err) {
      console.error('Analiz geçmişi yüklenirken hata:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        ...profileData,
        age: Number(profileData.age),
        height: Number(profileData.height),
        weight: Number(profileData.weight)
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Profil güncellenirken bir hata oluştu');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Profil Bilgileri
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Yaş"
                      name="age"
                      type="number"
                      value={profileData.age}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Cinsiyet</InputLabel>
                      <Select
                        name="gender"
                        value={profileData.gender}
                        onChange={handleChange}
                        label="Cinsiyet"
                      >
                        <MenuItem value="male">Erkek</MenuItem>
                        <MenuItem value="female">Kadın</MenuItem>
                        <MenuItem value="other">Diğer</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Boy (cm)"
                      name="height"
                      type="number"
                      value={profileData.height}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Kilo (kg)"
                      name="weight"
                      type="number"
                      value={profileData.weight}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Profili Güncelle
                    </Button>
                  </Grid>
                </Grid>
              </form>
              {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Profil başarıyla güncellendi!
                </Alert>
              )}
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Analiz Geçmişi
              </Typography>
              <List>
                {analysisHistory.map((analysis, index) => (
                  <React.Fragment key={analysis.id}>
                    <ListItem>
                      <ListItemText
                        primary={new Date(analysis.date).toLocaleDateString('tr-TR')}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Belirtiler: {Object.values(analysis.symptoms).flat().join(', ')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Sonuç: {analysis.result.recommendation}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < analysisHistory.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
                {analysisHistory.length === 0 && (
                  <ListItem>
                    <ListItemText primary="Henüz analiz geçmişi bulunmuyor." />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
