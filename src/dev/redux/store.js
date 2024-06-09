import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from "redux";
import { setExpireTime, setToken, userInfoSlice } from "./userInfoSlice";
import {jwtDecode} from "jwt-decode";
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['themeSetting', 'userInfo']
}
const rootReducer = combineReducers({
  [userInfoSlice.name]: userInfoSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
 reducer: persistedReducer,
});
export const persistor = persistStore(store)
export class Repo {
  static state(){
    return store.getState();
  }
  static token() {
    return this.state().userInfo.token;
  }
  static logout() {
    store.dispatch(setToken(""));
  }
  static isLogin() {
    const token = this.token();
    const decoded = jwtDecode(token);
    const expireTime = new Date(decoded.exp * 1000);
    const currentTime = new Date();
    return token !== "" && expireTime.getTime() > currentTime.getTime()
  }
}