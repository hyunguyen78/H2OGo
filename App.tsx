import Navigator from '@/Navigator';
import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import './App/Utils/Translate';
import ModalManagementWater, {
  modalManagementWaterRef,
} from '@/Components/ModalManagementWater';
import {Provider} from 'react-redux';
import {store} from '@/Config/Store';
import {
  onCreateTriggerNotification,
  onDisplayNotification,
} from '@/Config/Notification';
import {backgroundFetch} from '@/Config/BackgroundFetch';
import notifee, {EventType} from '@notifee/react-native';
type Props = {};

const App = (props: Props) => {
  useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 500});
    // onCreateTriggerNotification();
    notifee.onBackgroundEvent(async ({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          onDisplayNotification();
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
    backgroundFetch();
    notifee.registerForegroundService(notification => {
      return new Promise(() => {
        notifee.onForegroundEvent(({type, detail}) => {
          if (
            type === EventType.ACTION_PRESS &&
            detail.pressAction?.id === 'stop'
          ) {
            notifee.stopForegroundService();
          }
        });
      });
    });
  }, []);

  return (
    <Provider store={store}>
      <Navigator />
      <ModalManagementWater ref={modalManagementWaterRef} />
    </Provider>
  );
};

export default App;
