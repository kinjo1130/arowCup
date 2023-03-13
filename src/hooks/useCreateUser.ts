import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseInit';

// type Props = {
//   uid: string;
//   displayName: string;
//   photoURL: string;
// };
const createUser = async (uid: string, displayName: string, photoURL: string) => {
  // const { uid, displayName, photoURL } = props;
  // const collectionRef = collection(db, 'user', uid);
  await setDoc(doc(db, 'user', uid), {
    uid,
    displayName,
    photoURL,
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      console.log('ルーム作成');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export default createUser;
