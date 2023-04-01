import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '@/Themes/Colors';
import {fontScale, scale} from 'react-native-utils-scale';
import {TYPE} from '@/Themes/Fonts';
import {IMAGES} from '@/Constants/Images';
import {useTranslation} from 'react-i18next';
import {modalDailyGoal} from '@/Components/ModalDailyGoal';
import {modalManagementWater} from '@/Components/ModalManagementWater';
import PickerTime from '@/Components/PickerTime';
import ModalReminderDistance, {
  modalReminderDistance,
  modalReminderDistanceRef,
} from './Components/ModalReminderDistance';
import ModalSex, {modalSex, modalSexRef} from './Components/ModalSex';
import ModalWeight, {
  modalWeight,
  modalWeightRef,
} from './Components/ModalWeight';
import ModalLanguage, {
  modalLanguage,
  modalLanguageRef,
} from './Components/ModalLanguage';

type Props = {};

const SettingScreen = (props: Props) => {
  const {t} = useTranslation('settings');
  const dataSetting = [
    {
      label: 'livingTime',
      icon: IMAGES.clock,
    },
    {
      label: 'reminderDistance',
      icon: IMAGES.hourGlass,
      text: '60 phút',
    },
    {
      label: 'gender',
      icon: IMAGES.gender,
      text: 'Nam',
    },
    {
      label: 'weight',
      icon: IMAGES.weight,
      text: '60 kg',
    },
    {
      label: 'dailyGoals',
      icon: IMAGES.waterGoal,
      text: '2000 ML',
    },
    {
      label: 'glassOfWater',
      icon: IMAGES.glassOfWater1,
      text: 'Danh sách ly nước',
    },
    {
      label: 'language',
      icon: IMAGES.language,
      text: 'Tiếng việt',
    },
  ];
  const _handleModal = (label: string) => {
    if (label === 'dailyGoals') {
      return modalDailyGoal.show(123);
    }
    if (label === 'glassOfWater') {
      return modalManagementWater.show(123);
    }
    if (label === 'reminderDistance') {
      return modalReminderDistance.show(123);
    }
    if (label === 'gender') {
      return modalSex.show(123);
    }
    if (label === 'weight') {
      return modalWeight.show(123);
    }
    return modalLanguage.show(23);
  };
  const _renderItem = ({item, index}: any) => {
    if (item.label === 'livingTime') {
      return (
        <View style={styles.item}>
          <View style={styles.itemRow}>
            <Image source={item?.icon} style={styles.icon} />
            <View>
              <Text style={styles.itemText}>{t(item.label)}</Text>
              <View style={{...styles.itemRow, marginTop: scale(10)}}>
                <PickerTime mode="time" value={new Date()} />
                <Text>{`   - `}</Text>
                <PickerTime mode="time" value={new Date()} />
              </View>
            </View>
          </View>
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.5}
        onPress={() => _handleModal(item.label)}>
        <View style={styles.itemRow}>
          <Image source={item?.icon} style={styles.icon} />
          <View>
            <Text style={styles.itemText}>{t(item.label)}</Text>
            <Text style={styles.itemText100}>{item?.text}</Text>
          </View>
        </View>
        <Image source={IMAGES.right} />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.formContainer}>
        <Text style={styles.headerTitle}>Cài đặt</Text>
        <FlatList
          data={dataSetting}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
          ItemSeparatorComponent={() => (
            <View style={{height: scale(0.5), backgroundColor: COLORS.GRAY}} />
          )}
          scrollEnabled={false}
          ListHeaderComponent={() => <View style={{height: scale(10)}} />}
        />
      </View>
      <ModalReminderDistance ref={modalReminderDistanceRef} />
      <ModalSex ref={modalSexRef} />
      <ModalWeight ref={modalWeightRef} />
      <ModalLanguage ref={modalLanguageRef} />
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  formContainer: {
    margin: scale(16),
  },
  headerTitle: {
    fontSize: fontScale(22),
    fontFamily: TYPE.SEMIBOLD_ITALIC,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(15),
  },
  itemText: {
    fontSize: fontScale(15),
    fontFamily: TYPE.REGULAR,
    marginLeft: scale(10),
    color: COLORS.BLACK,
  },
  itemText100: {
    fontSize: fontScale(13),
    fontFamily: TYPE.LIGHT_ITALIC,
    marginLeft: scale(10),
    color: COLORS.BLACK,
    marginTop: scale(2),
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    tintColor: COLORS.BLUE,
  },
});
