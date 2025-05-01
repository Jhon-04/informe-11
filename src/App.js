import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FacturasPage from './pages/FacturasPage';
import NuevaFacturaPage from './pages/NuevaFacturaPage';
import EditarFacturaPage from './pages/EditarFacturaPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router> {/* Solo un Router en toda la app */}
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/facturas" element={<FacturasPage />} />
          <Route path="/facturas/nueva" element={<NuevaFacturaPage />} />
          <Route path="/facturas/editar/:id" element={<EditarFacturaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;