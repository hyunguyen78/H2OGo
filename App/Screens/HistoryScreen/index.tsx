import {
  FlatList,
  Image,
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
import {useAppSelector} from '@/Hooks';
import {FormatDate} from '@/Constants/CommonConstants';
import {useTranslation} from 'react-i18next';
import {dataMenu} from '@/Constants/HomeConstants';
import {IMAGES} from '@/Constants/Images';

type Props = {};

const HistoryScreen = (props: Props) => {
  const {waterDays} = useAppSelector(state => state.rootStore);
  const {t} = useTranslation();

  const _renderItemWaterList = ({item, index}: any) => {
    const iconMenu = dataMenu.find(t => t.value === item.type) as any;
    return (
      <View style={styles.item}>
        <View style={styles.itemRow}>
          <Image source={iconMenu.icon} style={styles.itemIcon} />
          <View>
            <Text style={styles.itemType}>{t(`home:${item.type}`)}</Text>
            <Text style={styles.itemAmount}>{item.amount}ML</Text>
          </View>
        </View>
        <Text style={styles.itemHour}>
          {FormatDate(item.createdTime, 'HH:mm')}
        </Text>
      </View>
    );
  };
  const _renderItem = ({item, index}: any) => {
    return (
      <View>
        <Text style={styles.itemDate}>{item.date}</Text>
        <FlatList
          data={item?.waterList}
          renderItem={_renderItemWaterList}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => <View style={{height: scale(15)}} />}
          ListFooterComponent={() => <View style={{height: scale(15)}} />}
          ItemSeparatorComponent={() => <View style={styles.line} />}
        />
      </View>
    );
  };
  const _renderEmpty = () => {
    return (
      <View>
        <View style={styles.empty}>
          <Image source={IMAGES.empty} style={styles.emptyIcon} />
          <Text style={styles.emptyText}>
            Bạn chưa có lịch sử uống nước, hãy uống nước nhiều lên nhé !!!
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.formContainer}>
        <Text style={styles.headerTitle}>Lịch Sử</Text>
        <FlatList
          data={waterDays}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
          ListHeaderComponent={() => <View style={{height: scale(20)}} />}
          ListFooterComponent={() => <View style={{height: scale(20)}} />}
          ItemSeparatorComponent={() => <View style={{height: scale(20)}} />}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          onEndReachedThreshold={5}
          ListEmptyComponent={_renderEmpty}
        />
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
    paddingBottom: scale(40),
  },
  headerTitle: {
    fontSize: fontScale(22),
    fontFamily: TYPE.SEMIBOLD_ITALIC,
  },
  itemIcon: {
    height: scale(35),
    width: scale(35),
    marginRight: scale(10),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDate: {
    fontSize: fontScale(18),
    fontFamily: TYPE.SEMIBOLD,
  },
  line: {
    height: scale(1),
    backgroundColor: COLORS.BLUE_LIGHT,
    marginVertical: scale(10),
  },
  itemType: {
    fontFamily: TYPE.REGULAR,
    fontSize: fontScale(16),
  },
  itemAmount: {
    fontFamily: TYPE.REGULAR,
    fontSize: fontScale(14),
  },
  itemHour: {
    fontFamily: TYPE.LIGHT_ITALIC,
    fontSize: fontScale(14),
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
});
