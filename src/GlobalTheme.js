import { extendTheme } from '@chakra-ui/react';

const GlobalTheme = extendTheme({
  fonts: {
    heading: `omyu_pretty, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif`,
    body: `omyu_pretty, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif`,
  },
});

export default GlobalTheme;
