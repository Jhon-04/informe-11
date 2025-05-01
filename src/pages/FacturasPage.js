import React from 'react';
import FacturaList from '../components/FacturaList';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const FacturasPage = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Gestión de Facturas
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/facturas/nueva"
          startIcon={<Add />}
        >
          Nueva Factura
        </Button>
      </Box>
      <FacturaList />
    </Box>
  );
};

export default FacturasPage;