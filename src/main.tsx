import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './style.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Elemento root não encontrado. Verifique se há um <div id='root'></div> no index.html.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/teste-estagio/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
