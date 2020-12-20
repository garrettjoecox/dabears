import { ChakraProvider } from '@chakra-ui/react';
import Player from 'client/components/Player';
import { PlayerProvider } from 'client/state/PlayerContext';
import theme from 'client/theme';
import { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>dabears</title>
      </Head>
      <ChakraProvider theme={theme}>
        <PlayerProvider>
          <Component {...pageProps} />
          <Player />
        </PlayerProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
