import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userStatus: "idle",
    error: null,
  },
  reducers: {},

});


export default userSlice.reducer