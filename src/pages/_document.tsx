import { ColorModeScript } from '@chakra-ui/react';
import theme from 'client/theme';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body style={{ backgroundColor: theme.colors.gray[900] }}>
          <ColorModeScript initialColorMode="dark" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
