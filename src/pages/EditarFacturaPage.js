import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FacturaForm from '../components/FacturaForm';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import facturaService from '../services/facturaService';

const EditarFacturaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [factura, setFactura] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFactura = async () => {
      try {
        const data = await facturaService.getById(id);
        setFactura(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar la factura');
        setLoading(false);
        console.error('Error fetching factura:', err);
      }
    };

    fetchFactura();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await facturaService.update(id, formData);
      navigate('/facturas', { state: { message: 'Factura actualizada exitosamente' } });
    } catch (error) {
      console.error('Error al actualizar factura:', error);
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!factura) return <Alert severity="warning">No se encontró la factura</Alert>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Editar Factura #{factura.numeroFactura}
      </Typography>
      <FacturaForm factura={factura} onSubmit={handleSubmit} />
    </Box>
  );
};

export default EditarFacturaPage;