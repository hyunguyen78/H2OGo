import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {fontScale, scale} from 'react-native-utils-scale';
import {COLORS} from '@/Themes/Colors';
import {TYPE} from '@/Themes/Fonts';
import {useTranslation} from 'react-i18next';
import {modalManagementWater} from '@/Components/ModalManagementWater';
import {useAppDispatch} from '@/Hooks';
import moment from 'moment';
import {dataMenu} from '@/Constants/HomeConstants';
import {rootStoreActions} from '@/Redux';

type Props = {
  type: string;
};

const ChooseML: React.FC<Props> = ({type}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const data = [100, 200, 300];
  const _renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.5}
        onPress={() => {
          const val = {
            type: type,
            amount: item,
            createdTime: moment().valueOf(),
            color: dataMenu.find(item => item.value === type)?.color,
          };
          dispatch(rootStoreActions.handleAddWater(val));
        }}>
        <Text style={styles.itemText}>{item}ML</Text>
      </TouchableOpacity>
    );
  };

  const _renderFooter = () => {
    return (
      <TouchableOpacity
        onPress={() => modalManagementWater.show([])}
        style={[styles.item, {marginHorizontal: scale(20)}]}
        activeOpacity={0.5}>
        <Text style={styles.itemText}>{t('home:add')}</Text>
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
      ListFooterComponent={_renderFooter}
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
