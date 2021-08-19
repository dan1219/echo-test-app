import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn:false
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    logIn:(state) => {
      state.loggedIn = true
    },
    logOut:(state) => {
      state.loggedIn = false
    }
  },
});




export const { logIn,logOut } = appSlice.actions;
export default appSlice.reducer;
