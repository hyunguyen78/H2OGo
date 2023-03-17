import notifee, {
  AndroidImportance,
  EventType,
  IntervalTrigger,
  RepeatFrequency,
  TimeUnit,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
export async function onDisplayNotification() {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'hihihaha',
    sound: 'water',
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'H20 Go Thông báo',
    body: 'Đến giờ uống nước rồi Huy ơi !!!',
    android: {
      channelId,
      color: '#4caf50',
      sound: 'water',
      actions: [
        {
          title: '<b>100ML</b> &#128111;',
          pressAction: {id: '100'},
        },
        {
          title: '<p style="color: #f44336;"><b>200ML</b> &#128557;</p>',
          pressAction: {id: '200'},
        },
      ],
      progress: {
        max: 10,
        current: 5,
        // indeterminate: true,
      },
      importance: AndroidImportance.HIGH,
    },
    ios: {
      foregroundPresentationOptions: {
        badge: true,
        sound: true,
        banner: true,
        list: true,
      },
    },
  });
}

export async function onCreateTriggerNotification() {
  const trigger: IntervalTrigger = {
    type: TriggerType.INTERVAL,
    interval: 15,
    timeUnit: TimeUnit.MINUTES,
  };

  await notifee.createTriggerNotification(
    {
      id: '123',
      title: 'Meeting with Jane',
      body: 'Today at 11:20am',
      android: {
        channelId: 'your-channel-id',
      },
    },
    trigger,
  );
}

export const handleActionNoti = () => {
  notifee.onForegroundEvent(({type, detail}) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction?.id) {
      console.log(
        'User pressed an action with the id: ',
        detail.pressAction.id,
      );
    }
  });
};
