import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PieChart} from 'react-native-chart-kit';
import {fontScale, scale} from 'react-native-utils-scale';
import {TYPE} from '@/Themes/Fonts';
import Pie from 'react-native-pie';
import {COLORS} from '@/Themes/Colors';
type Props = {
  data?: Array<any>;
};

const ChartPie: React.FC<Props> = ({data}) => {
  console.log(data);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lượng nước uống </Text>
      <View style={styles.chart}>
        <Pie
          radius={80}
          innerRadius={50}
          sections={data}
          strokeCap={'butt'}
          dividerSize={2}
        />
        <View style={styles.gauge}>
          <Text style={styles.gaugeText}>1,5L</Text>
        </View>
      </View>
    </View>
  );
};

export default ChartPie;

const styles = StyleSheet.create({
  container: {
    margin: scale(16),
  },
  title: {
    fontFamily: TYPE.MEDIUM,
    fontSize: fontScale(16),
  },
  chart: {
    margin: scale(20),
    backgroundColor: 'red',
    flex: 1,
  },
  gauge: {
    position: 'absolute',
    width: scale(166),
    height: scale(160),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    color: COLORS.BLACK,
    fontSize: fontScale(24),
    fontFamily: TYPE.SEMIBOLD,
  },
});
