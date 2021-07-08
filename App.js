
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreeen from './screens/Homescreen'
import MeteorScreen from './screens/MeteorScreen'
import IssLocationScreen from './screens/IsslocationScreen'

const Stack  = createStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
         <Stack.Navigator initialRouteName = "HomeScreen" screenOptions  = {{headerShown:false}}>

             <Stack.Screen name = "HomeScreen" component = {HomeScreeen}/>
             <Stack.Screen name = "MeteorScreen" component = {MeteorScreen}/>
             <Stack.Screen name = "IssLocationScreen" component = {IssLocationScreen}/>

         </Stack.Navigator>

    </NavigationContainer>
  )
}


