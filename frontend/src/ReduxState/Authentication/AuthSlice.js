import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// 🔴 Error-handling map (Status : Message)
const ERROR_STATUS_MESSAGES = {
  203: "You are not authorized to access this resource.",
  204: "User not found with provided email or phone.",
  208: "User already exists with this email or phone.",
  406: "All fields are required.",
  409: "Conflict occurred, please try again.",
  500: "Server error, please try again later.",
};

// 📌 Signup Thunk
export const signup = createAsyncThunk(
  "Authentication/Signup",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      const { status, data } = res;

      // ❗️ Check known failure status codes
      if (ERROR_STATUS_MESSAGES[status]) {
        throw new Error( ERROR_STATUS_MESSAGES[status]);
      }

      toast.success(data.message || "Signup successful!");
      return {
        token: data.token,
        username: data.username,
        userId: data.userId,
      };
    } catch (error) {
      const status = error?.response?.status;
      const message =
        error?.response?.data?.message ||
        ERROR_STATUS_MESSAGES[status] ||
        error.message ||
        "Signup failed";

      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 📌 Login Thunk
export const login = createAsyncThunk(
  "Authentication/Login",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", payload);
      const { status, data } = res;

      if (ERROR_STATUS_MESSAGES[status]) {
        throw new Error(data.message || ERROR_STATUS_MESSAGES[status]);
      }

      toast.success(data.message || "Login successful!");
      return {
        token: data.token,
        username: data.username,
        userId: data.userId,
      };
    } catch (error) {
      const status = error?.response?.status;
      const message =
        error?.response?.data?.message ||
        ERROR_STATUS_MESSAGES[status] ||
        error.message ||
        "Login failed";

      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 📌 Initial State
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

// 📌 Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.info("You have been logged out.");
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
