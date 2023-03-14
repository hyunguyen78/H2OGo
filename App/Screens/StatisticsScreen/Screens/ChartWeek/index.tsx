import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '@/Themes/Colors';

type Props = {};

const ChartWeek = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>ChartWeek</Text>
    </View>
  );
};

export default ChartWeek;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
