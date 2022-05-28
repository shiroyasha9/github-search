import type { AppProps } from 'next/app';

import { GithubProvider } from '../context';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GithubProvider>
      <Component {...pageProps} />
    </GithubProvider>
  );
}

export default MyApp;
