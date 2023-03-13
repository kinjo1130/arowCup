import { doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseInit';

// type Props = {
//   uid: string;
//   displayName: string;
//   photoURL: string;
// };
const createUser = async (uid: string, displayName: string, photoURL: string) => {
  // const { uid, displayName, photoURL } = props;
  // const collectionRef = collection(db, 'user', uid);
  try {
    await setDoc(doc(db, 'user', uid), {
      uid,
      displayName,
      photoURL,
    });
  } catch (err) {
    console.log('Error creating user: ', err);
  }
};

export default createUser;
