import notifee, {
  AndroidImportance,
  EventType,
  IntervalTrigger,
  RepeatFrequency,
  TimeUnit,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

export const notificationApp = async () => {
  // Định nghĩa kênh thông báo để hiển thị thông báo của bạn.
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Thông báo mặc định',
    vibration: true, // Có rung khi có thông báo
  });

  // Đặt thông báo vào lúc 8 giờ sáng
  const morningTrigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: new Date(new Date().setHours(8, 0, 0)).getTime(),
  };
  const myNotification: any = {
    title: 'Hãy uống nước nào!',
    body: 'Đã đến lúc uống một cốc nước!',
    android: {
      channelId,
      sound: true, // Có tiếng bíp khi có thông báo
    },
    ios: {
      sound: true, // Có tiếng bíp khi có thông báo
    },
    data: {
      screen: 'waterReminder',
    },
    trigger: morningTrigger,
  };
  await notifee.displayNotification(myNotification);

  // Đặt thông báo lặp lại sau mỗi giờ đến 22 giờ tối
  const repeatTrigger: any = {
    type: TriggerType.INTERVAL,
    interval: 60 * 60 * 1000, // Một giờ
    startTime: new Date(new Date().setHours(8, 0, 0)),
    endTime: new Date(new Date().setHours(21, 0, 0)),
  };
  const notificationTrigger: any = {
    title: 'Đừng quên uống nước nhé',
    body: 'Hãy chú ý đến thói quen uống nước của bạn',
    android: {
      channelId,
      sound: true,
    },
    ios: {
      sound: true,
    },
    data: {
      screen: 'water-reminder',
    },
  };
  await notifee.createTriggerNotification(notificationTrigger, repeatTrigger);
};
