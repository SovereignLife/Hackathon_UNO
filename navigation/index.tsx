import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, StyleSheet, Animated, View, Image, Text } from 'react-native'
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import { Portal } from 'react-native-paper';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {


  const whiteLayer = <View style={[StyleSheet.absoluteFill, { backgroundColor: '#64d4f9' }]} />

  return (
    <View style={styles.container}>
      {whiteLayer}
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>

    </View>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Root" options={{ headerShown: false }} component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  floating: {
    position: 'absolute',
    zIndex: 9999,
    top: 60,
    right: 30

  }
})

