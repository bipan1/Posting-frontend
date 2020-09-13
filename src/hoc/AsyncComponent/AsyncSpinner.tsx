import React from 'react';
import Spinner from '../../components/Spinner/Spinner';

const AsyncSpinner: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spinner />
    </div>
  );
};

export default AsyncSpinner;
