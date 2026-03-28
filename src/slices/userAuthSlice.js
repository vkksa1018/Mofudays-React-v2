import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserProfile } from "../api/userApi";

const API_BASE = import.meta.env.VITE_API_BASE;
const TOKEN_KEY = "token";
const USER_ID_KEY = "userId";
const USER_NAME_KEY = "userName";
const USER_ROLE_KEY = "userRole";

const readStorage = (key) =>
  localStorage.getItem(key) || sessionStorage.getItem(key) || null;

const clearAuthStorage = () => {
  [TOKEN_KEY, USER_ID_KEY, USER_NAME_KEY, USER_ROLE_KEY].forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};

const initialState = {
  token: readStorage(TOKEN_KEY),
  user: null,
  status: "idle",
  error: null,
  isInitialized: false,
};

/**
 * 驗證 Token 並初始化使用者狀態
 */
export const initUserAuth = createAsyncThunk(
  "userAuth/init",
  async (_, { rejectWithValue }) => {
    const currentToken = readStorage(TOKEN_KEY);
    if (!currentToken) return rejectWithValue("no_token");

    try {
      const userData = await getUserProfile();
      if (!userData) {
        clearAuthStorage();
        return rejectWithValue("invalid_profile");
      }
      return { token: currentToken, user: userData };
    } catch (err) {
      clearAuthStorage();
      return rejectWithValue(err?.response?.data || "驗證失敗");
    }
  },
);

/**
 * 會員登入處理
 */
export const userLogin = createAsyncThunk(
  "userAuth/login",
  async ({ email, password, rememberMe = false }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/login`, {
        email: email.trim(),
        password: password.trim(),
      });
      const { accessToken, user } = res.data;

      if (user.role === "admin") {
        return rejectWithValue("管理員帳號請由後台登入");
      }

      const isAccountDisabled =
        user?.isActive === false ||
        user?.status === "suspended" ||
        user?.deletedAt;
      if (isAccountDisabled) {
        return rejectWithValue("此帳號已停用，請聯繫客服");
      }

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(TOKEN_KEY, accessToken);
      storage.setItem(USER_ID_KEY, String(user.id));
      storage.setItem(USER_NAME_KEY, user.name || "");
      storage.setItem(USER_ROLE_KEY, user.role || "user");

      return { token: accessToken, user };
    } catch (err) {
      const msg = err.response?.data;
      return rejectWithValue(typeof msg === "string" ? msg : "帳號或密碼錯誤");
    }
  },
);

/**
 * 登出並同步後端狀態
 */
export const userLogout = createAsyncThunk(
  "userAuth/logout",
  async (_, { getState }) => {
    const { token, user } = getState().userAuth;
    const userId = user?.id || readStorage(USER_ID_KEY);

    if (userId && token) {
      try {
        await axios.patch(
          `${API_BASE}/users/${userId}`,
          { isLoggedIn: false, updatedAt: new Date().toISOString() },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch {
        // 靜默處理
      }
    }

    clearAuthStorage();
    return null;
  },
);

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
    updateUserProfile(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initUserAuth.pending, (state) => {
        state.status = "loading";
        state.isInitialized = false;
      })
      .addCase(initUserAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isInitialized = true;
      })
      .addCase(initUserAuth.rejected, (state) => {
        state.status = "idle";
        state.token = null;
        state.user = null;
        state.isInitialized = true;
      })
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "登入失敗";
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.status = "idle";
        state.error = null;
        state.isInitialized = true;
      });
  },
});

export const { clearUserError, updateUserProfile } = userAuthSlice.actions;

export const selectUserAuth = (state) => state.userAuth;
export const selectIsUserAuthed = (state) =>
  Boolean(state.userAuth.token && state.userAuth.user);
export const selectUser = (state) => state.userAuth.user;
export const selectUserToken = (state) => state.userAuth.token;
export const selectUserIsInitialized = (state) => state.userAuth.isInitialized;
export const selectUserStatus = (state) => state.userAuth.status;
export const selectUserError = (state) => state.userAuth.error;

export default userAuthSlice.reducer;
