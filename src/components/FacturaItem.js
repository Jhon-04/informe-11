import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TableRow, 
  TableCell, 
  Button, 
  Chip,
  Typography,
  Box
} from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';

const FacturaItem = ({ factura }) => {
  const estadoColors = {
    pendiente: 'warning',
    pagada: 'success',
    cancelada: 'error',
    anulada: 'default'
  };

  return (
    <TableRow hover>
      <TableCell>{factura.numeroFactura}</TableCell>
      <TableCell>{new Date(factura.fecha).toLocaleDateString('es-PE')}</TableCell>
      <TableCell>
        <Box>
          <Typography variant="body1">{factura.cliente}</Typography>
          <Typography variant="caption" color="text.secondary">RUC: {factura.ruc}</Typography>
        </Box>
      </TableCell>
      <TableCell>
        {factura.moneda === 'PEN' ? 'S/ ' : '$ '}
        {factura.montoTotal.toFixed(2)}
      </TableCell>
      <TableCell>
        <Chip 
          label={factura.estado} 
          color={estadoColors[factura.estado] || 'default'} 
          size="small"
        />
      </TableCell>
      <TableCell>
        <Button 
          component={Link} 
          to={`/facturas/editar/${factura.id}`} 
          size="small" 
          startIcon={<Edit />}
          sx={{ mr: 1 }}
        >
          Editar
        </Button>
        <Button 
          component={Link} 
          to={`/facturas/${factura.id}`} 
          size="small" 
          startIcon={<Visibility />}
          color="info"
        >
          Ver
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default FacturaItem;