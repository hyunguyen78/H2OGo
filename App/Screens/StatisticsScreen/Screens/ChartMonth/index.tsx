import {StyleSheet, Text, View} from 'react-native';
import React, {memo, useState} from 'react';
import ModalDateTimePicker from '@/Components/ModalDateTimePicker';
import moment from 'moment';
import ChartBar from '../../Components/ChartBar';
import ChartPie from '../../Components/ChartPie';
import {COLORS} from '@/Themes/Colors';
import {useTranslation} from 'react-i18next';
import {checkDaysInMonth} from '@/Utils/FormatTime';

type Props = {};

const ChartMonth = (props: Props) => {
  const {t} = useTranslation();
  const [valueTime, setValueTime] = useState(moment().toDate());

  const dataWeek = [
    20, 40, 60, 70, 30, 40, 200, 59, 59, 23, 45, 23, 500, 234, 65, 32, 76, 12,
    546, 12, 67, 45, 56, 34, 76, 45, 6, 45, 32, 765, 234,
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
      <View>
        <ModalDateTimePicker
          date={valueTime}
          type="month"
          mode="date"
          onChange={val => setValueTime(val)}
        />

        <ChartBar
          value={dataWeek}
          labels={checkDaysInMonth(valueTime)}
          barPercentage={0.2}
          fontSizeLabel={7}
        />
        <ChartPie data={dataChartPie} />
      </View>
    </View>
  );
};

export default memo(ChartMonth);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
