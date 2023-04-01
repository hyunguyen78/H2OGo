import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '@/Themes/Colors';
import {fontScale, scale} from 'react-native-utils-scale';
import {TYPE} from '@/Themes/Fonts';

type Props = {};

const HistoryScreen = (props: Props) => {
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.formContainer}>
        <Text style={styles.headerTitle}>Lịch Sử</Text>
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;

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
});
