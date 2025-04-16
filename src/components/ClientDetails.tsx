import React from "react";
import useFetchData from "../hooks/useFetchData";
import AccountInfo from "./AccountInfo";
import AgencyInfo from "./AgencyInfo";

interface ClientDetailsProps {
  clientId: string;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ clientId }) => {
  const { data, loading, error } = useFetchData();

  if (loading) return <p>Carregando detalhes do cliente...</p>;
  if (error) return <p>Erro: {error}</p>;

  const cliente = data.clientes.find((c) => c.id.toString() === clientId);

  if (!cliente) return <p>Cliente não encontrado</p>;

  const contas = data.contas.filter((conta) => conta.cpfCnpjCliente === cliente.cpfCnpj);
  const agencia = data.agencias.find((a) => a.codigo === cliente.codigoAgencia);

  return (
    <div className="details-container">
      <p><strong>Nome:</strong> {cliente.nome}</p>
      <p><strong>Nome Social:</strong> {cliente.nomeSocial || "N/A"}</p>
      <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
      {cliente.rg && <p><strong>RG:</strong> {cliente.rg}</p>}
      <p><strong>Data de Nascimento:</strong> {new Date(cliente.dataNascimento).toLocaleDateString()}</p>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>Endereço:</strong> {cliente.endereco}</p>

      <p><strong>Renda Anual:</strong> 
        {cliente.rendaAnual != null 
          ? cliente.rendaAnual.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) 
          : "N/A"}
      </p>

      <p><strong>Patrimônio:</strong> 
        {cliente.patrimonio != null 
          ? cliente.patrimonio.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) 
          : "N/A"}
      </p>

      <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p>

      <h3>Contas Bancárias</h3>
      {contas.length > 0 ? (
        contas.map((conta) => <AccountInfo key={conta.id} conta={conta} />)
      ) : (
        <p>Este cliente não possui contas bancárias.</p>
      )}

      <h3>Agência</h3>
      {agencia ? <AgencyInfo agencia={agencia} /> : <p>Agência não encontrada.</p>}
    </div>
  );
};

export default ClientDetails;
