import { extendTheme } from '@chakra-ui/react';

const GlobalTheme = extendTheme({
  fonts: {
    heading: `KBO-Dia-Gothic_bold, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif`,
    body: `KBO-Dia-Gothic_bold, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif`,
  },
});

export default GlobalTheme;
