import React, { useEffect, useState } from 'react';

function Test() {
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
      <span>
        x軸
        {accelerationX}
      </span>
      <span>
        y軸
        {accelerationY}
      </span>
      <span>
        z軸
        {accelerationZ}
      </span>
    </div>
  );
}

export default Test;
