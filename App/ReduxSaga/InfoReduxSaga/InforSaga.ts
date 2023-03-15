import { all, takeLatest } from "redux-saga/effects";
import { inforActions } from "./InforRedux";
import { PayloadAction } from "@reduxjs/toolkit";

export function* watchInfor(){
    yield all([
        takeLatest(inforActions.addInforRequest, handleAddInforRequest)
    ])
}

 function* handleAddInforRequest(action: PayloadAction<any>): any{
    try {
        
    } catch (error) {
        
    }
 }