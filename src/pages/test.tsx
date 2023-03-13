import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function Test() {
  const [accelerationZ, setAccelerationZ] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    console.log('useEffect000000');
    // const url = window.location.href;
    // console.log(url);
    // url.replace(/\?.*$/, '');
    // console.log(url);
    router.replace('/');

    // keyを指定して、クエリパラメータを削除する
    // window.addEventListener('devicemotion', (event: any) => {
    //   setAccelerationZ(event.acceleration.z);
    // });
  }, []);
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
