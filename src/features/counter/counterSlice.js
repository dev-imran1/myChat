import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginuser : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  // loginuser: null,
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    userdata: (state, action) => {
      state.loginuser = action.payload;
    },
   
  },
})
export const { userdata} = counterSlice.actions

export default counterSlice.reducer