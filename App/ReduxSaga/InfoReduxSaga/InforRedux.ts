import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  name: ""
};
const inforRedux = createSlice({
  name: 'InforRedux',
  initialState,
  reducers: {
    addInforRequest: (state, action: PayloadAction<any>) => {
        return {
            ...state,

        }
    },
  },
});

export const inforActions = inforRedux.actions
export const infoReducer = inforRedux.reducer

