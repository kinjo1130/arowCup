/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
// import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Header from '@/components/Header';

type LatLntLists = {
  placeName: string;
  lat: number;
  lng: number;
}[];
function Home() {
  const [tripLists, setTripLists] = useState<string[]>([]);
  const [latLntLists, setLatLntLists] = useState<LatLntLists>([]);
  const [inputText, setInputText] = useState<string>('福岡');
  // const [map, setMap] = useState(null);
  // const [maps, setMaps] = useState(null);
  // const [marker, setMarker] = useState(null);

  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };
  // todo: 名所から座標を取得する
  const geoCoding = async () => {
    console.log('geoCoding');
    // const damey = ['', '天神 ', '博多 ', '中洲 ', '福岡城跡 ', '福岡タワー ', '聖福寺 '];
    tripLists.forEach(async (tripList) => {
      if (!tripList) return;
      await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${tripList}&key=${process.env.NEXT_PUBLIC_GCP_API_URL}`, {
        method: 'GET',
      })
        .then((response) => {
          const json = response.json();
          json.then((data) => {
            console.log('data', data);
            const geoCodingList = {
              placeName: tripList,
              lat: data.results[0].geometry.location.lat,
              lng: data.results[0].geometry.location.lng,
            };
            console.log('geoCodingList', geoCodingList);
            // ここの処理がちゃんと動いてないな
            // setLatLntLists((prev) => [...prev, geoCodingList]);
            setLatLntLists((prev) => [...prev, geoCodingList]);
            console.log('latLntLists', latLntLists);
          });
        })
        .catch((error) => {
          console.log('geoCodingのerror', error);
        });
    });
  };

  const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    const bounds = new maps.LatLngBounds();
    latLntLists.forEach((item: any) => {
      const marker = new maps.Marker({
        position: {
          lat: item.lat,
          lng: item.lng,
        },
        map,
      });
      bounds.extend(marker.position);
    });
    map.fitBounds(bounds);
  };

  const callChatGPT = async () => {
    console.log('押したよ');

    // HTTP POSTリクエストを送信する
    const getRes = await fetch('http://localhost:3000/api/chatGPT', {
      method: 'POST',
      body: JSON.stringify(inputText),
    });
    const responseBody = await getRes.json();
    console.log('res', responseBody);
    await setTripLists(responseBody);

    // APIレスポンスを取得する

    // レスポンス結果をコンソールに出力する
    // console.log(responseBody.choices[0].message.content);
    // console.log(responseBody);
    // const format = responseBody.choices[0].message.content.split(/\s*[1-6]\.\s*/).map((i: any) => i.replace(/[-:].*/, ''));
    // console.log('format', format);
    // setTripLists(format);
  };
  useEffect(() => {
    console.log('useEffect');
    geoCoding();
  }, [tripLists]);
  return (
    <div>
      <Header />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          callChatGPT();
        }}
      >
        <input
          type="text"
          value={inputText}
          className="border-2 border-gray-300"
          onChange={(e) => {
            e.preventDefault();
            setInputText(e.target.value);
            console.log('inputText', inputText);
          }}
          required
        />
        <button
          type="submit"
          onSubmit={(e) => {
            console.log('ChatGPTのAPIをコール');
            e.preventDefault();
            callChatGPT();
          }}
        >
          APIコール
        </button>
      </form>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          console.log('APIRouteのAPIをコール');
          callChatGPT();
        }}
      >
        APIてすとコール
      </button>
      <p>{tripLists}</p>
      {latLntLists.length > 0 && (
        <div
          style={{
            height: '500px',
            width: '800px',
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_GCP_API_URL ?? '',
            }}
            defaultCenter={defaultLatLng}
            defaultZoom={16}
            onGoogleApiLoaded={handleApiLoaded}
            // onClick={setLatLng}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
