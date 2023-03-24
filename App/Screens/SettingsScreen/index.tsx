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

type Props = {};

const SettingScreen = (props: Props) => {
  const dataSetting = [
    {
      value: 'livingTime',
      icon: IMAGES.clock,
    },
    {
      value: 'gender',
      icon: IMAGES.gender,
    },
    {
      value: 'weight',
      icon: IMAGES.weight,
    },
    {
      value: 'dailyGoals',
      icon: IMAGES.waterGoal,
    },
    {
      value: 'glassOfWater',
      icon: IMAGES.glassOfWater1,
    },
    {
      value: 'language',
      icon: IMAGES.language,
    },
  ];
  const _renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Image source={item?.icon} />
        <Text>{item.value}</Text>
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
            <View style={{height: scale(1), backgroundColor: COLORS.GRAY}} />
          )}
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
    height: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
