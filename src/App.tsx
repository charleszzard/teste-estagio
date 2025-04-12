import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaClientes from './pages/ListaClientes';
import ClientDetailsPage from './pages/ClientDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaClientes />} />
        <Route path="/clientes/:id" element={<ClientDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;