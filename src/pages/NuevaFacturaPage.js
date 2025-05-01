import React from 'react';
import FacturaForm from '../components/FacturaForm';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import facturaService from '../services/facturaService';

const NuevaFacturaPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await facturaService.create(formData);
      navigate('/facturas', { state: { message: 'Factura creada exitosamente' } });
    } catch (error) {
      console.error('Error al crear factura:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Crear Nueva Factura
      </Typography>
      <FacturaForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default NuevaFacturaPage;