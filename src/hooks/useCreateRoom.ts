import { addDoc, collection } from 'firebase/firestore';
import { db } from '../utils/firebaseInit';

type Props = {
  uid: string;
  displayName: string;
  photoURL: string;
};
async function createRoom(props: Props) {
  const { uid, displayName, photoURL } = props;
  // const PATH = `group/${uid}/roomId`;
  // ルームのコレクションを作成
  const collectionRef = collection(db, 'groups', uid, 'room');
  await addDoc(collectionRef, {
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
}
export default createRoom;
