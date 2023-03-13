import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
// import Footer from '@/components/Footer';
import createRoom from '@/hooks/useCreateRoom';
import { useRouter } from 'next/router';
import createUser from '@/hooks/useCreateUser';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebaseInit';

type User = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  emailVerified: boolean;
  phoneNumber: string;
  isAnonymous: boolean;
};
export default function Home() {
  const auth = getAuth();
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const c = console;
  const [userInfo, setUserInfo] = useState<User>();
  const [roomLists, setRoomLists] = useState([]);
  // 新規登録する関数
  const GoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { user } = result;
        c.table(user);
        c.log('token', token);
        if (!user) return;
        // todo: string | nullの対処法を治す
        createUser(user.uid, user.displayName ?? '', user.photoURL ?? '');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        c.table(errorCode, errorMessage);
      });
    const getRooms = async () => {
      // const { uid, displayName, photoURL } = props;
      // const collectionRef = collection(db, 'user', uid);
      if (!userInfo) return;
      const roomRef = collection(db, 'groups', userInfo?.uid, 'room');
      const roomSnapshot = await getDocs(roomRef);
      console.log('roomsnap^^^^^^^^^', roomSnapshot);
      // setRoomLists(roomSnapshot);
    };
    useEffect(() => {
      if (!userInfo) return;
      getRooms();
    }, []);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;
        c.log('ログインしています');
        c.log(uid);
        c.log("user's Info", user);
        if (!user) return;
        setUserInfo(user);
      } else {
        // alert('ログインしてください');
        c.log('ログインしていません');
        setUserInfo(null);
      }
    });
  };
  return (
    <>
      {userInfo ? <Header title="タクシーアプリ" imgSrc={userInfo.photoURL} /> : <Header title="たくアプ" />}
      {userInfo ? (
        <div>
          <p>
            {userInfo.displayName}
            さん、こんにちは
          </p>
          <div className="w-[80%] mx-auto">
            <button
              type="button"
              className="border bg-black/40 rounded-lg p-10"
              onClick={() => {
                c.log('ルームを作る');
                if (!userInfo) return;
                const createRoomObj = {
                  uid: userInfo?.uid,
                  displayName: userInfo?.displayName,
                  photoURL: userInfo?.photoURL,
                };
                createRoom(createRoomObj)
                  .then(() => {
                    console.log('成功');
                    router.push(`/rooms/${userInfo.uid}`);
                  })
                  .catch((err) => {
                    c.log(err);
                  });
              }}
            >
              <div className="text-center">+</div>
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={GoogleSignIn}>
          Googleでログイン
        </button>
      )}
      {roomLists.map((roomList: any) => (
        <ul>
          <li>{roomList.id}</li>
          <li>{roomList.title}</li>
        </ul>
      ))}
    </>
  );
}
