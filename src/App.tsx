import { Routes, Route } from 'react-router-dom'
import ListaClientes from './pages/ListaClientes'
import ClientDetailsPage from './pages/ClientDetailsPage'
//import NotFoundPage from './pages/NotFoundPage' // Crie essa página para 404

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<ListaClientes />} />
        <Route path="/clientes/:id" element={<ClientDetailsPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  )
}

export default App
