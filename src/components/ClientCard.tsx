import React from 'react';
import { ClienteType } from '../types/Cliente';
import styles from './ClientCard.module.css'; // Importe o CSS Module

interface ClientCardProps {
  cliente: ClienteType;
  onSelectClient: (clienteId: string) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ cliente, onSelectClient }) => {
  return (
    <div className={styles.card} onClick={() => onSelectClient(cliente.id)}>
      <h3 className={styles.name}>{cliente.nome}</h3>
      <p className={styles.info}>CPF/CNPJ: {cliente.cpfCnpj}</p>
      <p className={styles.info}>Email: {cliente.email}</p>
      {cliente.rg && <p className={styles.info}>RG: {cliente.rg}</p>}
    </div>
  );
};

export default ClientCard;