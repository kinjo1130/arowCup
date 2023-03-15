import React from 'react';

function Spinner() {
  return (
    <div className="flex justify-center">
      <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full" />
      <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full mx-4" />
      <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full" />
    </div>
  );
}

export default Spinner;
