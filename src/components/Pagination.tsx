import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9 } 
from '@fortawesome/free-solid-svg-icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

// Mapeamento de números para ícones
const numberIcons: Record<number, any> = {
1:fa1,2:fa2,3:fa3,4:fa4,5:fa5,6:fa6,7:fa7,8:fa8,9:fa9};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePages = Array.from({ length: Math.min(totalPages, 9) }, (_, i) => i + 1);

  return (
    <div style={{ 
      marginTop: '20px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '15px',
      justifyContent: 'center'
    }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ 
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: currentPage === 1 ? '#ccc' : '#333',
          fontSize: '1.2rem'
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div style={{ display: 'flex', gap: '15px' }}>
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPage === page ? '#333' : '#ccc',
              fontSize: '1rem'
            }}
          >
            <FontAwesomeIcon 
              icon={numberIcons[page]} 
              style={{
                fontWeight: currentPage === page ? 'bold' : 'normal',
              }} 
            />
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ 
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: currentPage === totalPages ? '#ccc' : '#333',
          fontSize: '1.2rem'
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Pagination;