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
            // setLatLntLists((prev) => [...prev, geoCodingList]);
            setLatLntLists({
              ...latLntLists,
              ...geoCodingList,
            });
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
    // APIキーとエンジンIDを設定する
    const apiKey = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;

    // APIエンドポイントを設定する
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT ?? '';

    // APIリクエストボディを設定する
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          // todo: ここにユーザーの入力を入れる
          content: `${inputText}観光コース 地名 リスト 6個 説明なし`,
        },
      ],
      /**
       * サンプリング操作、0.8のような高い値は出力をよりランダムにし、0.2のような低い値は出力を収束させる
       */
      temperature: 0.9,
      /**
       * 0.1 は上位 10% の確率の塊からなるトークンのみを考慮することを意味する
       * `temperature` によるサンプリングの代替となるが併用は推奨されない
       */
      top_p: 1,
      /**
       * 各入力メッセージに対して生成するチャット補完の選択肢の数
       */
      n: 1,
      /**
       * presence penalty は少なくとも1回サンプリングされた全てのトークンに適用される1回限り加算する寄与
       * frequency penalty は特定のトークンが既にサンプリングされた頻度に比例する寄与
       */
      presence_penalty: 0,
      frequency_penalty: 0,
    };

    // APIリクエストヘッダを設定する
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    // HTTP POSTリクエストを送信する
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    // APIレスポンスを取得する
    const responseBody = await response.json();

    // レスポンス結果をコンソールに出力する
    console.log(responseBody.choices[0].message.content);
    console.log(responseBody);
    const format = responseBody.choices[0].message.content.split(/\s*[1-6]\.\s*/).map((i: any) => i.replace(/[-:].*/, ''));
    console.log('format', format);
    setTripLists(format);
  };
  useEffect(() => {
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
