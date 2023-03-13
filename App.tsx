import Navigator from '@/Navigator';
import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import './App/Utils/Translate';
import ModalManagementWater, {
  modalManagementWaterRef,
} from '@/Components/ModalManagementWater';
type Props = {};

const App = (props: Props) => {
  useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 500});
  }, []);

  return (
    <>
      <Navigator />
      <ModalManagementWater ref={modalManagementWaterRef} />
    </>
  );
};

export default App;
