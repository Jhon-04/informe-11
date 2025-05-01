import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  Typography, 
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
  // Eliminamos Box ya que no se está usando
} from '@mui/material';
import { AddCircleOutline, DeleteOutline } from '@mui/icons-material';

const FacturaForm = ({ factura, onSubmit }) => {
  const [formData, setFormData] = useState({
    numeroFactura: '',
    fecha: new Date().toISOString().split('T')[0],
    cliente: '',
    ruc: '',
    direccion: '',
    items: [{ id: 1, descripcion: '', cantidad: 1, precioUnitario: 0, subtotal: 0 }],
    montoTotal: 0,
    estado: 'pendiente',
    moneda: 'PEN'
  });

  useEffect(() => {
    if (factura) {
      setFormData(factura);
    }
  }, [factura]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const updatedItems = prev.items.map(item => 
        item.id === id 
          ? { 
              ...item, 
              [name]: name === 'cantidad' || name === 'precioUnitario' ? parseFloat(value || 0) : value,
              subtotal: name === 'cantidad' || name === 'precioUnitario' 
                ? (name === 'cantidad' 
                    ? parseFloat(value || 0) * item.precioUnitario 
                    : item.cantidad * parseFloat(value || 0))
                : item.subtotal
            } 
          : item
      );
      
      return {
        ...prev,
        items: updatedItems,
        montoTotal: updatedItems.reduce((sum, item) => sum + item.subtotal, 0)
      };
    });
  };

  const addItem = () => {
    setFormData(prev => {
      const newId = prev.items.length > 0 ? Math.max(...prev.items.map(i => i.id)) + 1 : 1;
      return {
        ...prev,
        items: [
          ...prev.items,
          { 
            id: newId,
            descripcion: '', 
            cantidad: 1, 
            precioUnitario: 0,
            subtotal: 0 
          }
        ]
      };
    });
  };

  const removeItem = (id) => {
    setFormData(prev => {
      const filteredItems = prev.items.filter(item => item.id !== id);
      return {
        ...prev,
        items: filteredItems,
        montoTotal: filteredItems.reduce((sum, item) => sum + item.subtotal, 0)
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const monedas = [
    { value: 'PEN', label: 'Soles (S/.)' },
    { value: 'USD', label: 'Dólares ($)' }
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Número de Factura"
            name="numeroFactura"
            value={formData.numeroFactura}
            onChange={handleChange}
            required
            variant="outlined"
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Fecha"
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            select
            fullWidth
            label="Moneda"
            name="moneda"
            value={formData.moneda}
            onChange={handleChange}
            variant="outlined"
          >
            {monedas.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Cliente"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            required
            variant="outlined"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="RUC"
            name="ruc"
            value={formData.ruc}
            onChange={handleChange}
            required
            variant="outlined"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Detalle de la Factura
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="40%">Descripción</TableCell>
              <TableCell width="15%">Cantidad</TableCell>
              <TableCell width="20%">P. Unitario</TableCell>
              <TableCell width="20%">Subtotal</TableCell>
              <TableCell width="5%" align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.items.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <TextField
                    fullWidth
                    name="descripcion"
                    value={item.descripcion}
                    onChange={(e) => handleItemChange(item.id, e)}
                    required
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    name="cantidad"
                    value={item.cantidad}
                    onChange={(e) => handleItemChange(item.id, e)}
                    required
                    variant="standard"
                    inputProps={{ min: 1 }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    name="precioUnitario"
                    value={item.precioUnitario}
                    onChange={(e) => handleItemChange(item.id, e)}
                    required
                    variant="standard"
                    inputProps={{ min: 0, step: "0.01" }}
                  />
                </TableCell>
                <TableCell>
                  {formData.moneda === 'PEN' ? 'S/ ' : '$ '}
                  {(item.cantidad * item.precioUnitario).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    color="error" 
                    onClick={() => removeItem(item.id)}
                    disabled={formData.items.length <= 1}
                  >
                    <DeleteOutline />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        startIcon={<AddCircleOutline />}
        onClick={addItem}
        variant="outlined"
        sx={{ mb: 3 }}
      >
        Agregar Item
      </Button>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value="pendiente">Pendiente</MenuItem>
            <MenuItem value="pagada">Pagada</MenuItem>
            <MenuItem value="cancelada">Cancelada</MenuItem>
            <MenuItem value="anulada">Anulada</MenuItem>
          </TextField>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Monto Total"
            value={`${formData.moneda === 'PEN' ? 'S/ ' : '$ '}${formData.montoTotal.toFixed(2)}`}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ mt: 4, py: 2 }}
      >
        {factura ? 'Actualizar Factura' : 'Guardar Factura'}
      </Button>
    </form>
  );
};

export default FacturaForm;