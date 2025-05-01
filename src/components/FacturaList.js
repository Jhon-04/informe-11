import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableContainer, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Paper,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import FacturaItem from './FacturaItem';
import SearchBar from './SearchBar';
import facturaService from '../services/facturaService';

const FacturaList = () => {
  const [facturas, setFacturas] = useState([]);
  const [filteredFacturas, setFilteredFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const data = await facturaService.getAll();
        setFacturas(data);
        setFilteredFacturas(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las facturas');
        setLoading(false);
        console.error('Error fetching facturas:', err);
      }
    };

    fetchFacturas();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredFacturas(facturas);
      return;
    }
    
    const filtered = facturas.filter(factura =>
      factura.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      factura.numeroFactura.toLowerCase().includes(searchTerm.toLowerCase()) ||
      factura.ruc.includes(searchTerm)
    );
    setFilteredFacturas(filtered);
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Listado de Facturas
      </Typography>
      
      <SearchBar onSearch={handleSearch} />
      
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N° Factura</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFacturas.length > 0 ? (
              filteredFacturas.map(factura => (
                <FacturaItem key={factura.id} factura={factura} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No se encontraron facturas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FacturaList;