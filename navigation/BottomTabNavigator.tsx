import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View } from '../components/Themed';
import { Portal, Text, Provider } from 'react-native-paper';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import FiltersScreen from '../screens/FiltersScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FilterDetailed from '../screens/FilterDetailed'
import CurrentImage from '../components/CurrentImage'

import { BottomTabParamList, FiltersScreenParamList, FavoritesScreenParamList } from '../types';



const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Фильтры"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Фильтры"
        component={FilterScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-camera" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Избранное"
        component={FavoritesScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-star" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const FiltersScreenStack = createStackNavigator<FiltersScreenParamList>();

export default function FilterScreenNavigator() {
  return (
    <Provider>

      <FiltersScreenStack.Navigator >
        <FiltersScreenStack.Screen
          name="FiltersScreen"
          component={FiltersScreen}
          options={{ headerShown: false }}
        />
        <FiltersScreenStack.Screen
          name="FilterDetailed"
          component={FilterDetailed}
          options={{ headerShown: false }}
        />
      </FiltersScreenStack.Navigator>
      <View style={{ position: 'absolute', top: 60, right: 30, backgroundColor: 'transparent' }}>
        <CurrentImage />
      </View>
    </Provider>
  );
}

const FavoritesScreenStuck = createStackNavigator<FavoritesScreenParamList>();

function FavoritesScreenNavigator() {
  return (
    <FavoritesScreenStuck.Navigator>

      <FavoritesScreenStuck.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{ headerTitle: 'Избранное' }}
      />
    </FavoritesScreenStuck.Navigator>
  );
}
