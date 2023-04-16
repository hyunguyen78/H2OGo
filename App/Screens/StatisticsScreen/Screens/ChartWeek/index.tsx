import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {COLORS} from '@/Themes/Colors';
import moment from 'moment';
import ModalDateTimePicker from '@/Components/ModalDateTimePicker';
import ChartBar from '../../Components/ChartBar';
import ChartPie from '../../Components/ChartPie';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks';
import {useIsFocused} from '@react-navigation/native';
import {scale} from 'react-native-utils-scale';

type Props = {};

const ChartWeek = (props: Props) => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const [valueTime, setValueTime] = useState(moment().toDate());
  const {waterDays} = useAppSelector(state => state.rootStore);
  const [percentWeek, setPercentWeek] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [listTotal, setListTotal] = useState<any[]>([]);
  useEffect(() => {
    if (isFocused) {
      _handleWeek(valueTime);
    }
  }, [isFocused]);
  const _handleWeek = (time: any) => {
    const monday = moment(time).startOf('week');
    let percentData = [];
    const totals: any = [];
    let total = 0;
    for (let i = 0; i < 7; i++) {
      const day = moment(monday).add(i, 'day');
      const existingDay = waterDays.find(item =>
        moment(item.date, 'DD/MM/YYYY').isSame(day, 'day'),
      );
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
    setPercentWeek(percentData);
    setTotal(total);
    setListTotal(totals);
  };

  const labelWeek = [
    t('statistics:sun'),
    t('statistics:mon'),
    t('statistics:tue'),
    t('statistics:web'),
    t('statistics:thu'),
    t('statistics:fri'),
    t('statistics:sat'),
  ];
  return (
    <View style={styles.container}>
      <View>
        <ModalDateTimePicker
          date={valueTime}
          type="week"
          mode="date"
          onChange={val => {
            setValueTime(val);
            _handleWeek(val);
          }}
        />

        <ChartBar value={percentWeek} labels={labelWeek} />
        <ChartPie data={listTotal} total={total / 1000} />
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
});
