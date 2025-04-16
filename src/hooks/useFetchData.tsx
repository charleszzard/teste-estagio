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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesRes, contasRes, agenciasRes] = await Promise.all([
          fetch('https://raw.githubusercontent.com/charleszzard/teste-estagio/main/public/public-api/clientes.json'),
          fetch('https://raw.githubusercontent.com/charleszzard/teste-estagio/main/public/public-api/contas.json'),
          fetch('https://raw.githubusercontent.com/charleszzard/teste-estagio/main/public/public-api/agencias.json'),
        ]);

        if (!clientesRes.ok || !contasRes.ok || !agenciasRes.ok) {
          throw new Error('Erro ao carregar os arquivos JSON');
        }

        const clientesData: Cliente[] = await clientesRes.json();
        const contasData: Conta[] = await contasRes.json();
        const agenciasData: Agencia[] = await agenciasRes.json();

        const clientesConvertidos = clientesData.map(c => ({
          ...c,
          dataNascimento: new Date(c.dataNascimento),
        }));

        setData({
          clientes: clientesConvertidos,
          contas: contasData,
          agencias: agenciasData,
        });

        setLoading(false);
      } catch (err: any) {
        console.error('Erro ao buscar dados JSON:', err);
        setError(err.message || 'Erro inesperado.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchData;
