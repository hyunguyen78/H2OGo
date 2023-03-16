import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SCREENS_NAME} from '@/Constants/CommonStants';
import HomeScreen from '@/Screens/HomeScreen';
import RemindScreen from '@/Screens/RemindScreen';
import StatisticsScreen from '@/Screens/StatisticsScreen';
import SettingsScreen from '@/Screens/SettingsScreen';
import {scale} from 'react-native-utils-scale';
import {COLORS} from '@/Themes/Colors';
import {IMAGES} from '@/Constants/Images';
type Props = {};

const Tab = createBottomTabNavigator();
const BottomTab = (props: Props) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.BLUE,
        tabBarInactiveTintColor: COLORS.BACKGROUND,
        tabBarStyle: {
          backgroundColor: COLORS.BLUE,
          position: 'absolute',
          left: 10,
          right: 10,
          bottom: 20,
          borderRadius: 50,
          height: scale(65),
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.3,
          shadowRadius: 2,
          // android (Android +5.0)
          elevation: 1,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName: any;
          if (route.name === SCREENS_NAME.HOME_STACK) {
            iconName = IMAGES.home;
          }
          if (route.name === SCREENS_NAME.REMIND_STACK) {
            iconName = IMAGES.remind;
          }
          if (route.name === SCREENS_NAME.STATISTICS_STACK) {
            iconName = IMAGES.statistics;
          }
          if (route.name === SCREENS_NAME.SETTINGS_STACK) {
            iconName = IMAGES.setting;
          }

          {
            return focused ? (
              <View style={styles.iconFocused}>
                <Image
                  source={iconName}
                  style={{
                    tintColor: color,
                    height: scale(30),
                    padding: scale(5),
                    width: scale(30),
                  }}
                />
              </View>
            ) : (
              <Image
                source={iconName}
                style={{
                  tintColor: color,
                  marginTop: Platform.OS == 'ios' ? scale(30) : 0,
                  height: scale(30),
                  width: scale(30),
                }}
              />
            );
          }
        },
      })}>
      <Tab.Screen name={SCREENS_NAME.HOME_STACK} component={HomeScreen} />
      <Tab.Screen
        name={SCREENS_NAME.STATISTICS_STACK}
        component={StatisticsScreen}
      />
      <Tab.Screen name={SCREENS_NAME.REMIND_STACK} component={RemindScreen} />
      <Tab.Screen
        name={SCREENS_NAME.SETTINGS_STACK}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  iconFocused: {
    backgroundColor: COLORS.WHITE,
    height: scale(45),
    width: scale(45),
    marginTop: Platform.OS == 'ios' ? scale(30) : 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
