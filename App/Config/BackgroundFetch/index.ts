import BackgroundFetch from 'react-native-background-fetch';
import { onDisplayNotification } from '../Notification';
import notifee, {EventType} from '@notifee/react-native';


export const backgroundFetch = () => {
    BackgroundFetch.configure(
        {
          minimumFetchInterval: 15, // fetch interval in minutes
        },
        async taskId => {
          onDisplayNotification();
          console.log('Received background-fetch event: ', taskId);
          
          // Call finish upon completion of the background task
          BackgroundFetch.finish(taskId);
        },
        error => {
          console.error('RNBackgroundFetch failed to start.');
        },
      );
}