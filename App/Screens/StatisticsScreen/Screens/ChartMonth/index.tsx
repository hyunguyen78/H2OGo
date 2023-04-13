import {StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import ModalDateTimePicker from '@/Components/ModalDateTimePicker';
import moment from 'moment';
import ChartBar from '../../Components/ChartBar';
import ChartPie from '../../Components/ChartPie';
import {COLORS} from '@/Themes/Colors';
import {useTranslation} from 'react-i18next';
import {checkDaysInMonth} from '@/Utils/FormatTime';
import {useAppSelector} from '@/Hooks';

type Props = {};

const ChartMonth = (props: Props) => {
  const {t} = useTranslation();
  const [valueTime, setValueTime] = useState(moment().toDate());
  const {waterDays} = useAppSelector(state => state.rootStore);
  const [percentMonth, setPercentMonth] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [listTotal, setListTotal] = useState<any[]>([]);

  useEffect(() => {
    _handleMonth(valueTime);
  }, []);

  const _handleMonth = (time: any) => {
    const today = moment(time);
    const month = today.month();
    const year = today.year();
    const daysInMonth = moment(`${year}-${month + 1}`, 'YYYY-MM').daysInMonth();
    const label = [];
    let percentData = [];
    const totals: any = [];
    let total = 0;
    for (let i = 1; i <= daysInMonth; i++) {
      const day = moment(`${year}-${month + 1}-${i}`, 'YYYY-MM-DD');
      const dayString = day.format('D');
      const existingDay = waterDays.find(item =>
        moment(item.date, 'DD/MM/YYYY').isSame(day, 'day'),
      );
      label.push(dayString);
      let amount = 0;
      if (existingDay) {
        existingDay.waterList.forEach((item: any) => {
          // Tìm kiếm loại nước uống đã tồn tại trong mảng totals.
          const index = totals.findIndex((t: any) => t.title === item.type);
          if (index !== -1) {
            totals[index].amount += item.amount;
          } else {
            totals.push({
              title: item.type,
              amount: item.amount,
              color: item.color,
            });
          }
          total += item.amount;
        });
        totals.forEach((item: any) => {
          item.percentage = Number(((item.amount / total) * 100).toFixed(1));
        });
        for (let j = 0; j < existingDay.waterList.length; j++) {
          amount += existingDay.waterList[j].amount;
        }
      }
      const goal = existingDay ? existingDay.goal : 2500; // Lấy mục tiêu uống nước cho từng ngày
      const percent = (amount / goal) * 1000;
      percentData.push(percent);
    }
    setPercentMonth(percentData);
    setTotal(total);
    setListTotal(totals);
  };

  return (
    <View style={styles.container}>
      <View>
        <ModalDateTimePicker
          date={valueTime}
          type="month"
          mode="date"
          onChange={val => {
            setValueTime(val);
            _handleMonth(val);
          }}
        />

        <ChartBar
          value={percentMonth}
          labels={checkDaysInMonth(valueTime)}
          barPercentage={0.2}
          fontSizeLabel={7}
        />
        <ChartPie data={listTotal} total={total / 1000} />
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
