import Navigator from '@/Navigator';
import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import './App/Utils/Translate';
import ModalManagementWater, {
  modalManagementWaterRef,
} from '@/Components/ModalManagementWater';
import {Provider} from 'react-redux';
import {store} from '@/Config/Store';
type Props = {};

const App = (props: Props) => {
  useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 500});
  }, []);

  return (
    <Provider store={store}>
      <Navigator />
      <ModalManagementWater ref={modalManagementWaterRef} />
    </Provider>
  );
};

export default App;
