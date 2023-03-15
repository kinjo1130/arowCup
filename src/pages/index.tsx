/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Header from '@/components/Header';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';
import Spinner from '@/components/Spinner';

type LatLntLists = {
  placeName: string;
  lat: number;
  lng: number;
}[];
function Home() {
  const [tripLists, setTripLists] = useState<string[]>([]);
  const [latLntLists, setLatLntLists] = useState<LatLntLists>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [placeHolderText, setPlaceHolderText] = useState<string>();
  const toasterShowTime = 2000;
  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };
  const errorToaster = (errorMsg: string) => {
    toast.error(`エラーが発生しました。${errorMsg}`, {
      position: 'top-right',
      autoClose: toasterShowTime,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };
  // const successToaster = (message: string) => {
  //   toast.success(message, {
  //     position: 'top-right',
  //     autoClose: toasterShowTime,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: 'light',
  //   });
  // };
  // const randomPlaceholder = () => {
  //   // todo: ここもAIに生成させたい
  //   const placeholderList = ['福岡', 'アイルランド', 'アメリカ', '滋賀県', '暑い地域', '日本', '香川', '愛媛'];
  //   const randomIndex = Math.floor(Math.random() * placeholderList.length);
  //   setPlaceHolderText(placeholderList[randomIndex]);
  // };

  const geoCoding = async () => {
    tripLists.forEach(async (tripList) => {
      await fetch(`${process.env.NEXT_PUBLIC_MAP_URL}?address=${tripList}&key=${process.env.NEXT_PUBLIC_GCP_API_URL}`, {
        method: 'GET',
      })
        .then(async (response) => {
          const json = response.json();
          await json.then(async (data: any) => {
            const geoCodingList = {
              placeName: tripList,
              lat: await data.results[0].geometry.location.lat,
              lng: await data.results[0].geometry.location.lng,
            };
            console.log('geoCodingList', geoCodingList);
            setLatLntLists((prev) => [...prev, geoCodingList]);
            setIsLoading(false);
          });
        })
        .catch((error) => {
          setIsLoading(false);
          console.log('error', error);
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
        label: item.placeName,
        map,
      });
      bounds.extend(marker.position);
    });
    map.fitBounds(bounds);
  };

  const callChatGPT = async () => {
    setIsLoading(true);
    try {
      const getRes = await fetch(process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT as string, {
        method: 'POST',
        body: JSON.stringify(inputText),
      });
      const responseBody = await getRes.json();
      const filteredEmptyTripLists = responseBody.filter((tripList: any) => tripList !== '');
      await setTripLists(filteredEmptyTripLists);
    } catch (error: any) {
      console.log('error', error);
      setIsLoading(false);
      errorToaster(error.message);
    }
  };
  useEffect(() => {
    geoCoding();
  }, [tripLists]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setTripLists([]);
    setLatLntLists([]);
    setTimeout(() => {
      callChatGPT();
    }, 1000);
  };
  return (
    <div>
      <SEO pageTitle={inputText} pageDescription="AIがおすすめの観光スポットをレコメンドします" />
      <Header />
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center mt-10">
        <input
          type="text"
          value={inputText}
          className="border-2 border-gray-300 px-5 py-3 mb-4"
          placeholder="例:  福岡"
          onChange={(e) => {
            e.preventDefault();
            setInputText(e.target.value);
            console.log('inputText', inputText);
          }}
          required
        />
        {latLntLists.length > 0 ? (
          <button
            type="submit"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            disabled={isLoading}
            className="bg-black/70 hover:bg-black/30 text-white font-bold py-3 px-4 rounded"
          >
            {isLoading ? 'Loading...' : 'ルートを再生成する'}
          </button>
        ) : (
          <button
            type="submit"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            disabled={isLoading}
            className="bg-black/70 hover:bg-black/30 text-white font-bold py-3.5 px-4 rounded"
          >
            {isLoading ? 'Loading...' : 'ルートを生成する'}
          </button>
        )}
      </form>
      {latLntLists.length > 4 && (
        <div>
          <div className="flex flex-col justify-center mx-auto mt-10">
            <h3 className="text-base font-bold text-center">
              {inputText}
              のおすすめの場所
            </h3>
            <ul className="mx-auto grid mt-4 mb-10 w-[90%] md:grid-cols-2 gap-3 ">
              {tripLists.map((tripList) => (
                <li key={tripList} className="py-3 px-2 mx-auto border-2 rounded border-b-gray-300 w-full text-center">
                  {tripList}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full h-[500px] mb-10">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.NEXT_PUBLIC_GCP_API_URL ?? '',
              }}
              defaultCenter={defaultLatLng}
              defaultZoom={16}
              onGoogleApiLoaded={handleApiLoaded}
              yesIWantToUseGoogleMapApiInternals
            />
          </div>
          <Footer />
        </div>
      )}
      {isLoading === true && latLntLists.length < 4 && (
        <div className="mt-20">
          <Spinner />
        </div>
      )}
      {latLntLists.length < 4 && (
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Home;
