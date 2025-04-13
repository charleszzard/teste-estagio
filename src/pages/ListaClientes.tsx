// src/pages/ListaClientes.tsx
import { useState, useEffect, useMemo } from "react";
import useFetchData from "../hooks/useFetchData";
import  ClienteType  from "../types/Cliente";
import ClientCard from "../components/ClientCard";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

const ListaClientes = () => {
  const { data, loading, error } = useFetchData();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const clientes = data.clientes;

  const handleSelectClient = (id: string) => {
    navigate(`/clientes/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredClientes = useMemo(() => {
    return clientes.filter((cliente) => {
      const nome = cliente.nome || '';
      const cpfCnpj = cliente.cpfCnpj || '';
      return (
        nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cpfCnpj.includes(searchTerm)
      );
    });
  }, [clientes, searchTerm]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentClientes = filteredClientes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredClientes.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredClientes]);

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  if (error) {
    return <p>Erro ao carregar dados: {error}</p>;
  }

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <SearchFilter onSearch={handleSearch} /> {/* Passando a prop onSearch */}
      {filteredClientes.length > 0 ? (
        <div>
 {currentClientes.map((cliente) => (
  <ClientCard
    key={cliente.id} // ← Adicione esta linha
    cliente={cliente}
    onSelectClient={handleSelectClient}
  />
))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}
    </div>
  );
};

export default ListaClientes;