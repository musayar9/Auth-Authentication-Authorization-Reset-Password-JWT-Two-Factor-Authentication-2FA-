import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signIn = createAsyncThunk("user/signIn", async (formData) => {
  try {
    const res = await axios.post(`/api/users/signin`, formData);
    const data =  res.data;

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

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  try {
    const res = await axios.delete(`/api/users/delete/${id}`);
    const data = await res;
    return data;
  } catch (error) {
    return error;
  }
});

export const signOut = createAsyncThunk("user/signOut", async (id) => {
  try {
    const res = await axios.post(`/api/users/signOut/${id}`);
    const data = await res.data;
  

    return data;
  } catch (err) {
    return err;
  }
});

export const updateUser = createAsyncThunk(
  "user/userUpdate",
  async ({ id, formData }) => {
    try {
      const res = await axios.put(`/api/users/updateUser/${id}`, { formData });
      const data = await res.data;

      return data;
    } catch (err) {
      return err;
    }
  }
);

export const githubAuth = createAsyncThunk("user/github", async (formData) => {
  try {
    const res = await axios.post(`/api/users/github`, {formData});
    const data =  res.data;

    return data;
  } catch (error) {

    return error;
  }
});


export const OAuthentication = createAsyncThunk("user/oauth", async (formData) => {
  try {
    const res = await axios.post(`/api/users/oauth`, {formData});
    const data =  res.data;

    return data;
  } catch (error) {

    return error;
  }
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userStatus: "idle",
    error: null,
    deleteInformation: "",
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

    //git hub authenticate;
    builder.addCase(githubAuth.pending, (state) => {
      state.userStatus = "loading";
    });
    builder.addCase(githubAuth.fulfilled, (state, action) => {
      state.userStatus = "success";
      state.user = action.payload;
    });
    builder.addCase(githubAuth.rejected, (state, action) => {
      state.userStatus = "failed";
      state.error = action.error.message;
    });



//google and github authentication;

    builder.addCase(OAuthentication.pending, (state) => {
      state.userStatus = "loading";
    });
    builder.addCase(OAuthentication.fulfilled, (state, action) => {
      state.userStatus = "success";
      state.user = action.payload;
    });
    builder.addCase(OAuthentication.rejected, (state, action) => {
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

    //delete User

    builder.addCase(deleteUser.pending, (state) => {
      state.userStatus = "loading";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.userStatus = "success";
      state.user = null;
      state.deleteInformation = action.payload;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.userStatus = "failed";
      state.error = action.payload;
    });

    //sign out

    builder.addCase(signOut.pending, (state) => {
      state.userStatus = "loading";
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.userStatus = "success";
      state.user = null;
    });

    builder.addCase(signOut.rejected, (state, action) => {
      state.userStatus = "failed";
      state.error = action.payload.message;
    });

    //update user

    builder.addCase(updateUser.pending, (state) => {
      state.userStatus = "loading";
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.userStatus = "success";
      state.user = action.payload;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.userStatus = "failed";
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
