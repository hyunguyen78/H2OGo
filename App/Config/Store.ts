import {
  MiddlewareArray,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootStoreReducer} from '@/Redux';

const rootReducer = combineReducers({
  rootStore: rootStoreReducer,
});

const rootPersistConfig = {
  key: 'rootStore',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: persistedReducer,
  middleware: new MiddlewareArray().concat(sagaMiddleware, logger),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
