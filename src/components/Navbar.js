import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  Box
} from '@mui/material';
import { Home, Receipt, AddBox, AccountBalance } from '@mui/icons-material';

const Navbar = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <AccountBalance sx={{ mr: 2, fontSize: 32 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SIDER PERÚ - Contabilidad
        </Typography>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            startIcon={<Home />}
            sx={{ mr: 2 }}
          >
            Inicio
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/facturas"
            startIcon={<Receipt />}
            sx={{ mr: 2 }}
          >
            Facturas
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/facturas/nueva"
            startIcon={<AddBox />}
            variant="outlined"
          >
            Nueva Factura
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;