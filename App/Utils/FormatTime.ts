import moment from 'moment';

export const _generateGreetings = () => {
  var currentHour: any = moment().format('HH');
  if (currentHour >= 3 && currentHour < 12) {
    return 'goodMoring';
  } else if (currentHour >= 12 && currentHour < 15) {
    return 'goodAfternoon';
  } else if (currentHour >= 15 && currentHour < 20) {
    return 'goodEvening';
  } else if (currentHour >= 20 || currentHour < 3) {
    return 'goodNight';
  } else {
    return 'Hello';
  }
};

export const checkDaysInMonth = (val: any) => {
  let monthData = []
  for (let index = 1; index <= moment(val).daysInMonth(); index++) {
    monthData.push(index.toString())
  }
  return monthData
}
export const dataLabelMonth = () => {
  let data: string[] = []
  for (let index = 1; index < 13; index++) {
    data.push(index.toString())
  }
  return data
}