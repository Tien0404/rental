import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as user from "../services"; // Đảm bảo import đúng đường dẫn
import { authService } from "../services/auth.service";

const getCustomerfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Tạo async thunks cho các hành động
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ account, password }, { rejectWithValue }) => {
    try {
      const response = await user.login(account, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await user.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyUserCode = createAsyncThunk(
  "auth/verify",
  async ({ email, verificationCode }, { rejectWithValue }) => {
    try {
      const response = await user.verifyCode(email, verificationCode);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resendVerification = createAsyncThunk(
  "auth/resend",
  async (email, { rejectWithValue }) => {
    try {
      const response = await user.resendVerificationCode(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await user.getUserById(id);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await user.updateUser(id, userData);
      return response; // trả về dữ liệu người dùng đã cập nhật
    } catch (error) {
      // Xử lý lỗi
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await user.forgotPassword(email);
      return response; // Trả về phản hồi từ server
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ verificationCode, password }, { rejectWithValue }) => {
    try {
      const response = await user.resetPassword(verificationCode, password);
      return response; // Trả về phản hồi từ server
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Tạo slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getCustomerfromLocalStorage,
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        // Kiểm tra nếu payload có user
        const user = {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
          balance: action.payload.balance,
        };
        state.user = user;
        state.token = action.payload.accessToken;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // Bạn có thể lưu thông tin người dùng nếu cần
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyUserCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUserCode.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(verifyUserCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resendVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendVerification.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        // Handle success case if needed
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        // Handle success case if needed
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when starting update
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Update user information
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message
      });
  },
});

export const { setCredentials, setLoading, setError, logout } =
  authSlice.actions;

export const loginWithGoogle = (code) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await authService.loginWithGoogle(code);
    authService.setAuthToken(response.token);
    dispatch(setCredentials(response));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const user = await authService.getCurrentUser();
    dispatch(setCredentials({ user, token: localStorage.getItem("token") }));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  authService.logout();
  dispatch(logout());
};

export default authSlice.reducer;
