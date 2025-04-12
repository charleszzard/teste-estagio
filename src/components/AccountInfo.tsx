import React from 'react';
import Conta from '../types/Conta';

interface AccountInfoProps {
  conta: Conta;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ conta }) => {
  return (
    <div style={{ border: '1px solid #eee', padding: '10px', marginBottom: '5px', borderRadius: '3px' }}>
      <h5>Conta {conta.tipo} - ID: {conta.id}</h5>
      <p>Saldo: {conta.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      <p>Limite de Crédito: {conta.limiteCredito.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      <p>Crédito Disponível: {conta.creditoDisponivel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
    </div>
  );
};

export default AccountInfo;