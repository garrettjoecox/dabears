import theme from '@/client/theme';
import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="House, Trance, Dubstep, and Trap mixes" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
          <link rel="apple-touch-icon" href="/apple.png" />
          <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
        <body style={{ backgroundColor: theme.colors.black }}>
          <ColorModeScript initialColorMode="dark" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
