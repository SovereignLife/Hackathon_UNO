import { StatusBar } from 'expo-status-bar';
import store from './store';
import React from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native'
import { Provider, useSelector, useDispatch } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';



export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider>
        <Provider store={store}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar backgroundColor="#fff" />
        </Provider>
      </PaperProvider>
    );
  }
}

