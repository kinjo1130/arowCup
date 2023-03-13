import React, { useEffect, useState } from 'react';

const motionsTest = () => {
  const [accelerationX, setAccelerationX] = useState<number>(0);
  const [accelerationY, setAccelerationY] = useState<number>(0);
  const [accelerationZ, setAccelerationZ] = useState<number>(0);

  useEffect(() => {
    window.addEventListener('devicemotion', (event: any) => {
      setAccelerationX(event.acceleration.x);
      setAccelerationY(event.acceleration.y);
      setAccelerationZ(event.acceleration.z);
    });
  });
  return (
    <div>
      <span>{accelerationX}</span>
      <span>{accelerationY}</span>
      <span>{accelerationZ}</span>
    </div>
  );
};

export default motionsTest;
