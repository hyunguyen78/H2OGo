import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '@/Themes/Colors';
import {BarChart, PieChart} from 'react-native-chart-kit';
import {scale} from 'react-native-utils-scale';
import moment from 'moment';
import ModalDateTimePicker from '@/Components/ModalDateTimePicker';
import ChartBar from '../../Components/ChartBar';
import ChartPie from '../../Components/ChartPie';
import {useTranslation} from 'react-i18next';

type Props = {};

const ChartWeek = (props: Props) => {
  const {t} = useTranslation();
  const [valueTime, setValueTime] = useState(moment().toDate());

  const dataWeek = [
    t('common:sun'),
    t('common:mon'),
    t('common:tue'),
    t('common:web'),
    t('common:thu'),
    t('common:fri'),
    t('common:sat'),
  ];

  const dataChartPie = [
    {
      percentage: 10,
      color: '#C70039',
      title: 'water',
    },
    {
      percentage: 20,
      color: '#44CD40',
      title: 'bear',
    },
    {
      percentage: 30,
      color: '#404FCD',
      title: 'tea',
    },
    {
      percentage: 40,
      color: '#EBD22F',
      title: 'milk',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ModalDateTimePicker
          date={valueTime}
          type="week"
          mode="date"
          onChange={val => setValueTime(val)}
        />

        <ChartBar labels={dataWeek} />
        <ChartPie data={dataChartPie} />
      </View>
    </View>
  );
};

export default ChartWeek;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {},
});
