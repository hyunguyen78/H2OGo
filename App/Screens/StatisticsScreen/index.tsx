import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '@/Themes/Colors';
import {BarChart} from 'react-native-chart-kit';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {scale} from 'react-native-utils-scale';
import ChartWeek from './Screens/ChartWeek';
import ChartYear from './Screens/ChartYear';
import ChartMonth from './Screens/ChartMonth';
type Props = {};

const StatisticsScreen = (props: Props) => {
  const initialLayout = {width: Dimensions.get('window').width};

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'first', title: 'Week'},
    {key: 'second', title: 'Month'},
    {key: 'third', title: 'Year'},
  ]);

  const renderScene = SceneMap({
    first: () => <ChartWeek />,
    second: () => <ChartMonth />,
    third: () => <ChartYear />,
  });

  const _renderLabel = ({route, focused, color}: any) => (
    <Text style={[styles.label, {color: color}]}>{route.title}</Text>
  );
  const _renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        pressColor={'#FFFFFF'}
        activeColor={'#1B65E3'}
        inactiveColor={'#41474D'}
        pressOpacity={0}
        indicatorStyle={styles.indicator}
        renderLabel={_renderLabel}
        style={styles.tabbar}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={_renderTabBar}
        style={styles.container}
        lazy={true}
      />
    </SafeAreaView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabbar: {
    backgroundColor: 'white',
  },
  indicator: {
    backgroundColor: '#1B65E3',
  },
  label: {
    color: '#41474D',
    marginVertical: scale(5),
    // fontFamily: FONT.bold,
    fontSize: scale(14),
  },
});
