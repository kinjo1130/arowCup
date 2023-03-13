import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../utils/firebaseInit';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
