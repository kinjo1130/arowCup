import React, { useEffect, useState } from 'react';

function Test() {
  const [accelerationZ, setAccelerationZ] = useState<number>(0);

  useEffect(() => {
    console.log('useEffect');
    window.addEventListener('devicemotion', (event: any) => {
      setAccelerationZ(event.acceleration.z);
    });
  }, [accelerationZ]);
  return (
    <div>
      <span>
        z軸
        {accelerationZ}
      </span>
    </div>
  );
}

export default Test;
