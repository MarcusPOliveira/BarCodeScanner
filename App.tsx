import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import { Routes } from './src/routes';
import theme from './src/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme} >
      <StatusBar backgroundColor="transparent" barStyle='light-content' translucent />
      <Routes />
    </ThemeProvider>
  );
}
