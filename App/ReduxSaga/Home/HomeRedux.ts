import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface homeState {
  menuWater: string;
  dailyGoal: number;
  waterDays: any[];
}
const initialState: homeState = {
  menuWater: 'water',
  dailyGoal: 25000,
  waterDays: [],
};

const homeRedux = createSlice({
  name: 'HomeRedux',
  initialState,
  reducers: {
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

export const homeActions = homeRedux.actions;
export const homeReducer = homeRedux.reducer;
