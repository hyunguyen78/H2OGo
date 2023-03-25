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
    },
    {
      label: 'gender',
      icon: IMAGES.gender,
    },
    {
      label: 'weight',
      icon: IMAGES.weight,
    },
    {
      label: 'dailyGoals',
      icon: IMAGES.waterGoal,
    },
    {
      label: 'glassOfWater',
      icon: IMAGES.glassOfWater1,
    },
    {
      label: 'language',
      icon: IMAGES.language,
    },
  ];
  const _handleModal = (label: string) => {
    if (label === 'dailyGoals') {
      return modalDailyGoal.show(123);
    }
    if (label === 'glassOfWater') {
      return modalManagementWater.show(123);
    }
  };
  const _renderItem = ({item, index}: any) => {
    if (item.label === 'livingTime') {
      return (
        <View style={styles.item}>
          <View style={styles.itemRow}>
            <Image source={item?.icon} />
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
          <Image source={item?.icon} />
          <View>
            <Text style={styles.itemText}>{t(item.label)}</Text>
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
          ListHeaderComponent={() => <View style={{height: scale(20)}} />}
        />
      </View>
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
    fontSize: fontScale(20),
    fontFamily: TYPE.SEMIBOLD,
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
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
