import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Button
} from '@mui/material';
import { Receipt, Paid, PendingActions, Analytics } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const stats = [
    { title: 'Facturas este mes', value: '24', icon: <Receipt fontSize="large" />, color: 'primary.main' },
    { title: 'Pagadas', value: '18', icon: <Paid fontSize="large" />, color: 'success.main' },
    { title: 'Pendientes', value: '5', icon: <PendingActions fontSize="large" />, color: 'warning.main' },
    { title: 'Monto total', value: 'S/ 145,680.50', icon: <Analytics fontSize="large" />, color: 'info.main' }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Panel de Control - Contabilidad Sider Perú
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ bgcolor: stat.color, color: 'white' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Typography variant="h6">{stat.title}</Typography>
                    <Typography variant="h4">{stat.value}</Typography>
                  </Box>
                  <Box sx={{ alignSelf: 'center' }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Acciones Rápidas
            </Typography>
            <Box mt={2}>
              <Button 
                variant="contained" 
                component={Link} 
                to="/facturas/nueva" 
                fullWidth 
                sx={{ mb: 2, py: 1.5 }}
                startIcon={<Receipt />}
              >
                Crear Nueva Factura
              </Button>
              <Button 
                variant="outlined" 
                component={Link} 
                to="/facturas" 
                fullWidth 
                sx={{ py: 1.5 }}
                startIcon={<Paid />}
              >
                Ver Todas las Facturas
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Facturas Recientes
            </Typography>
            <Box>
              <Typography variant="body2" color="text.secondary">
                F001-0024 - Constructora Andina SAC - S/ 12,450.00
              </Typography>
              <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                15/06/2023 - Pagada
              </Typography>

              <Typography variant="body2" color="text.secondary">
                F001-0023 - Metalúrgica del Norte EIRL - $ 8,750.50
              </Typography>
              <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                14/06/2023 - Pendiente
              </Typography>

              <Typography variant="body2" color="text.secondary">
                F001-0022 - Ferretería Central SAC - S/ 5,320.00
              </Typography>
              <Typography variant="caption" display="block">
                12/06/2023 - Pagada
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;