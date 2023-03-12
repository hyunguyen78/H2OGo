import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {fontScale, scale} from 'react-native-utils-scale';
import {IMAGES} from '@/Constants/Images';
import {_generateGreetings} from '@/Utils/FormatTime';
import {COLORS} from '@/Themes/Colors';
import {TYPE} from '@/Themes/Fonts';
import {useTranslation} from 'react-i18next';

type Props = {
  showText?: boolean;
};

const WaveHeader: React.FC<Props> = ({showText = true}) => {
  const {t} = useTranslation('home');

  return (
    <View style={styles.header}>
      <View style={{backgroundColor: COLORS.BLUE_LIGHT, height: scale(150)}}>
        <Svg
          height="60%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{position: 'absolute', top: 130}}>
          <Path
            fill={COLORS.BLUE_LIGHT}
            fill-opacity="1"
            d="M0,96L80,101.3C160,107,320,117,480,106.7C640,96,800,64,960,80C1120,96,1280,160,1360,192L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </Svg>
      </View>
      {showText ? (
        <View style={styles.headerBox}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTopText}>{t('hello')}, Huy</Text>
            <Image source={IMAGES.wave} />
          </View>
          <Text style={styles.headerBottomText}>{t(_generateGreetings())}</Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default memo(WaveHeader);

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  headerBox: {
    position: 'absolute',
    top: scale(70),
    left: scale(20),
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTopText: {
    fontSize: fontScale(19),
    fontFamily: TYPE.SEMIBOLD,
    color: COLORS.BLUE,
    marginRight: scale(5),
  },
  headerBottomText: {
    fontFamily: TYPE.LIGHT,
    marginTop: scale(3),
    fontSize: fontScale(16),
  },
});
