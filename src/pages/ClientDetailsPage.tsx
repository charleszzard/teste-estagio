import React from 'react';
import { useParams } from 'react-router-dom';
import ClientDetails from '../components/ClientDetails';

const ClientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>ID do cliente não fornecido</div>;
  }

  return (
    <div className="container">
      <ClientDetails clientId={id} />
    </div>
  );
};

export default ClientDetailsPage;