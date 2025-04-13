import { useState, useEffect } from 'react';
import Cliente from '../types/Cliente';
import Conta from '../types/Conta';
import Agencia from '../types/Agencia';

interface Data {
  clientes: Cliente[];
  contas: Conta[];
  agencias: Agencia[];
}

const useFetchData = () => {
  const [data, setData] = useState<Data>({ clientes: [], contas: [], agencias: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCSVData = async (url: string): Promise<string[][]> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.status}`);
      }
      const csvText = await response.text();
      return csvText.trim().split('\n').map(row => row.split(','));
    } catch (error) {
      console.error('Erro ao buscar CSV:', error);
      throw new Error('Falha ao carregar dados. Tente novamente mais tarde.');
    }
  };
  const parseClientes = (csvData: string[][]): Cliente[] => {
    const headers = csvData[0];
    const dataRows = csvData.slice(1);
    return dataRows.map(row => {
      const entry: any = {};
      headers.forEach((header, index) => {
        entry[header] = row[index];
      });
      return {
        id: entry.id,
        cpfCnpj: entry.cpfCnpj,
        rg: entry.rg || undefined,
        dataNascimento: new Date(entry.dataNascimento),
        nome: entry.nome,
        nomeSocial: entry.nomeSocial || undefined,
        email: entry.email,
        endereco: entry.endereco,
        rendaAnual: parseFloat(entry.rendaAnual),
        patrimonio: parseFloat(entry.patrimonio),
        estadoCivil: entry.estadoCivil as "Solteiro" | "Casado" | "Viúvo" | "Divorciado",
        codigoAgencia: parseInt(entry.codigoAgencia),
      };
    });
  };

  const parseContas = (csvData: string[][]): Conta[] => {
    const headers = csvData[0];
    const dataRows = csvData.slice(1);
    return dataRows.map(row => {
      const entry: any = {};
      headers.forEach((header, index) => {
        entry[header] = row[index];
      });
      return {
        id: entry.id,
        cpfCnpjCliente: entry.cpfCnpjCliente,
        tipo: entry.tipo as "corrente" | "poupanca",
        saldo: parseFloat(entry.saldo),
        limiteCredito: parseFloat(entry.limiteCredito),
        creditoDisponivel: parseFloat(entry.creditoDisponivel),
      };
    });
  };

  const parseAgencias = (csvData: string[][]): Agencia[] => {
    const headers = csvData[0];
    const dataRows = csvData.slice(1);
    return dataRows.map(row => {
      const entry: any = {};
      headers.forEach((header, index) => {
        entry[header] = row[index];
      });
      return {
        id: entry.id,
        codigo: parseInt(entry.codigo),
        nome: entry.nome,
        endereco: entry.endereco,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesCSV = await fetchCSVData('https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes');
        const contasCSV = await fetchCSVData('https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas');
        const agenciasCSV = await fetchCSVData('https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias');

        const clientesData = parseClientes(clientesCSV);
        const contasData = parseContas(contasCSV);
        const agenciasData = parseAgencias(agenciasCSV);

        setData({ clientes: clientesData, contas: contasData, agencias: agenciasData });
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchData;