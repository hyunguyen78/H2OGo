import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface rootState {
  infor: any;
  menuWater: string;
  dailyGoal: number;
  waterDays: any[];
}
const initialState: rootState = {
  infor: {
    name: '',
    gender: '',
    weight: 0,
    wakeUpTime: 0,
    bedTime: 0,
  },
  menuWater: 'water',
  dailyGoal: 25000,
  waterDays: [],
};

const rootRedux = createSlice({
  name: 'rootRedux',
  initialState,
  reducers: {
    addInforRequest: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        infor: {
          name: action.payload.name,
          gender: action.payload.gender,
          weight: action.payload.weight,
          bedTime: action.payload.bedTime,
          wakeUpTime: action.payload.wakeUpTime,
        },
      };
    },
    changeMenuWater: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        menuWater: action.payload,
      };
    },
    handleAddWater: (state, action: PayloadAction<any>) => {
      const today = new Date();
      const dateString = `${today.getDate()}/${
        today.getMonth() + 1
      }/${today.getFullYear()}`;
      const waterDayIndex = state.waterDays.findIndex(
        item => item.date === dateString,
      );
      if (waterDayIndex >= 0) {
        state.waterDays[waterDayIndex].waterList.push(action.payload);
      } else {
        state.waterDays.push({
          date: dateString,
          waterList: [action.payload],
          goal: state.dailyGoal,
        });
      }
    },
  },
});

export const rootStoreActions = rootRedux.actions;
export const rootStoreReducer = rootRedux.reducer;
