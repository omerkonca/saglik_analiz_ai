import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import emailjs from '@emailjs/browser';
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
  Stack,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Snackbar,
  Alert,
  Divider
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
  DirectionsRun,
  Message,
  Phone,
  WhatsApp,
  ContactSupport
} from '@mui/icons-material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

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
  const form = useRef<HTMLFormElement>(null);
  const [openHealthDialog, setOpenHealthDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [loading, setLoading] = useState(false);

  // VKİ hesaplama fonksiyonu
  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
  };

  // Kullanıcı sağlık verileri (normalde API'den gelecek)
  const [healthData, setHealthData] = useState({
    bloodType: 'A Rh+',
    height: 175,
    weight: 70,
    bmi: calculateBMI(70, 175), // Boy ve kilodan otomatik hesaplama
    lastUpdated: new Date().toLocaleDateString('tr-TR')
  });

  // Düzenleme formu için state
  const [editForm, setEditForm] = useState({ ...healthData });

  // İletişim formu state'i
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    email: 'omerkonca01@gmail.com'
  });

  const bloodTypes = [
    'A Rh+', 'A Rh-', 
    'B Rh+', 'B Rh-', 
    'AB Rh+', 'AB Rh-', 
    '0 Rh+', '0 Rh-'
  ];

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Zayıf', color: theme.palette.warning.main };
    if (bmi < 25) return { text: 'Normal', color: theme.palette.success.main };
    if (bmi < 30) return { text: 'Kilolu', color: theme.palette.warning.main };
    return { text: 'Obez', color: theme.palette.error.main };
  };

  // Form değişikliklerini yönetme
  const handleFormChange = (field: string, value: number | string) => {
    const newForm = { ...editForm, [field]: value };
    
    // Boy veya kilo değiştiğinde VKİ'yi otomatik güncelle
    if (field === 'height' || field === 'weight') {
      const height = field === 'height' ? Number(value) : editForm.height;
      const weight = field === 'weight' ? Number(value) : editForm.weight;
      newForm.bmi = calculateBMI(weight, height);
    }
    
    setEditForm(newForm);
  };

  // Değişiklikleri kaydetme
  const handleEditSubmit = () => {
    setHealthData({
      ...editForm,
      lastUpdated: new Date().toLocaleDateString('tr-TR')
    });
    setOpenEditDialog(false);
  };

  // EmailJS başlatma
  useEffect(() => {
    emailjs.init("KiW2zwwTLgRR7i5c0");
  }, []);

  // İletişim formu gönderme
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setLoading(true);
    try {
      const result = await emailjs.sendForm(
        'service_imc2cxq',
        'template_wy5x1ks',
        form.current,
        'KiW2zwwTLgRR7i5c0'
      );

      if (result.status === 200) {
        setSnackbar({
          open: true,
          message: 'Mesajınız başarıyla gönderildi!',
          severity: 'success'
        });
        setOpenContactDialog(false);
        setContactForm({ ...contactForm, subject: '', message: '' });
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      setSnackbar({
        open: true,
        message: error?.text || 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const bmiStatus = getBMIStatus(healthData.bmi);

  const performanceData = [
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
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3, position: 'relative' }}>
      {/* Hızlı İletişim Butonu */}
      <SpeedDial
        ariaLabel="İletişim Seçenekleri"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<Message />}
          tooltipTitle="Mesaj Gönder"
          onClick={() => setOpenContactDialog(true)}
        />
        <SpeedDialAction
          icon={<WhatsApp />}
          tooltipTitle="WhatsApp"
          onClick={() => window.open('https://wa.me/+905555555555', '_blank')}
        />
        <SpeedDialAction
          icon={<Phone />}
          tooltipTitle="Ara"
          onClick={() => window.open('tel:+905555555555')}
        />
      </SpeedDial>

      {/* Üst Bilgi Çubuğu */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          mb: 3, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ContactSupport sx={{ color: 'white', mr: 1 }} />
          <Typography variant="h5" sx={{ color: 'white' }}>Sağlık Paneli</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Mesaj Gönder">
            <IconButton 
              color="inherit" 
              sx={{ color: 'white' }}
              onClick={() => setOpenContactDialog(true)}
            >
              <Message />
            </IconButton>
          </Tooltip>
          <IconButton color="inherit" sx={{ color: 'white' }}>
            <Badge badgeContent={2} color="error">
              <Notifications />
            </Badge>
          </IconButton>
        </Stack>
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
                onClick={() => setOpenEditDialog(true)}
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
                      <Typography variant="h6">{healthData.bloodType}</Typography>
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
                      <Typography variant="h6" sx={{ color: bmiStatus.color }}>
                        {healthData.bmi}
                      </Typography>
                      <Typography variant="caption">
                        {bmiStatus.text}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Son güncelleme: {healthData.lastUpdated}
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
                  <LineChart data={performanceData}>
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
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card elevation={6}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalHospital sx={{ mr: 1 }} />
                      En Yakın Hastaneler
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
                      Hastaneleri Göster
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={6}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <MedicalServices sx={{ mr: 1 }} />
                      En Yakın Diş Klinikleri
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
                              `https://www.google.com/maps/search/diş+kliniği/@${latitude},${longitude},14z`,
                              '_blank'
                            );
                          });
                        }
                      }}
                    >
                      Diş Kliniklerini Göster
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
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
                  <Typography variant="h6">{healthData.height} cm</Typography>
                </Paper>
                <Paper elevation={1} sx={{ p: 2, flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">Kilo</Typography>
                  <Typography variant="h6">{healthData.weight} kg</Typography>
                </Paper>
                <Paper elevation={1} sx={{ p: 2, flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">VKİ</Typography>
                  <Typography variant="h6" color={bmiStatus.color}>
                    {healthData.bmi} ({bmiStatus.text})
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

      {/* Profil Düzenleme Dialog */}
      <Dialog 
        open={openEditDialog} 
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Edit sx={{ mr: 1 }} />
            Profil Bilgilerini Düzenle
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Kan Grubu</InputLabel>
              <Select
                value={editForm.bloodType}
                label="Kan Grubu"
                onChange={(e) => handleFormChange('bloodType', e.target.value)}
              >
                {bloodTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Boy (cm)"
              type="number"
              value={editForm.height}
              onChange={(e) => handleFormChange('height', Number(e.target.value))}
              fullWidth
              InputProps={{ inputProps: { min: 0, max: 300 } }}
            />
            <TextField
              label="Kilo (kg)"
              type="number"
              value={editForm.weight}
              onChange={(e) => handleFormChange('weight', Number(e.target.value))}
              fullWidth
              InputProps={{ inputProps: { min: 0, max: 300 } }}
            />
            <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Hesaplanan VKİ
              </Typography>
              <Typography variant="h6" color={bmiStatus.color}>
                {editForm.bmi} - {getBMIStatus(editForm.bmi).text}
              </Typography>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>İptal</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>

      {/* İletişim Dialog */}
      <Dialog 
        open={openContactDialog} 
        onClose={() => setOpenContactDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Message sx={{ mr: 1 }} />
            Mesaj Gönder
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box 
            component="form" 
            ref={form}
            onSubmit={handleContactSubmit}
            sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <input type="hidden" name="to_email" value={contactForm.email} />
            <input type="hidden" name="from_name" value={user?.displayName || 'Kullanıcı'} />
            <input type="hidden" name="reply_to" value={user?.email || contactForm.email} />
            
            <TextField
              name="subject"
              label="Konu"
              value={contactForm.subject}
              onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
              fullWidth
              required
            />
            <TextField
              name="message"
              label="Mesajınız"
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              multiline
              rows={4}
              fullWidth
              required
            />
            <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" color="text.secondary">
                İletişim Bilgileri
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email fontSize="small" color="primary" />
                  {contactForm.email}
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Phone fontSize="small" color="primary" />
                  +90 555 555 5555
                </Typography>
              </Box>
            </Paper>
            <DialogActions sx={{ px: 0, pb: 0 }}>
              <Button onClick={() => setOpenContactDialog(false)}>İptal</Button>
              <Button 
                type="submit"
                variant="contained" 
                color="primary"
                disabled={loading || !contactForm.subject || !contactForm.message}
              >
                {loading ? 'Gönderiliyor...' : 'Gönder'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar Bildirimleri */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProfile;