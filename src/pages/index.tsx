/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
// import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Header from '@/components/Header';
import { toast } from 'react-toastify';

type LatLntLists = {
  placeName: string;
  lat: number;
  lng: number;
}[];
function Home() {
  const [tripLists, setTripLists] = useState<string[]>([]);
  const [latLntLists, setLatLntLists] = useState<LatLntLists>([]);
  const [inputText, setInputText] = useState<string>('福岡');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [map, setMap] = useState(null);
  // const [maps, setMaps] = useState(null);
  // const [marker, setMarker] = useState(null);

  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };
  // todo: 名所から座標を取得する
  const geoCoding = async () => {
    console.log('geoCodingが動いてる');
    if (!tripLists) {
      console.log('tripListsがないよ');
    }
    // const damey = ['', '天神 ', '博多 ', '中洲 ', '福岡城跡 ', '福岡タワー ', '聖福寺 '];
    tripLists.forEach(async (tripList) => {
      if (!tripList) return;
      await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${tripList}&key=${process.env.NEXT_PUBLIC_GCP_API_URL}`, {
        method: 'GET',
      })
        .then(async (response) => {
          const json = response.json();
          console.log('json', await json);
          await json.then((data: any) => {
            const geoCodingList = {
              placeName: tripList,
              lat: data.results[0].geometry.location.lat,
              lng: data.results[0].geometry.location.lng,
            };
            console.log('geoCodingList', geoCodingList);
            // ここの処理がちゃんと動いてないな
            // setLatLntLists((prev) => [...prev, geoCodingList]);
            setLatLntLists((prev) => [...prev, geoCodingList]);
            setIsLoading(false);
          });
        })
        .catch((error) => {
          alert(`エラーが発生しました。${error.message}`);
          console.log('geoCodingのerror', error);
          setIsLoading(false);
          toast.error(`エラーが発生しました。${error.message}`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
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
        title: item.placeName,
        map,
      });
      bounds.extend(marker.position);
    });
    map.fitBounds(bounds);
  };

  const callChatGPT = async () => {
    setIsLoading(true);
    console.log('押したよ');
    // HTTP POSTリクエストを送信する
    try {
      const getRes = await fetch(process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT as string, {
        method: 'POST',
        body: JSON.stringify(inputText),
      });
      const responseBody = await getRes.json();
      console.log('APIからのres', responseBody);
      await setTripLists(responseBody);
      // ここで関数を回すと、tripListsが空になってしまう
    } catch (error: any) {
      alert(`エラーが発生しました。${error.message}`);
      console.log('error', error);
      setIsLoading(false);
      toast.error(`エラーが発生しました。${error.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
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
          // testDisabled();
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
        {latLntLists.length > 0 ? (
          <button
            type="button"
            onClick={(e) => {
              console.log('ChatGPTのAPIを再コール');
              e.preventDefault();
              // ここでおかしい気がする(ピンがちゃんと出ない)
              setTripLists([]);
              setLatLntLists([]);
              setTimeout(() => {
                callChatGPT();
              }, 1000);
              // testDisabled();
            }}
            disabled={isLoading}
            className="bg-black/70 hover:bg-black/30 text-white font-bold py-2 px-4 rounded"
          >
            {isLoading ? 'Loading...' : 'ルートを再生成する'}
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              console.log('ChatGPTのAPIをコール');
              e.preventDefault();
              callChatGPT();
              // testDisabled();
            }}
            disabled={isLoading}
            className="bg-black/70 hover:bg-black/30 text-white font-bold py-2 px-4 rounded"
          >
            {isLoading ? 'Loading...' : 'ルートを生成する'}
          </button>
        )}
      </form>
      {/* <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          console.log('APIRouteのAPIをコール');
          callChatGPT();
        }}
      >
        APIてすとコール
      </button> */}
      <ul>
        {tripLists.map((tripList) => (
          <li key={tripList}>{tripList}</li>
        ))}
      </ul>
      {latLntLists.length > 4 && (
        <div
          style={{
            height: '500px',
            width: '100%',
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_GCP_API_URL ?? '',
            }}
            defaultCenter={defaultLatLng}
            defaultZoom={16}
            onGoogleApiLoaded={handleApiLoaded}
            yesIWantToUseGoogleMapApiInternals
            // onClick={setLatLng}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
