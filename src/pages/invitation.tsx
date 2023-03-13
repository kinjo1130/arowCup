import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { db } from '@/utils/firebaseInit';

function Invitation() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const addIsJoinRoom = async (uid: string, displayName: string) => {
    // todo: userのisJoinRoomに追加
    await setDoc(doc(db, 'user', uid, 'isJoinRoom'), {
      uid,
      displayName,
    });
    console.log('addIsJoinRoom');
  };
  const GoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const token = credential.accessToken;
        const { user } = result;
        console.table(user);
        addIsJoinRoom(user?.uid as string, user?.displayName as string);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.table(errorCode, errorMessage);
      });
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid } = user;
      console.log('ログインしています');
      console.log(uid);
      console.log("user's Info", user);
    } else {
      // alert('ログインしてください');
      console.log('ログインしていません');
      GoogleSignIn();
    }
  });
  useEffect(() => {
    console.log('useEffect000000');
    router.replace('/invitation');
  }, []);
  return (
    <>
      <h1>招待</h1>
      <p>jijiji</p>
    </>
  );
}

export default Invitation;
