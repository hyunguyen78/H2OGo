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

export const modalWeightRef = createRef<any>();
export const modalWeight = {
  show: (data: any) => {
    modalWeightRef.current.show(data);
  },
};
const ModalWeight = React.forwardRef((props, ref) => {
  const {t} = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [value, setValue] = useState<any>(null);

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
            <Text style={styles.headerText}>Cân nặng của bạn</Text>
            <TouchableOpacity onPress={_handleBack}>
              <Image source={IMAGES.close} />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View style={styles.content}>
            <Text style={styles.contentText}>
              Chúng tôi cần biết cân nặng chính xác của bạn để điều chỉnh lượng
              nước uống hợp lý và phù hợp nhất cho cơ thể của bạn
            </Text>
            <Text style={styles.contentText}>Cân nặng của bạn là:</Text>
            <View style={styles.input}>
              <TextInput
                value="60"
                style={styles.inputNumber}
                keyboardType="number-pad"
              />
              <Text style={styles.inputText}>Kg</Text>
            </View>
          </View>
          <View style={styles.line} />
          <ButtonLinear
            title={t('common:ok')}
            style={styles.btnOk}
            onPress={() => {}}
            fontSize={scale(15)}
          />
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
});

export default ModalWeight;

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
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputNumber: {
    backgroundColor: COLORS.BLUE_LIGHT,
    borderRadius: scale(10),
    height: scale(40),
    width: scale(80),
    fontSize: fontScale(16),
    fontFamily: TYPE.REGULAR,
    textAlign: 'center',
  },
  inputText: {
    marginLeft: scale(10),
    fontSize: fontScale(16),
    fontFamily: TYPE.MEDIUM,
  },
  btnOk: {
    width: scale(120),
    alignSelf: 'flex-end',
  },
});
