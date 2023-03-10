import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SCREENS_NAME} from '@/Constants/CommonStants';
import HomeScreen from '@/Screens/HomeScreen';
import RemindScreen from '@/Screens/RemindScreen';
import StatisticsScreen from '@/Screens/StatisticsScreen';
import SettingsScreen from '@/Screens/SettingsScreen';
type Props = {};

const Tab = createBottomTabNavigator();
const BottomTab = (props: Props) => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name={SCREENS_NAME.HOME_STACK} component={HomeScreen} />
      <Tab.Screen name={SCREENS_NAME.REMIND_STACK} component={RemindScreen} />
      <Tab.Screen
        name={SCREENS_NAME.STATISTICS_STACK}
        component={StatisticsScreen}
      />
      <Tab.Screen
        name={SCREENS_NAME.SETTINGS_STACK}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
