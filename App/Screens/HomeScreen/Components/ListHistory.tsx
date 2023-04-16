import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {fontScale, scale} from 'react-native-utils-scale';
import {TYPE} from '@/Themes/Fonts';
import {COLORS} from '@/Themes/Colors';
import {IMAGES} from '@/Constants/Images';
import {dataMenu} from '@/Constants/HomeConstants';
import moment from 'moment';

type Props = {
  data: any[];
};

const ListHistory: React.FC<Props> = ({data}) => {
  const _renderItem = ({item, index}: any) => {
    const iconMenu = dataMenu.find(t => t.value === item.type) as any;
    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Image source={iconMenu.icon} style={styles.itemIcon} />
          <Text style={styles.itemTextTime}>
            {moment(item.createdTime).format('HH:mm')}
          </Text>
        </View>
        <Text style={styles.itemTextNumber}>{item?.amount}ML</Text>
      </View>
    );
  };
  const _listEmpty = useCallback(() => {
    return (
      <View style={styles.empty}>
        <Image source={IMAGES.empty} style={styles.emptyIcon} />
        <Text style={styles.emptyText}>
          Hôm nay bạn chưa uống nước, hãy uống nhiều lên nhé !!!
        </Text>
      </View>
    );
  }, []);

  const _itemSeparator = useCallback(() => {
    return <Image source={IMAGES.dot} style={styles.iconDot} />;
  }, []);
  return (
    <View style={styles.history}>
      <Text style={styles.historyTitle}>Lịch sử hôm nay</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={_renderItem}
        ListEmptyComponent={_listEmpty}
        style={styles.list}
        scrollEnabled={false}
        ListHeaderComponent={() => <View style={{height: scale(10)}} />}
        ItemSeparatorComponent={_itemSeparator}
      />
    </View>
  );
};

export default ListHistory;

const styles = StyleSheet.create({
  history: {
    backgroundColor: COLORS.BLUE_LIGHT,
    marginTop: scale(16),
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    padding: scale(15),
    flex: 1,
    paddingBottom: scale(100),
  },
  historyTitle: {
    fontSize: fontScale(16),
    fontFamily: TYPE.MEDIUM,
  },
  list: {
    flex: 1,
  },
  empty: {
    marginTop: scale(20),
    alignItems: 'center',
  },
  emptyIcon: {
    height: scale(70),
    width: scale(70),
  },
  emptyText: {
    fontSize: fontScale(14),
    fontFamily: TYPE.THIN,
    textAlign: 'center',
  },
  itemIcon: {
    height: scale(30),
    width: scale(30),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTextTime: {
    fontSize: fontScale(16),
    fontFamily: TYPE.LIGHT,
    marginLeft: scale(15),
  },
  itemTextNumber: {
    fontSize: fontScale(16),
    fontFamily: TYPE.REGULAR,
    marginLeft: scale(15),
    color: COLORS.BLUE,
  },
  itemSepa: {
    flexDirection: 'row',
  },
  iconDot: {
    marginLeft: scale(12),
    marginVertical: scale(2),
    tintColor: COLORS.GRAY,
  },
});
