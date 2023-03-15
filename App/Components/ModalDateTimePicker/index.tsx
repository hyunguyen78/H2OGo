import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {fontScale, scale} from 'react-native-utils-scale';
import {COLORS} from '@/Themes/Colors';
import {IMAGES} from '@/Constants/Images';
import {TYPE} from '@/Themes/Fonts';
import {useTranslation} from 'react-i18next';

type Props = {
  date: Date;
  type?: 'week' | 'month' | 'year';
  mode: 'date' | 'datetime' | 'time';
  onChange: (val: any) => void;
};

const ModalDateTimePicker: React.FC<Props> = ({
  date,
  type = 'month',
  mode,
  onChange,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const {t} = useTranslation();

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };
  return (
    <View>
      <TouchableOpacity onPress={showDatePicker} style={styles.btnPicker}>
        <Image source={IMAGES.calendar} />
        {type === 'week' && (
          <Text style={styles.btnPickerText}>{`${moment(date)
            .startOf('week')
            .format('DD/MM/YYYY')} - ${moment(date)
            .endOf('week')
            .format('DD/MM/YYYY')} `}</Text>
        )}
        {type === 'month' && (
          <Text style={styles.btnPickerText}>{`${moment(date).format(
            'MM/YYYY',
          )}`}</Text>
        )}
        {type === 'year' && (
          <Text style={styles.btnPickerText}>{`${t('statistics:year')} ${moment(
            date,
          ).format('YYYY')}`}</Text>
        )}
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        // locale="vi_VN"
      />
    </View>
  );
};

export default ModalDateTimePicker;

const styles = StyleSheet.create({
  btnPicker: {
    alignSelf: 'center',
    marginVertical: scale(16),
    backgroundColor: COLORS.BLUE_LIGHT,
    padding: scale(12),
    borderRadius: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnPickerText: {
    fontFamily: TYPE.REGULAR,
    marginLeft: scale(10),
    fontSize: fontScale(16),
    color: COLORS.BLUE,
  },
});
