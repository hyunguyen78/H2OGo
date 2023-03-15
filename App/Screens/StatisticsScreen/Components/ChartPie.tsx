import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fontScale, scale} from 'react-native-utils-scale';
import {TYPE} from '@/Themes/Fonts';
import Pie from 'react-native-pie';
import {COLORS} from '@/Themes/Colors';
type Props = {
  data?: Array<any>;
};

const ChartPie: React.FC<Props> = ({data}) => {
  const _renderItem = ({item, index}: any) => {
    return (
      <View style={styles.item}>
        <View style={[styles.pie, {backgroundColor: item.color}]} />
        <Text style={styles.itemTitle}>{item.title} (100ML)</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lượng nước uống </Text>
      <View>
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
        <FlatList
          scrollEnabled={false}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
          style={styles.chartNote}
          ItemSeparatorComponent={() => <View style={{height: scale(10)}} />}
        />
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
  chartNote: {
    position: 'absolute',
    left: scale(200),
    top: scale(40),
  },
  pie: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(50),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    marginHorizontal: scale(5),
    fontFamily: TYPE.REGULAR,
  },
});
