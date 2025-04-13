import React, { useState } from 'react';

interface SearchFilterProps {
  onSearch: (searchTerm: string) => void;
  onFilter?: (filterCriteria: any) => void; // onFilter agora é opcional
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // Exemplo de estado para filtros (expanda conforme necessário)
  // const [filterEstadoCivil, setFilterEstadoCivil] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  // Exemplo de função para lidar com a mudança de um filtro (expanda conforme necessário)
  // const handleEstadoCivilChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   if (onFilter) { // Verifica se onFilter foi passada
  //     onFilter({ estadoCivil: event.target.value });
  //   }
  //   // setFilterEstadoCivil(event.target.value);
  // };

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
      <div>
        <label htmlFor="search">Pesquisar por Nome ou CPF/CNPJ:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Digite nome ou CPF/CNPJ"
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      {/* Exemplo de filtro por estado civil (adicione outros filtros conforme necessário) */}
      {/* <div>
        <label htmlFor="estadoCivil">Filtrar por Estado Civil:</label>
        <select
          id="estadoCivil"
          // value={filterEstadoCivil}
          onChange={handleEstadoCivilChange}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="">Todos</option>
          <option value="Solteiro">Solteiro</option>
          <option value="Casado">Casado</option>
          <option value="Viúvo">Viúvo</option>
          <option value="Divorciado">Divorciado</option>
        </select>
      </div> */}
    </div>
  );
};

export default SearchFilter;