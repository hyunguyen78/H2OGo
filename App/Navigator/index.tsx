import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS_NAME} from '@/Constants/CommonConstants';
import BottomTab from './Bottom-Tab';
import AddInformationScreen from '@/Screens/AddInformationScreen';
type Props = {};

const Stack = createNativeStackNavigator();
const Navigator = (props: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREENS_NAME.ADD_INFORMATION}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={SCREENS_NAME.MAIN_STACK} component={BottomTab} />
        <Stack.Screen
          name={SCREENS_NAME.ADD_INFORMATION}
          component={AddInformationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
