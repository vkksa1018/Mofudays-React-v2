import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE;

const getStorageItem = (key) => {
  return localStorage.getItem(key) || sessionStorage.getItem(key) || null;
};

const getAuthHeader = () => {
  const token = getStorageItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * 處理受保護路由的錯誤與 Token 失效
 */
const handleProtectedError = (error, fallbackValue = null) => {
  const errorMsg = error.response?.data;
  const status = error.response?.status;

  const isDatabaseMismatch =
    typeof errorMsg === "string" &&
    errorMsg.includes("reference to the owner id");

  if (isDatabaseMismatch) {
    toast.warn("系統無法正確讀取個人資料，請嘗試重新操作");
    return fallbackValue;
  }

  if (status === 401) {
    toast.error("登入已過期，請重新登入");
  }

  throw error;
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    toast.success("註冊成功！");
    return response.data;
  } catch (error) {
    const message = error.response?.data || "註冊失敗，請稍後再試";
    toast.error(message);
    throw message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    toast.success("登入成功");
    return response.data;
  } catch (error) {
    const message = error.response?.data || "登入失敗，請檢查帳號密碼";
    toast.error(message);
    throw message;
  }
};

export const checkLoginStatus = () => {
  return !!getStorageItem("token");
};

export const getUserProfile = async () => {
  const userId = getStorageItem("userId");
  if (!userId) return null;

  try {
    const response = await axios.get(`${API_BASE_URL}/600/users/${userId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    return handleProtectedError(error, null);
  }
};

export const getUserOrders = async () => {
  const userId = getStorageItem("userId");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/600/orders?userId=${userId}`,
      { headers: getAuthHeader() },
    );
    return response.data;
  } catch (error) {
    return handleProtectedError(error, []);
  }
};

export const getUserCart = async () => {
  const userId = getStorageItem("userId");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/600/carts?userId=${userId}`,
      { headers: getAuthHeader() },
    );
    return response.data;
  } catch (error) {
    return handleProtectedError(error, []);
  }
};

export const updateUserProfile = async (profileData) => {
  const userId = getStorageItem("userId");
  if (!userId) throw new Error("未登入，找不到 userId");

  try {
    const response = await axios.patch(
      `${API_BASE_URL}/600/users/${userId}`,
      profileData,
      {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      },
    );
    toast.success("個人資料已更新");
    return response.data;
  } catch (error) {
    return handleProtectedError(error, null);
  }
};
