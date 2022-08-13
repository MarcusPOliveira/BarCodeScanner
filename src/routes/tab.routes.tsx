import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';

import { Home } from '../screens/Home';
import { CodeList } from '../screens/CodeList';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {

  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.alert,
        tabBarInactiveTintColor: theme.colors.shape,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        }
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name='scan1' size={24} color={color} />
          )
        }}
      />
      <Screen
        name="codeList"
        component={CodeList}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='list' size={24} color={color} />
          )
        }}
      />
    </Navigator>
  )
}
