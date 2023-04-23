import {StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import ModalDateTimePicker from '@/Components/ModalDateTimePicker';
import moment from 'moment';
import ChartBar from '../../Components/ChartBar';
import ChartPie from '../../Components/ChartPie';
import {COLORS} from '@/Themes/Colors';
import {useTranslation} from 'react-i18next';
import {checkDaysInMonth, dataLabelMonth} from '@/Utils/FormatTime';
import {useAppSelector} from '@/Hooks';

type Props = {};

const ChartYear = (props: Props) => {
  const {t} = useTranslation();
  const [valueTime, setValueTime] = useState(moment().toDate());
  const [listTotal, setListTotal] = useState([]);
  const [dataYear, setDataYear] = useState([]);
  const [total, setTotal] = useState<number>(0);
  const {waterDays} = useAppSelector(state => state.rootStore);

  useEffect(() => {
    _handleYear(valueTime);
  }, []);

  const _handleYear = (time: any) => {
    const currentDate = moment(time);
    const currentYear = currentDate.format('YYYY');
    const totals: any = [];
    let yearData: any = [];
    let total = 0;
    for (let i = 0; i < 12; i++) {
      const month = moment(currentYear + '-' + (i + 1), 'YYYY-MM');
      const monthWaterDays = waterDays.filter(item =>
        moment(item.date, 'DD/MM/YYYY').isSame(month, 'month'),
      );
      let amount = 0;

      if (monthWaterDays.length > 0) {
        monthWaterDays.forEach(item => {
          item.waterList.forEach((t: any) => {
            const index = totals.findIndex((f: any) => f.title === t.type);
            if (index !== -1) {
              totals[index].amount += t.amount;
            } else {
              totals.push({
                title: t.type,
                amount: t.amount,
                color: t.color,
              });
            }
            total += t.amount;
          });
          totals.forEach((item: any) => {
            item.percentage = Number(((item.amount / total) * 100).toFixed(1));
          });
          for (let j = 0; j < item.waterList.length; j++) {
            amount += item.waterList[j].amount;
          }
        });
      }
      yearData.push((amount / 1000).toFixed(1));
    }
    setTotal(total);
    setListTotal(totals);
    setDataYear(yearData);
  };

  return (
    <View style={styles.container}>
      <View>
        <ModalDateTimePicker
          date={valueTime}
          type="year"
          mode="date"
          onChange={val => {
            setValueTime(val);
            _handleYear(val);
          }}
        />

        <ChartBar
          value={dataYear}
          labels={dataLabelMonth()}
          barPercentage={0.2}
          fontSizeLabel={12}
        />
        <ChartPie data={listTotal} total={total / 1000} />
      </View>
    </View>
  );
};

export default memo(ChartYear);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
