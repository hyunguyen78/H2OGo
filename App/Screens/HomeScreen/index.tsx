import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {COLORS} from '@/Themes/Colors';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {fontScale, scale} from 'react-native-utils-scale';
import {TYPE} from '@/Themes/Fonts';
import WaveHeader from '@/Components/WaveHeader';
import ButtonMenu from './Components/ButtonMenu';
import {useTranslation} from 'react-i18next';
import ChooseML from './Components/ChooseML';
import ListHistory from './Components/ListHistory';
import ModalSetWater from './Components/ModalSetWater';
import {modalDailyGoal} from '@/Components/ModalDailyGoal';

type Props = {};

const HomeScreen = (props: Props) => {
  const {t} = useTranslation('home');
  const [drank, setDrank] = useState(20);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <WaveHeader />
        <View style={styles.content}>
          <AnimatedCircularProgress
            style={styles.circle}
            size={scale(260)}
            width={scale(12)}
            fill={drank}
            tintColor={COLORS.BLUE}
            rotation={0}
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor={COLORS.GRAY_LIGHT}>
            {() => (
              <TouchableOpacity
                style={styles.circleBox}
                activeOpacity={0.5}
                onPress={() => modalDailyGoal.show(123)}>
                <Text style={styles.circleBoxPercent}>20%</Text>
                <Text style={styles.circleTextTitle}>{t('dailyGoal')}</Text>
                <Text style={styles.circleTextNumber}>600/2000ml</Text>
              </TouchableOpacity>
            )}
          </AnimatedCircularProgress>
          <View style={styles.menu}>
            <ButtonMenu value="water" />
          </View>
          <ChooseML />
        </View>
        <ListHistory />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    marginTop: scale(150),
  },
  circle: {
    alignSelf: 'center',
  },
  circleBox: {
    alignItems: 'center',
    marginTop: scale(20),
    padding: scale(20),
    justifyContent: 'space-between',
  },
  circleBoxPercent: {
    fontSize: scale(35),
    fontFamily: TYPE.SEMIBOLD,
    color: COLORS.BLUE,
  },
  circleTextTitle: {
    fontSize: fontScale(16),
    fontFamily: TYPE.LIGHT,
    marginVertical: scale(3),
    color: COLORS.GRAY_DARK,
  },
  circleTextNumber: {
    fontSize: fontScale(18),
    fontFamily: TYPE.MEDIUM,
    marginVertical: scale(3),
    color: COLORS.BLUE,
  },
  circleBoxAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(10),
  },
  circleBoxActionIcon: {
    tintColor: COLORS.BLUE,
  },
  menu: {
    marginVertical: scale(15),
  },
});
