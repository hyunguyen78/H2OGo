import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {fontScale, scale} from 'react-native-utils-scale';
import {COLORS} from '@/Themes/Colors';
import {TYPE} from '@/Themes/Fonts';

type Props = {
  title: string;
  style?: StyleProp<TextStyle>;
  onPress: () => void;
  color?: string[];
};

const ButtonLinear: React.FC<Props> = ({
  title,
  style,
  onPress,
  color = [COLORS.BLUE, '#5cddff'],
}) => {
  return (
    <TouchableOpacity style={{flex: 1}} activeOpacity={0.5} onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.container, style]}
        colors={color}>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonLinear;

const styles = StyleSheet.create({
  container: {
    height: scale(45),
    marginVertical: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(12),
  },
  title: {
    color: COLORS.WHITE,
    fontSize: fontScale(18),
    fontFamily: TYPE.MEDIUM,
  },
});
