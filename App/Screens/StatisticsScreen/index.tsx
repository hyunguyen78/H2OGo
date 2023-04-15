import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import React, {memo, useState} from 'react';
import {COLORS} from '@/Themes/Colors';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {scale} from 'react-native-utils-scale';
import ChartWeek from './Screens/ChartWeek';
import ChartYear from './Screens/ChartYear';
import ChartMonth from './Screens/ChartMonth';
import {TYPE} from '@/Themes/Fonts';
import {useTranslation} from 'react-i18next';
type Props = {};

const StatisticsScreen = (props: Props) => {
  const {t} = useTranslation('statistics');
  const initialLayout = {width: Dimensions.get('window').width};

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'first', title: t('week')},
    {key: 'second', title: t('month')},
    {key: 'third', title: t('year')},
  ]);

  const _renderLabel = ({route, focused, color}: any) => (
    <Text style={[styles.label, {color: color}]}>{route.title}</Text>
  );
  const _renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        pressColor={'#FFFFFF'}
        activeColor={COLORS.BLUE}
        inactiveColor={'#41474D'}
        pressOpacity={0}
        indicatorStyle={styles.indicator}
        renderLabel={_renderLabel}
        style={styles.tabbar}
      />
    );
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        {paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0},
      ]}>
      <StatusBar barStyle={'dark-content'} />
      <TabView
        navigationState={{index, routes}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return <ChartWeek />;
            case 'second':
              return <ChartMonth />;
            case 'third':
              return <ChartYear />;
            default:
              return null;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={_renderTabBar}
        style={styles.container}
        lazy={true}
      />
    </SafeAreaView>
  );
};

export default memo(StatisticsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabbar: {
    backgroundColor: 'white',
  },
  indicator: {
    backgroundColor: COLORS.BLUE,
  },
  label: {
    color: '#41474D',
    marginVertical: scale(5),
    fontSize: scale(16),
    fontFamily: TYPE.REGULAR,
  },
});
