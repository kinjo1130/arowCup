import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBhO17AEoSfD8TPn9t4Di05zLvBE3Ix0bQ',
  authDomain: 'nuxt-navi.firebaseapp.com',
  projectId: 'nuxt-navi',
  storageBucket: 'nuxt-navi.appspot.com',
  messagingSenderId: '302422996785',
  appId: '1:302422996785:web:53878f152ef7f8eb43a210',
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase
