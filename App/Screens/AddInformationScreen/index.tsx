import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '@/Themes/Colors';
import {fontScale, scale} from 'react-native-utils-scale';
import {TYPE} from '@/Themes/Fonts';
import {IMAGES} from '@/Constants/Images';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import WheelNumberPicker from '@/Components/WheelNumberPicker';
import {DATA_KG} from '@/Constants/AddInformation';
import DatePickerTime from '@/Components/PickerTime';
import {SCREENS_NAME} from '@/Constants/CommonStants';
import ButtonLinear from '@/Components/ButtonLinear';
import WaveHeader from '@/Components/WaveHeader';

type Props = {};

const AddInformationScreen = (props: Props) => {
  const navigation = useNavigation<any>();
  const [selectedKg, setSelectedKg] = useState<any>(60);
  const [timeFrom, setTimeFrom] = useState(
    moment().set({hour: 8, minute: 0}).toDate(),
  );
  const [timeTo, setTimeTo] = useState(
    moment().set({hour: 22, minute: 0}).toDate(),
  );
  const [sex, setSex] = useState<string>('male');
  return (
    <SafeAreaView style={styles.container}>
      <WaveHeader showText={false} />
      <View style={styles.formContainer}>
        <Text style={styles.titleText}>
          Nhập thông tin của bạn để chúng tôi điều chỉnh lượng nước cho bạn.
        </Text>
        <View style={styles.content}>
          <View style={styles.fieldContent}>
            <View style={styles.fieldContentTop}>
              <Image style={styles.fieldContentImg} source={IMAGES.user} />
              <Text style={styles.fieldContentText}>Tên thường gọi</Text>
            </View>
            <TextInput style={styles.fieldContentInput} />
          </View>
          <View style={styles.fieldContent}>
            <View style={styles.fieldContentTop}>
              <Image style={styles.fieldContentImg} source={IMAGES.gender} />
              <Text style={styles.fieldContentText}>Giới tính</Text>
            </View>
            <View style={styles.fieldContentSex}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.fieldContentBtn,
                  {
                    backgroundColor: sex === 'male' ? COLORS.BLUE : COLORS.GRAY,
                  },
                ]}
                onPress={() => setSex('male')}>
                <Image source={IMAGES.male} style={{tintColor: COLORS.WHITE}} />
                <Text style={styles.fieldContentBtnText}>Nam</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSex('female')}
                activeOpacity={0.5}
                style={[
                  styles.fieldContentBtn,
                  {
                    backgroundColor:
                      sex === 'female' ? COLORS.PINK : COLORS.GRAY,
                  },
                ]}>
                <Image
                  source={IMAGES.female}
                  style={{tintColor: COLORS.WHITE}}
                />
                <Text style={styles.fieldContentBtnText}>Nữ</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.fieldContent}>
            <View style={styles.fieldContentTop}>
              <Image style={styles.fieldContentImg} source={IMAGES.weight} />
              <Text style={styles.fieldContentText}>Cân nặng</Text>
            </View>
            <View style={styles.scrollPicker}>
              <WheelNumberPicker
                minValue={60}
                maxValue={200}
                textStyle={styles.scrollPickerText}
                height={40}
                data={DATA_KG}
                selectedValue={selectedKg}
                unselectedTextStyle={{color: COLORS.GRAY_LIGHT}}
                onValueChange={val => setSelectedKg(val)}
              />
              <Text style={styles.scrollPickerText}>Kg</Text>
            </View>
          </View>
          <View style={styles.fieldContent}>
            <View style={styles.fieldContentTop}>
              <Image style={styles.fieldContentImg} source={IMAGES.clock} />
              <Text style={styles.fieldContentText}>
                Thời gian thức dậy - đi ngủ
              </Text>
            </View>
            <View style={styles.pickerTime}>
              <DatePickerTime
                value={timeFrom}
                onChange={value => setTimeFrom(value)}
              />
              <Text> - </Text>
              <DatePickerTime
                value={timeTo}
                onChange={value => setTimeTo(value)}
              />
            </View>
          </View>
          <ButtonLinear
            title="Bắt đầu"
            style={{
              marginTop: scale(35),
              width: '50%',
              alignSelf: 'center',
            }}
            onPress={() => navigation.replace(SCREENS_NAME.MAIN_STACK)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddInformationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  formContainer: {
    padding: scale(20),
  },
  titleText: {
    fontFamily: TYPE.SEMIBOLD,
    fontSize: fontScale(16),
    color: COLORS.BLUE,
    textAlign: 'center',
  },
  content: {
    marginTop: scale(30),
  },
  fieldContent: {
    marginTop: scale(20),
  },
  fieldContentTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldContentText: {
    fontFamily: TYPE.THIN_ITALIC,
    color: COLORS.BLACK,
    fontSize: fontScale(15),
  },
  fieldContentImg: {
    tintColor: COLORS.BLUE,
    marginRight: scale(6),
  },
  fieldContentInput: {
    height: scale(45),
    borderRadius: scale(15),
    padding: scale(5),
    paddingHorizontal: scale(15),
    marginTop: scale(7),
    fontFamily: TYPE.MEDIUM,
    borderWidth: scale(1),
    borderColor: COLORS.BLUE,
  },
  fieldContentSex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: scale(10),
    marginHorizontal: scale(50),
  },
  fieldContentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    justifyContent: 'center',
    padding: scale(8),
    borderRadius: 10,
  },
  fieldContentBtnText: {
    fontFamily: TYPE.REGULAR,
    fontSize: fontScale(14),
    color: COLORS.WHITE,
  },
  scrollPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  scrollPickerText: {
    fontSize: fontScale(16),
    color: COLORS.BLUE,
    fontFamily: TYPE.REGULAR,
  },
  pickerTime: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: scale(10),
  },
  btnStart: {
    marginTop: scale(60),
    height: scale(50),
    width: scale(150),
    backgroundColor: '#92b8ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnStartText: {
    color: COLORS.WHITE,
    fontFamily: TYPE.MEDIUM,
  },
});
