import { ChakraProvider } from '@chakra-ui/react';
import Player from 'client/components/Player';
import store from 'client/state';
import theme from 'client/theme';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>dabears</title>
      </Head>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          <Player />
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
