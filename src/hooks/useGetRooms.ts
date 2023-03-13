import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseInit';

const getRooms = async (uid: any) => {
  // const { uid, displayName, photoURL } = props;
  // const collectionRef = collection(db, 'user', uid);
  const roomRef = collection(db, 'groups', uid, 'room');
  const roomSnapshot = await getDocs(roomRef);
  roomSnapshot.docs.map((doc) => {
    doc.data();
    console.log(doc.data());
    console.log(doc.id);
  });
};
export default getRooms;
