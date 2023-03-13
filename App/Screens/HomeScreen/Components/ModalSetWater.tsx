import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {COLORS} from '@/Themes/Colors';
import {fontScale, scale} from 'react-native-utils-scale';
import {IMAGES} from '@/Constants/Images';
import {TYPE} from '@/Themes/Fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ButtonLinear from '@/Components/ButtonLinear';
import {useTranslation} from 'react-i18next';
type Props = {
  isVisible: boolean;
  handleBack: () => void;
};

const ModalSetWater: React.FC<Props> = ({isVisible, handleBack}) => {
  const {t} = useTranslation();
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={handleBack}
      onBackButtonPress={handleBack}
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
            <Text style={styles.headerText}>Điều chỉnh lượng nước</Text>
            <TouchableOpacity onPress={handleBack}>
              <Image source={IMAGES.close} />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View style={styles.content}>
            <Text style={styles.contentText}>
              Chúng tôi khuyến nghị một mục tiêu hằng ngày dựa trên giới tính và
              cân nặng của bạn là uống khoảng 2000ml nước mỗi ngày, để đảm bảo
              cơ thể của bạn được cung cấp đủ lượng nước cần thiết.
            </Text>
            <Text style={styles.contentText}>
              Bạn có thể điều chỉnh bằng cách thủ công:
            </Text>
            <View style={styles.input}>
              <TextInput
                value="2000"
                style={styles.inputNumber}
                keyboardType="number-pad"
              />
              <Text style={styles.inputText}>ML</Text>
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
};

export default ModalSetWater;

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
    paddingLeft: scale(20),
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
