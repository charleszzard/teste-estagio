import React from 'react';
import { useParams } from 'react-router-dom';
import ClientDetails from '../components/ClientDetails';

const ClientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h2>Detalhes do Cliente</h2>
      {id ? (
        <ClientDetails clientId={id} />
      ) : (
        <p>Nenhum ID de cliente fornecido.</p>
      )}
    </div>
  );
};

export default ClientDetailsPage;