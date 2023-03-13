import { getAuth, signOut } from 'firebase/auth';

function logout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log('ログアウト成功');
    })
    .catch((error) => {
      console.log('ログアウトエラー', error);
    });
}
export default logout;
