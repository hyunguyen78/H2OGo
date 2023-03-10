import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {fontScale, scale} from 'react-native-utils-scale';
import {TYPE} from '@/Themes/Fonts';
import {COLORS} from '@/Themes/Colors';

type Props = {};

const AddInformationScreen = (props: Props) => {
  return (
    <LinearGradient colors={['#56ccf2', '#2f80ed']} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.titleText}>
            Nhập thông tin của bạn để chúng tôi điều chỉnh lượng nước cho bạn.
          </Text>
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
});
