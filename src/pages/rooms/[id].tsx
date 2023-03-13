import { useRouter } from 'next/router';
import React, { useState } from 'react';
import invitationLink from '@/hooks/useInvitation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebaseInit';

function Id() {
  // const { userObj } = await getUser();
  // const uid = userObj?.uid;
  const [userId, setUserId] = useState<string>('');
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const { uid } = user;
      console.log('ログインしています');
      console.log(uid);
      console.log("user's Info", user);
      const docRef = doc(db, 'user', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setUserId(docSnap.data()?.uid);
      }
    }
    console.log('ログインしていません');
  });
  const router = useRouter();
  console.log(router.query);
  console.log(router.query.id);
  return (
    <div>
      <p>{router.query.id}</p>
      <button
        type="button"
        onClick={() => {
          const InLink = invitationLink(userId, router.query.id as string);
          console.log('招待リンク発行', InLink);
        }}
      >
        招待リンク発行
      </button>
    </div>
  );
}

export default Id;
