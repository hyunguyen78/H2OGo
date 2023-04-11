import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {fontScale, scale} from 'react-native-utils-scale';
import {TYPE} from '@/Themes/Fonts';
import Pie from 'react-native-pie';
import {COLORS} from '@/Themes/Colors';
import {useTranslation} from 'react-i18next';
type Props = {
  data?: Array<any>;
  total?: number;
};

const ChartPie: React.FC<Props> = ({data, total}) => {
  const {t} = useTranslation();
  const _renderItem = ({item, index}: any) => {
    return (
      <View style={styles.item}>
        <View style={[styles.pie, {backgroundColor: item.color}]} />
        <Text style={styles.itemTitle}>
          {t(`home:${item.title}`)} ({item.amount}ML)
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lượng nước uống </Text>
      <View style={styles.content}>
        <Pie
          radius={80}
          innerRadius={50}
          sections={data}
          strokeCap={'butt'}
          dividerSize={2}
        />
        <View style={styles.gauge}>
          <Text style={styles.gaugeText}>{total}L</Text>
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(30),
    marginTop: scale(20),
  },

  gauge: {
    flex: 1,
    height: scale(150),
    width: scale(150),
    position: 'absolute',
    left: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  gaugeText: {
    color: COLORS.BLACK,
    fontSize: fontScale(24),
    fontFamily: TYPE.SEMIBOLD,
  },
  chartNote: {
    marginLeft: scale(20),
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
