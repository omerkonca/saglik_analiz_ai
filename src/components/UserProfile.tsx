import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Avatar,
  Paper,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  LinearProgress,
  Chip,
  Badge,
  Tabs,
  Tab,
  Fade,
  useTheme,
  Stack
} from '@mui/material';
import {
  LocalHospital,
  Email,
  Timeline,
  LocationOn,
  Favorite,
  Accessibility,
  MedicalServices,
  QueryStats,
  Edit,
  Notifications,
  CalendarMonth,
  LocalPharmacy,
  Restaurant,
  DirectionsRun
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Fade in={value === index}>
            <div>{children}</div>
          </Fade>
        </Box>
      )}
    </div>
  );
};

const UserProfile = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [openHealthDialog, setOpenHealthDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // Kullanıcı sağlık verileri (normalde API'den gelecek)
  const userHealth = {
    bloodType: 'A Rh+',
    height: 175, // cm
    weight: 70, // kg
    bmi: 22.9,
    lastUpdated: '15 Ocak 2025'
  };

  // VKİ durumu hesaplama
  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Zayıf', color: theme.palette.warning.main };
    if (bmi < 25) return { text: 'Normal', color: theme.palette.success.main };
    if (bmi < 30) return { text: 'Kilolu', color: theme.palette.warning.main };
    return { text: 'Obez', color: theme.palette.error.main };
  };

  const bmiStatus = getBMIStatus(userHealth.bmi);

  const healthData = [
    { name: 'Ocak', value: 65 },
    { name: 'Şubat', value: 68 },
    { name: 'Mart', value: 72 },
    { name: 'Nisan', value: 70 },
    { name: 'Mayıs', value: 75 }
  ];

  const pieData = [
    { name: 'Egzersiz', value: 35, color: '#2196f3' },
    { name: 'Diyet', value: 30, color: '#4caf50' },
    { name: 'Uyku', value: 35, color: '#ff9800' }
  ];

  const healthMetrics = [
    { 
      icon: <Favorite color="error" />, 
      title: 'Kalp Sağlığı', 
      value: 'Normal',
      color: 'success.main',
      progress: 85
    },
    { 
      icon: <DirectionsRun color="primary" />, 
      title: 'Fiziksel Aktivite', 
      value: 'Orta Düzey',
      color: 'warning.main',
      progress: 65
    },
    { 
      icon: <Restaurant color="secondary" />, 
      title: 'Beslenme', 
      value: 'İyi',
      color: 'info.main',
      progress: 75
    }
  ];

  const upcomingAppointments = [
    {
      date: '25 Ocak 2025',
      type: 'Genel Kontrol',
      doctor: 'Dr. Ahmet Yılmaz'
    },
    {
      date: '1 Şubat 2025',
      type: 'Diş Kontrolü',
      doctor: 'Dr. Ayşe Demir'
    }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      {/* Üst Bilgi Çubuğu */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          mb: 3, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`
        }}
      >
        <Typography variant="h5" sx={{ color: 'white' }}>Sağlık Paneli</Typography>
        <Box>
          <IconButton color="inherit" sx={{ color: 'white' }}>
            <Badge badgeContent={2} color="error">
              <Notifications />
            </Badge>
          </IconButton>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Profil Kartı */}
        <Grid item xs={12} md={4}>
          <Card elevation={6} sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', position: 'relative' }}>
              <IconButton 
                sx={{ 
                  position: 'absolute', 
                  right: 8, 
                  top: 8,
                  backgroundColor: 'rgba(0,0,0,0.04)',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.08)' }
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
              <Avatar
                sx={{ 
                  width: 150, 
                  height: 150, 
                  margin: '0 auto 20px',
                  border: '4px solid',
                  borderColor: 'primary.main',
                  boxShadow: theme.shadows[3]
                }}
                src={user?.photoURL || ''}
              >
                {user?.email?.[0]?.toUpperCase()}
              </Avatar>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {user?.displayName || 'Kullanıcı'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 1 }} fontSize="small" />
                {user?.email}
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="center" mb={2}>
                <Chip 
                  icon={<CalendarMonth />} 
                  label="Üyelik: 2 Yıl" 
                  color="primary" 
                  variant="outlined" 
                />
              </Stack>

              {/* Kan Grubu ve VKİ Bilgileri */}
              <Box sx={{ mt: 2, mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 2, 
                        background: `linear-gradient(45deg, ${theme.palette.primary.light} 10%, ${theme.palette.primary.main} 90%)`,
                        color: 'white'
                      }}
                    >
                      <Typography variant="subtitle2">Kan Grubu</Typography>
                      <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                        {userHealth.bloodType}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 2, 
                        background: `linear-gradient(45deg, ${bmiStatus.color}40 10%, ${bmiStatus.color} 90%)`,
                        color: 'white'
                      }}
                    >
                      <Typography variant="subtitle2">VKİ</Typography>
                      <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                        {userHealth.bmi.toFixed(1)}
                      </Typography>
                      <Typography variant="caption">
                        {bmiStatus.text}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Son güncelleme: {userHealth.lastUpdated}
                </Typography>
              </Box>

              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setOpenHealthDialog(true)}
                startIcon={<QueryStats />}
                fullWidth
              >
                Detaylı Sağlık Raporu
              </Button>
            </CardContent>
          </Card>

          {/* Yaklaşan Randevular */}
          <Card elevation={6} sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <MedicalServices sx={{ mr: 1 }} />
                Yaklaşan Randevular
              </Typography>
              <Stack spacing={2}>
                {upcomingAppointments.map((appointment, index) => (
                  <Paper 
                    key={index} 
                    elevation={2} 
                    sx={{ 
                      p: 2,
                      borderLeft: '4px solid',
                      borderColor: 'primary.main'
                    }}
                  >
                    <Typography variant="subtitle2" color="primary">
                      {appointment.date}
                    </Typography>
                    <Typography variant="body1">
                      {appointment.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {appointment.doctor}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Sağlık İstatistikleri */}
        <Grid item xs={12} md={8}>
          <Card elevation={6}>
            <CardContent>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
              >
                <Tab label="Genel Bakış" icon={<Timeline />} iconPosition="start" />
                <Tab label="Aktivite" icon={<DirectionsRun />} iconPosition="start" />
                <Tab label="İlaçlar" icon={<LocalPharmacy />} iconPosition="start" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Sağlık Performans Grafiği
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={theme.palette.primary.main} 
                      strokeWidth={3}
                      dot={{ stroke: theme.palette.primary.main, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Aktivite Dağılımı
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <ResponsiveContainer width="50%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <Box>
                    {pieData.map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            mr: 1,
                            backgroundColor: item.color,
                            borderRadius: '50%'
                          }}
                        />
                        <Typography variant="body2">
                          {item.name}: %{item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Aktif İlaç Tedavisi Bulunmamaktadır
                </Typography>
              </TabPanel>
            </CardContent>
          </Card>

          {/* Sağlık Göstergeleri */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {healthMetrics.map((metric, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    background: `linear-gradient(45deg, ${theme.palette.background.paper} 30%, ${theme.palette.background.default} 90%)`
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Tooltip title={metric.title}>
                      {metric.icon}
                    </Tooltip>
                    <Box ml={2}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {metric.title}
                      </Typography>
                      <Typography variant="h6">
                        {metric.value}
                      </Typography>
                    </Box>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={metric.progress} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4
                      }
                    }} 
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* En Yakın Sağlık Kuruluşları */}
        <Grid item xs={12}>
          <Card elevation={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalHospital sx={{ mr: 1 }} />
                En Yakın Sağlık Kuruluşları
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                startIcon={<LocationOn />}
                sx={{ mt: 2 }}
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                      const { latitude, longitude } = position.coords;
                      window.open(
                        `https://www.google.com/maps/search/hastane/@${latitude},${longitude},14z`,
                        '_blank'
                      );
                    });
                  }
                }}
              >
                En Yakın Hastaneleri Göster
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detaylı Sağlık Raporu Dialog */}
      <Dialog 
        open={openHealthDialog} 
        onClose={() => setOpenHealthDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <QueryStats sx={{ mr: 1 }} />
            Detaylı Sağlık Raporu
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Fiziksel Ölçümler
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Paper elevation={1} sx={{ p: 2, flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">Boy</Typography>
                  <Typography variant="h6">{userHealth.height} cm</Typography>
                </Paper>
                <Paper elevation={1} sx={{ p: 2, flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">Kilo</Typography>
                  <Typography variant="h6">{userHealth.weight} kg</Typography>
                </Paper>
                <Paper elevation={1} sx={{ p: 2, flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">VKİ</Typography>
                  <Typography variant="h6" sx={{ color: bmiStatus.color }}>
                    {userHealth.bmi.toFixed(1)} ({bmiStatus.text})
                  </Typography>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Genel Sağlık Durumu
              </Typography>
              <Typography variant="body2" paragraph>
                Kullanıcının genel sağlık durumu iyi seviyededir. Düzenli egzersiz ve dengeli beslenme ile desteklenmektedir.
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Öneriler
              </Typography>
              <ul>
                <li>
                  <Typography variant="body2">Günlük su tüketimini artırın</Typography>
                </li>
                <li>
                  <Typography variant="body2">Düzenli uyku düzenini koruyun</Typography>
                </li>
                <li>
                  <Typography variant="body2">Haftalık egzersiz rutinine devam edin</Typography>
                </li>
              </ul>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UserProfile;