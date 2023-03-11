import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {fontScale, scale} from 'react-native-utils-scale';
import {TYPE} from '@/Themes/Fonts';
import {COLORS} from '@/Themes/Colors';
import {IMAGES} from '@/Constants/Images';
import {Picker} from 'react-native-wheel-pick';
import {DATA_KG} from '@/Constants/AddInformation';
import DatePickerTime from '@/Components/PickerTime';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {SCREENS_NAME} from '@/Constants/CommonStants';
type Props = {};

const AddInformationScreen = (props: Props) => {
  const navigation = useNavigation<any>();
  const [selectedKg, setSelectedKg] = useState<string>('60');
  const [timeFrom, setTimeFrom] = useState(
    moment().set({hour: 8, minute: 0}).toDate(),
  );
  const [timeTo, setTimeTo] = useState(
    moment().set({hour: 22, minute: 0}).toDate(),
  );

  const [sex, setSex] = useState<string>('male');

  console.log(sex === 'male');

  return (
    <LinearGradient colors={['#56ccf2', '#2f80ed']} style={styles.container}>
      <SafeAreaView style={styles.container}>
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
                      backgroundColor:
                        sex === 'male' ? COLORS.BLUE : COLORS.GRAY,
                    },
                  ]}
                  onPress={() => setSex('male')}>
                  <Image source={IMAGES.male} style={styles.fieldContentImg} />
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
                    style={styles.fieldContentImg}
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
                <Picker
                  style={{
                    backgroundColor: '',
                    width: scale(120),
                    height: scale(180),
                  }}
                  selectedValue={selectedKg}
                  pickerData={DATA_KG}
                  onValueChange={value => {
                    setSelectedKg(value);
                  }}
                  textColor={COLORS.WHITE}
                  textSize={fontScale(20)}
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

            <TouchableOpacity
              style={styles.btnStart}
              activeOpacity={0.5}
              onPress={() => navigation.navigate(SCREENS_NAME.MAIN_STACK)}>
              <Text style={styles.btnStartText}>Bắt đầu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AddInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: scale(20),
  },
  titleText: {
    fontFamily: TYPE.SEMIBOLD,
    fontSize: fontScale(16),
    color: COLORS.WHITE,
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
    fontFamily: TYPE.REGULAR,
    color: COLORS.WHITE,
    fontSize: fontScale(15),
  },
  fieldContentImg: {
    tintColor: COLORS.WHITE,
    marginRight: scale(6),
  },
  fieldContentInput: {
    backgroundColor: COLORS.WHITE,
    height: scale(45),
    borderRadius: scale(15),
    padding: scale(5),
    paddingHorizontal: scale(15),
    marginTop: scale(7),
    fontFamily: TYPE.MEDIUM,
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
    height: scale(200),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  scrollPickerText: {
    fontSize: fontScale(16),
    color: Platform.OS === 'ios' ? COLORS.BLACK : COLORS.WHITE,
    fontFamily: TYPE.SEMIBOLD,
    marginLeft: scale(10),
    marginTop: Platform.OS === 'ios' ? scale(30) : 0,
  },
  pickerTime: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: scale(10),
  },
  btnStart: {
    marginTop: scale(100),
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
