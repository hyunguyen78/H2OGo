import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface infoState {
  name: string;
  gender: string;
  weight: number;
  wakeUpTime: number;
  bedTime: number;
}
const initialState: infoState = {
  name: '',
  gender: '',
  weight: 0,
  wakeUpTime: 0,
  bedTime: 0,
};
const inforRedux = createSlice({
  name: 'InforRedux',
  initialState,
  reducers: {
    addInforRequest: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        name: action.payload.name,
        gender: action.payload.gender,
        weight: action.payload.weight,
        bedTime: action.payload.bedTime,
        wakeUpTime: action.payload.wakeUpTime,
      };
    },
  },
});

export const inforActions = inforRedux.actions;
export const infoReducer = inforRedux.reducer;
