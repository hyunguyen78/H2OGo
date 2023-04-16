import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import moment from 'moment';

interface rootState {
  infor: any;
  menuWater: string;
  dailyGoal: number;
  waterDays: any[];
  reminderDistance: number;
  glassOfWater: number[];
  language: string;
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
  dailyGoal: 2500,
  waterDays: [],
  reminderDistance: 60,
  glassOfWater: [100, 200, 300],
  language: 'vi',
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
        state.waterDays[waterDayIndex].waterList.unshift(action.payload);
      } else {
        state.waterDays.unshift({
          date: dateString,
          waterList: [action.payload],
          goal: state.dailyGoal,
        });
      }
    },
    handleReminderDistance: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        reminderDistance: action.payload,
      };
    },
    handleGender: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        infor: {
          ...state.infor,
          gender: action.payload,
        },
      };
    },
    handleWeight: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        infor: {
          ...state.infor,
          weight: action.payload,
        },
      };
    },
    handleGlassOfWater: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        glassOfWater: action.payload,
      };
    },
    handleDailyGoal: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        dailyGoal: action.payload,
      };
    },
    handleLanguage: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        language: action.payload,
      };
    },
    handleWakeUpTime: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        infor: {
          ...state.infor,
          wakeUpTime: action.payload,
        },
      };
    },
    handleBedTime: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        infor: {
          ...state.infor,
          bedTime: action.payload,
        },
      };
    },
  },
});

export const rootStoreActions = rootRedux.actions;
export const rootStoreReducer = rootRedux.reducer;
