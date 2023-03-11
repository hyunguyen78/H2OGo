import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useState} from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {fontScale, scale} from 'react-native-utils-scale';
import {COLORS} from '@/Themes/Colors';

type Props = {
  value: Date;
  onChange: (value: any) => void;
};

const DatePickerTime: React.FC<Props> = ({value, onChange}) => {
  const [isShow, setIsShow] = useState<Boolean>(false);
  const checkPlatform = Platform.OS;
  if (checkPlatform == 'android') {
    return (
      <TouchableOpacity
        style={styles.btnAndroid}
        activeOpacity={0.5}
        onPress={() => setIsShow(true)}>
        <Text style={styles.textAndroid}>{moment(value).format('LT')}</Text>
        {isShow && (
          <RNDateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={value}
            mode={'time'}
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              setIsShow(false);
              if (event.type === 'set') {
                onChange(date);
              }
            }}
          />
        )}
      </TouchableOpacity>
    );
  }
  return (
    <RNDateTimePicker
      testID="dateTimePicker"
      timeZoneOffsetInMinutes={0}
      value={value}
      mode={'time'}
      is24Hour={true}
      accentColor={COLORS.BLUE}
      display="default"
      onChange={(event, date) => {
        if (event.type === 'set') {
          onChange(date);
        }
      }}
    />
  );
};

export default memo(DatePickerTime);

const styles = StyleSheet.create({
  btnAndroid: {
    backgroundColor: '#8080801A',
    padding: scale(7),
  },
  textAndroid: {
    fontSize: fontScale(16),
    color: COLORS.WHITE,
  },
});
