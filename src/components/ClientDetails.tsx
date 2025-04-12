import React, { useState, useEffect } from 'react';
import { ClienteType } from '../types/Cliente';
import Conta from '../types/Conta';
import Agencia from '../types/Agencia';
import useFetchData from '../hooks/useFetchData';
import AccountInfo from './AccountInfo';
import AgencyInfo from './AgencyInfo';

interface ClientDetailsProps {
  clientId: string;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ clientId }) => {
  const { data, loading, error } = useFetchData();
  const [cliente, setCliente] = useState<ClienteType | null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencia, setAgencia] = useState<Agencia | null>(null);

  useEffect(() => {
    if (data.clientes.length > 0) {
      const foundCliente = data.clientes.find((c) => c.id === clientId);
      setCliente(foundCliente || null);
    }
  }, [data.clientes, clientId]);

  useEffect(() => {
    if (data.contas.length > 0 && cliente) {
      const clienteContas = data.contas.filter((conta) => conta.cpfCnpjCliente === cliente.cpfCnpj);
      setContas(clienteContas);
    }
  }, [data.contas, cliente]);

  useEffect(() => {
    if (data.agencias.length > 0 && cliente) {
      const clienteAgencia = data.agencias.find((agencia) => agencia.codigo === cliente.codigoAgencia);
      setAgencia(clienteAgencia || null);
    }
  }, [data.agencias, cliente]);

  if (loading) {
    return <p>Carregando detalhes do cliente...</p>;
  }

  if (error) {
    return <p>Erro ao carregar detalhes do cliente: {error}</p>;
  }

  if (!cliente) {
    return <p>Cliente não encontrado.</p>;
  }

  return (
    <div>
      <h3>Informações do Cliente</h3>
      <p>ID: {cliente.id}</p>
      <p>Nome: {cliente.nome}</p>
      <p>CPF/CNPJ: {cliente.cpfCnpj}</p>
      {cliente.rg && <p>RG: {cliente.rg}</p>}
      <p>Data de Nascimento: {cliente.dataNascimento.toLocaleDateString()}</p>
      {cliente.nomeSocial && <p>Nome Social: {cliente.nomeSocial}</p>}
      <p>Email: {cliente.email}</p>
      <p>Endereço: {cliente.endereco}</p>
      <p>Renda Anual: {cliente.rendaAnual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      <p>Patrimônio: {cliente.patrimonio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      <p>Estado Civil: {cliente.estadoCivil}</p>

      <h4>Contas Bancárias</h4>
      {contas.length > 0 ? (
        contas.map((conta) => (
          <AccountInfo key={conta.id} conta={conta} />
        ))
      ) : (
        <p>Nenhuma conta bancária associada a este cliente.</p>
      )}

      <h4>Agência</h4>
      {agencia ? (
        <AgencyInfo agencia={agencia} />
      ) : (
        <p>Informações da agência não encontradas.</p>
      )}
    </div>
  );
};

export default ClientDetails;