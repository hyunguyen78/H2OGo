import { all, fork,  } from 'redux-saga/effects'
import { watchInfor } from './InfoReduxSaga/InforSaga'

export default function* reduxSaga() {
    yield all([
        fork(watchInfor)
    ])
}