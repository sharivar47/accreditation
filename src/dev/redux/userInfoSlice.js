import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  token: "",
  expireTime: ""
};
export const userInfoSlice =  createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setExpireTime: (state, action) => {
      state.expireTime = action.payload;
    },
  },
});
export const { setUserInfo, setToken, setExpireTime } = userInfoSlice.actions;
export const selectUserInfo = (state) => state.userInfo.userInfo;
export const selectToken = (state) => state.userInfo.token;
export const selectExpireTime = (state) => state.userInfo.expireTime;
