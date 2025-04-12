import React from 'react';
import Agencia from '../types/Agencia';

interface AgencyInfoProps {
  agencia: Agencia;
}

const AgencyInfo: React.FC<AgencyInfoProps> = ({ agencia }) => {
  return (
    <div style={{ border: '1px solid #eee', padding: '10px', marginTop: '10px', borderRadius: '3px' }}>
      <h4>Agência</h4>
      <p>Código: {agencia.codigo}</p>
      <p>Nome: {agencia.nome}</p>
      <p>Endereço: {agencia.endereco}</p>
    </div>
  );
};

export default AgencyInfo;