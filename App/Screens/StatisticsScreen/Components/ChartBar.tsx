import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {scale} from 'react-native-utils-scale';
import {COLORS} from '@/Themes/Colors';
import {TYPE} from '@/Themes/Fonts';

type Props = {
  labels: string[];
};

const ChartBar: React.FC<Props> = ({labels}) => {
  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels,
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43, 60],
            },
          ],
        }}
        width={Dimensions.get('window').width - scale(16)}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          barPercentage: 0.7,
          height: 5000,
          fillShadowGradient: COLORS.BLUE,
          fillShadowGradientOpacity: 1,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => COLORS.BLUE,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
          style: {
            borderRadius: 16,
          },
          propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: '#e3e3e3',
            strokeDasharray: '0',
          },
          propsForLabels: {
            fontFamily: TYPE.REGULAR,
          },
        }}
        yLabelsOffset={scale(20)}
      />
    </View>
  );
};

export default ChartBar;

const styles = StyleSheet.create({
  container: {
    marginLeft: scale(5),
  },
});
