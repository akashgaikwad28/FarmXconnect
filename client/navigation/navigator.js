import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginFarmer from '../screens/LoginFarmer/LoginFarmer';
import LoginTrader from '../screens/LoginTrader/LoginTrader';
import SignUp from '../screens/SignUp/SignUp';
import Home from '../screens/Home/Home';
import Trades from '../screens/Trades/Trades';
import AddPost from '../screens/AddPost/AddPost';
import AddTrade from '../screens/AddTrade/AddTrade';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='LoginFarmer'
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name='LoginFarmer' component={LoginFarmer} />
        <Stack.Screen name='LoginTrader' component={LoginTrader} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Trades' component={Trades} />
        <Stack.Screen
          name='AddPost'
          component={AddPost}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'M-bold',
            },
            headerBackgroundContainerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <Stack.Screen
          name='AddTrade'
          component={AddTrade}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'M-bold',
            },
            headerBackgroundContainerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
