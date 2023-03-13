import { useRouter } from 'next/router';
import React from 'react';

function Id() {
  const router = useRouter();
  console.log(router.query);
  console.log(router.query.id);
  return (
    <div>
      <p>{router.query.id}</p>
    </div>
  );
}

export default Id;
