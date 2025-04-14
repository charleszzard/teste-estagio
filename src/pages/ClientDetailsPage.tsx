import React from 'react';
import { useParams } from 'react-router-dom';
import ClientDetails from '../components/ClientDetails';

const ClientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="error-message">
        <p>ID do cliente não fornecido.</p>
      </div>
    );
  }

  return (
    <div className="client-details-container">
      <h2>Detalhes do Cliente</h2>
      <ClientDetails clientId={id} />
    </div>
  );
};

export default ClientDetailsPage;
