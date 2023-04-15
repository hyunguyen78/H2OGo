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
import {useAppDispatch, useAppSelector} from '@/Hooks';
import moment from 'moment';
import {rootStoreActions} from '@/Redux';

type Props = {};

const SettingScreen = (props: Props) => {
  const {t} = useTranslation('settings');
  const dispatch = useAppDispatch();
  const {
    reminderDistance,
    gender,
    weight,
    dailyGoal,
    language,
    bedTime,
    wakeUpTime,
  } = useAppSelector(state => {
    return {
      ...state.rootStore,
      ...state.rootStore.infor,
    };
  });

  const dataSetting = [
    {
      label: 'livingTime',
      icon: IMAGES.clock,
    },
    {
      label: 'reminderDistance',
      icon: IMAGES.hourGlass,
      text: `${reminderDistance} phút`,
    },
    {
      label: 'gender',
      icon: IMAGES.gender,
      text: `${gender}`,
    },
    {
      label: 'weight',
      icon: IMAGES.weight,
      text: `${weight} kg`,
    },
    {
      label: 'dailyGoals',
      icon: IMAGES.waterGoal,
      text: `${dailyGoal} ML`,
    },
    {
      label: 'glassOfWater',
      icon: IMAGES.glassOfWater1,
      text: 'Danh sách ly nước',
    },
    {
      label: 'language',
      icon: IMAGES.language,
      text: language,
    },
  ];
  const _handleModal = (label: string) => {
    if (label === 'dailyGoals') {
      return modalDailyGoal.show(dailyGoal);
    }
    if (label === 'glassOfWater') {
      return modalManagementWater.show();
    }
    if (label === 'reminderDistance') {
      return modalReminderDistance.show(reminderDistance);
    }
    if (label === 'gender') {
      return modalSex.show(gender);
    }
    if (label === 'weight') {
      return modalWeight.show(weight);
    }
    return modalLanguage.show(language);
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
                <PickerTime
                  mode="time"
                  value={moment(wakeUpTime).toDate()}
                  onChange={val =>
                    dispatch(
                      rootStoreActions.handleWakeUpTime(moment(val).valueOf()),
                    )
                  }
                />
                <Text>{`   - `}</Text>
                <PickerTime
                  mode="time"
                  value={moment(bedTime).toDate()}
                  onChange={val =>
                    dispatch(
                      rootStoreActions.handleBedTime(moment(val).valueOf()),
                    )
                  }
                />
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
