import moment from 'moment';

export const SCREENS_NAME = {
  MAIN_STACK: 'MainStack',
  HOME_STACK: 'HomeStack',
  STATISTICS_STACK: 'StatisticsStack',
  HISTORYSTACK: 'HistoryStack',
  SETTINGS_STACK: 'SettingsStack',
  ADD_INFORMATION: 'AddInformation',
};
export const FormatDate = (time: any, format: string) => {
  const val = moment(time).format(format);
  return val;
};
