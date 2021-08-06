import React from 'react';
import { useGlobalContext } from './context';

const Buttons = () => {
  const { isLoading, page, nbPages, handlePage } = useGlobalContext();
  return (
    <div className="btn-container">
      <button onClick={() => handlePage('prev')} disabled={isLoading}>
        prev
      </button>
      {page + 1} of {nbPages}
      <button onClick={() => handlePage('next')} disabled={isLoading}>
        next
      </button>
    </div>
  );
};

export default Buttons;
