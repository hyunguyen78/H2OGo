import reduxSaga from '@/ReduxSaga';
import {infoReducer} from '@/ReduxSaga/InfoReduxSaga/InforRedux';
import {
  MiddlewareArray,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {homeReducer} from '@/ReduxSaga/Home/HomeRedux';

const rootReducer = combineReducers({
  infor: infoReducer,
  home: homeReducer,
});

const rootPersistConfig = {
  key: 'infor',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: persistedReducer,
  middleware: new MiddlewareArray().concat(sagaMiddleware, logger),
});

export const persistor = persistStore(store);
sagaMiddleware.run(reduxSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
