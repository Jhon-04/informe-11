import React, { useState } from 'react';
import { 
  TextField, 
  InputAdornment,
  IconButton
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Buscar facturas por cliente, RUC o número..."
      value={searchTerm}
      onChange={handleChange}
      sx={{ mb: 3 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: searchTerm && (
          <IconButton onClick={handleClear}>
            <Clear fontSize="small" />
          </IconButton>
        )
      }}
    />
  );
};

export default SearchBar;