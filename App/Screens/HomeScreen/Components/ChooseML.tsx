import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useRef} from 'react';
import {fontScale, scale} from 'react-native-utils-scale';
import {COLORS} from '@/Themes/Colors';
import {TYPE} from '@/Themes/Fonts';
import {useTranslation} from 'react-i18next';

type Props = {};

const ChooseML = (props: Props) => {
  const {t} = useTranslation();
  const data = [100, 200, 300, null];
  const _renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity style={styles.item} activeOpacity={0.5}>
        <Text style={styles.itemText}>{item ? item : t('home:add')}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={_renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      ItemSeparatorComponent={() => <View style={{width: scale(20)}} />}
      ListHeaderComponent={() => <View style={{width: scale(10)}} />}
      ListFooterComponent={() => <View style={{width: scale(10)}} />}
    />
  );
};

export default memo(ChooseML);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
  },
  item: {
    width: scale(110),
    height: scale(55),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLUE_LIGHT,
    borderRadius: scale(10),
  },
  itemText: {
    fontSize: fontScale(15),
    fontFamily: TYPE.REGULAR,
    color: COLORS.BLUE,
  },
});
