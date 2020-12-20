import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export default extendTheme({
  styles: {
    global: (props) => ({
      'html, body, #root': {
        height: '100%',
      },
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('white', 'gray.900')(props),
        transition: 'background-color 0.2s',
        lineHeight: 'base',
      },
      '#__next': {
        paddingBottom: '40px',
      },
      '*::placeholder': {
        color: mode('gray.400', 'whiteAlpha.400')(props),
      },
      '*, *::before, &::after': {
        borderColor: mode('gray.200', 'whiteAlpha.300')(props),
        wordWrap: 'break-word',
      },
    }),
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
});
