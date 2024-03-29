import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  createRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import Modal from 'react-native-modal';
import {COLORS} from '@/Themes/Colors';
import {fontScale, scale} from 'react-native-utils-scale';
import {TYPE} from '@/Themes/Fonts';
import {IMAGES} from '@/Constants/Images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppDispatch, useAppSelector} from '@/Hooks';
import {rootStoreActions} from '@/Redux';
type Props = {};

export const modalManagementWaterRef = createRef<any>();
export const modalManagementWater = {
  show: () => {
    modalManagementWaterRef.current.show();
  },
};
const ModalManagementWater = React.forwardRef((props, ref) => {
  const dispatch = useAppDispatch();
  const {glassOfWater} = useAppSelector(state => state.rootStore);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [valueWater, setValueWater] = useState('');
  useImperativeHandle(ref, () => {
    return {show: _show};
  });

  const _show = () => {
    setIsShowModal(true);
  };
  const _handleBack = () => {
    setIsShowModal(false);
  };

  const _handleAdd = () => {
    const check = glassOfWater.includes(Number(valueWater));
    if (!check) {
      const addData = [...glassOfWater, Number(valueWater)];
      dispatch(rootStoreActions.handleGlassOfWater(addData));
      setValueWater('');
    }
  };
  const _renderItem = ({item, index}: any) => {
    const _handleDelete = () => {
      const deleteData = glassOfWater.filter(t => t !== item);
      dispatch(rootStoreActions.handleGlassOfWater(deleteData));
    };
    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Image source={IMAGES.glassOfWater} style={styles.itemIcon} />
          <Text style={styles.itemLeftText}>{item} ML</Text>
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={_handleDelete}>
          <Image source={IMAGES.trash} style={styles.itemIcon} />
        </TouchableOpacity>
      </View>
    );
  };
  const _renderFooter = () => {
    const check = glassOfWater.includes(Number(valueWater));
    return (
      <View style={styles.footer}>
        <TextInput
          placeholder="Nhập lượng nước"
          style={styles.footerInput}
          keyboardType="number-pad"
          value={valueWater}
          onChangeText={txt => setValueWater(txt)}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={_handleAdd}
          disabled={valueWater === '' || check ? true : false}>
          <Image source={IMAGES.plus} style={styles.itemIcon} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Modal
      isVisible={isShowModal}
      onBackdropPress={_handleBack}
      onBackButtonPress={_handleBack}
      animationIn={'zoomIn'}
      animationInTiming={500}
      animationOut={'zoomOut'}
      animationOutTiming={500}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <View />
          <Text style={styles.headerText}>Quản lý lượng nước uống</Text>
          <TouchableOpacity onPress={_handleBack}>
            <Image source={IMAGES.close} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
          extraHeight={scale(50)}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <FlatList
            data={glassOfWater}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
            ItemSeparatorComponent={() => <View style={{height: scale(20)}} />}
            style={{maxHeight: scale(350)}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            scrollEnabled={false}
          />
          {_renderFooter()}
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
});

export default ModalManagementWater;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.WHITE,
    padding: scale(10),
    borderRadius: scale(8),
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(16),
  },
  itemIcon: {
    height: scale(30),
    width: scale(30),
    marginLeft: scale(10),
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
    marginTop: scale(10),
  },
  footerInput: {
    backgroundColor: COLORS.BLUE_LIGHT,
    width: scale(160),
    height: scale(40),
    borderRadius: scale(10),
    fontFamily: TYPE.LIGHT,
    color: COLORS.BLACK,
    paddingLeft: scale(10),
    marginLeft: scale(10),
  },
  flexContainer: {
    flexGrow: 1,
  },
  itemLeftText: {
    marginLeft: scale(10),
    fontFamily: TYPE.REGULAR,
    color: COLORS.BLACK,
  },
});
