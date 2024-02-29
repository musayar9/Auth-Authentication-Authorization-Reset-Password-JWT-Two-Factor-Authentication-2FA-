import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signIn = createAsyncThunk("user/signIn", async (formData) => {
  try {
    const res = await axios.post(`/api/users/signin`, formData);
    const data = res.data;

    return data;
  } catch (error) {
    return error;
  }
});

export const updateVerify = createAsyncThunk(
  "user/verifyupdates",
  async ({ id, otp }) => {
    try {
      const res = await axios.put(`/api/users/verifyupdate/${id}`, { otp });
      const data = res.data;
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const signOut = createAsyncThunk("user/signout", async () => {
  try {
    const res = await axios(`/api/users/signOut`);
    const data = res.data;
    console.log(data);

    return data;
  } catch (err) {
    return err;
  }
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // sign-in reducers
    builder.addCase(signIn.pending, (state) => {
      state.userStatus = "loading";
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.userStatus = "success";
      state.user = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.userStatus = "failed";
      state.error = action.error.message;
    });

    // update verify-otp
    builder.addCase(updateVerify.pending, (state) => {
      state.userStatus = "loading";
    });
    builder.addCase(updateVerify.fulfilled, (state, action) => {
      state.userStatus = "success";
      state.user = action.payload;
    });
    builder.addCase(updateVerify.rejected, (state, action) => {
      state.userStatus = "failed";
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
