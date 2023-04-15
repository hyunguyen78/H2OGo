import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef, useImperativeHandle, useState} from 'react';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IMAGES} from '@/Constants/Images';
import {fontScale, scale} from 'react-native-utils-scale';
import {useTranslation} from 'react-i18next';
import {COLORS} from '@/Themes/Colors';
import {TYPE} from '@/Themes/Fonts';
import ButtonLinear from '@/Components/ButtonLinear';
import {Dropdown} from 'react-native-element-dropdown';
import {useAppDispatch} from '@/Hooks';
import {rootStoreActions} from '@/Redux';

export const modalSexRef = createRef<any>();
export const modalSex = {
  show: (data: any) => {
    modalSexRef.current.show(data);
  },
};
const ModalSex = React.forwardRef((props, ref) => {
  const {t} = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [value, setValue] = useState<any>(null);
  const dispatch = useAppDispatch();
  useImperativeHandle(ref, () => {
    return {
      show: _show,
    };
  });
  const _show = (data: any) => {
    setIsVisible(true);
    setValue(data);
  };
  const _handleBack = () => {
    setIsVisible(false);
  };
  const _handleOnpress = () => {
    dispatch(rootStoreActions.handleGender(value));
    setIsVisible(false);
  };
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={_handleBack}
      onBackButtonPress={_handleBack}
      animationIn={'zoomIn'}
      animationInTiming={500}
      animationOut={'zoomOut'}
      animationOutTiming={500}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          flexGrow: 1,
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <View />
            <Text style={styles.headerText}>Giới tính của bạn</Text>
            <TouchableOpacity onPress={_handleBack}>
              <Image source={IMAGES.close} />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View style={styles.content}>
            <Text style={styles.contentText}>
              Chúng tôi cần thông tin về giới tính của bạn để có thể điều chỉnh
              lượng nước uống phù hợp cho cơ thể của bạn
            </Text>
            <Text style={styles.contentText}>Giới tính của bạn đang là:</Text>
            <Dropdown
              data={[
                {label: 'Male', value: 'male'},
                {label: 'Female', value: 'female'},
              ]}
              onChange={val => setValue(val.value)}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.itemTextStyle}
              style={styles.dropdown}
              value={value}
              selectedTextStyle={styles.itemSelected}
            />
          </View>
          <View style={styles.line} />
          <ButtonLinear
            title={t('common:ok')}
            style={styles.btnOk}
            onPress={_handleOnpress}
            fontSize={scale(15)}
          />
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
});

export default ModalSex;

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
  content: {
    marginVertical: scale(10),
  },
  contentText: {
    fontSize: fontScale(15),
    fontFamily: TYPE.LIGHT,
    marginBottom: scale(10),
  },
  dropdown: {
    width: '50%',
    height: scale(50),
    borderColor: COLORS.GRAY_LIGHT,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  itemTextStyle: {
    fontSize: fontScale(14),
    fontFamily: TYPE.MEDIUM,
  },
  itemSelected: {
    fontSize: fontScale(14),
    fontFamily: TYPE.MEDIUM,
  },
  btnOk: {
    width: scale(120),
    alignSelf: 'flex-end',
  },
});
