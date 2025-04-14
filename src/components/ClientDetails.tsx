import React from "react";
import useFetchData from "../hooks/useFetchData";

interface ClientDetailsProps {
  clientId: string;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ clientId }) => {
  const { data, loading, error } = useFetchData();

  if (loading) return <p>Carregando detalhes do cliente...</p>;
  if (error) return <p>Erro: {error}</p>;

  const cliente = data.clientes.find((c) => c.id.toString() === clientId);

  if (!cliente) return <p>Cliente não encontrado</p>;

  return (
    <div className="details-container">
      {/* <h2>Detalhes do Cliente</h2> */}
      <p><strong>Nome:</strong> {cliente.nome}</p>
      <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
      <p><strong>Data de Nascimento:</strong> {new Date(cliente.dataNascimento).toLocaleDateString()}</p>
    </div>
  );
};

export default ClientDetails;
