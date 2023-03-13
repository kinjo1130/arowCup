import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../utils/firebaseInit';

const getUser = async () => {
  const auth = getAuth();
  const userObj = {
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
  };
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
        const { displayName, email, photoURL } = docSnap.data();
        userObj.uid = uid;
        userObj.displayName = displayName;
        userObj.email = email;
        userObj.photoURL = photoURL;
      }
    }
    console.log('ログインしていません');
  });
  return {
    userObj,
  };
};
export default getUser;
