import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useState} from 'react';
import {IMAGES} from '@/Constants/Images';
import {fontScale, scale} from 'react-native-utils-scale';
import {COLORS} from '@/Themes/Colors';
import {TYPE} from '@/Themes/Fonts';
import Modal from 'react-native-modal';
import {dataMenu} from '@/Constants/HomeConstants';
import {useTranslation} from 'react-i18next';
import ButtonLinear from '@/Components/ButtonLinear';
type Props = {
  value: string;
};

const ButtonMenu: React.FC<Props> = ({value}) => {
  const {t} = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selected, setSelected] = useState(value);
  const _handleBack = () => {
    if (value !== selected) {
      setSelected(value);
    }
    setIsOpenModal(false);
  };

  const _renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          selected === item.value && {backgroundColor: COLORS.BLUE_LIGHT},
        ]}
        activeOpacity={0.5}
        onPress={() => setSelected(item.value)}>
        <Image source={item.icon} style={styles.itemIcon} />
        <Text style={styles.itemText}>{t(`home:${item.value}`)}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <TouchableOpacity
      style={styles.menuCategory}
      activeOpacity={0.5}
      onPress={() => setIsOpenModal(true)}>
      <Image source={IMAGES.menuWater} style={styles.menuIcon} />
      <Text style={styles.menuCategoryText}>Nước lọc</Text>
      <Image source={IMAGES.loop} style={styles.iconLoop} />
      <Modal
        isVisible={isOpenModal}
        onBackdropPress={_handleBack}
        onBackButtonPress={_handleBack}
        animationIn={'zoomIn'}
        animationInTiming={500}
        animationOut={'zoomOut'}
        animationOutTiming={500}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <View />
            <Text style={styles.headerText}>Chọn loại nước</Text>
            <TouchableOpacity onPress={_handleBack}>
              <Image source={IMAGES.close} />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <FlatList
            data={dataMenu}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
            numColumns={4}
            ItemSeparatorComponent={() => (
              <View style={{width: scale(10), backgroundColor: 'red'}} />
            )}
          />
          <View style={styles.line} />
          <ButtonLinear
            title={t('common:ok')}
            style={styles.btnOk}
            onPress={() => {}}
            fontSize={scale(15)}
          />
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default memo(ButtonMenu);

const styles = StyleSheet.create({
  menuCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
    alignSelf: 'center',
    borderRadius: scale(12),
    justifyContent: 'space-around',
  },
  menuIcon: {
    height: scale(40),
    width: scale(40),
  },
  menuCategoryText: {
    fontSize: fontScale(14),
    fontFamily: TYPE.MEDIUM,
    color: COLORS.BLUE,
    marginHorizontal: scale(5),
  },
  iconLoop: {
    tintColor: COLORS.GRAY_DARK,
  },
  modalContainer: {
    backgroundColor: COLORS.WHITE,
    padding: scale(10),
    borderRadius: scale(8),
    paddingBottom: scale(55),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: fontScale(16),
    fontFamily: TYPE.MEDIUM,
  },
  line: {
    height: scale(1),
    backgroundColor: COLORS.GRAY,
    marginVertical: scale(12),
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(5),
    marginVertical: scale(10),
    width: scale(80),
    borderRadius: scale(12),
    marginRight: scale(4),
  },
  itemIcon: {
    height: scale(50),
    width: scale(50),
    marginBottom: scale(5),
  },
  itemText: {
    fontSize: fontScale(14),
    fontFamily: TYPE.REGULAR,
    textAlign: 'center',
  },
  btnOk: {
    width: scale(120),
    alignSelf: 'flex-end',
  },
});
