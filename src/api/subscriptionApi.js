import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleProtectedError = (error, fallbackValue = null) => {
  const errorMsg = error.response?.data;
  const status = error.response?.status;

  // 1. 處理資料庫關聯錯誤 (userId 找不到)
  const isDatabaseMismatch =
    typeof errorMsg === "string" &&
    errorMsg.includes("reference to the owner id");
  if (isDatabaseMismatch) {
    toast.warn("無法取得相關資料，請重新嘗試或洽詢客服");
    return fallbackValue;
  }

  // 2. 處理身份驗證失效
  if (status === 401) {
    toast.error("登入逾時，請重新登入");
  } else if (status === 403) {
    toast.error("權限不足，無法執行此動作");
  }

  throw error;
};

export const getUserOrders = async () => {
  const userId = localStorage.getItem("userId");
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

export const cancelSubscriptions = async (orderId, subscriptionIdsToCancel) => {
  try {
    const orderRes = await axios.get(`${API_BASE_URL}/600/orders/${orderId}`, {
      headers: getAuthHeader(),
    });
    const order = orderRes.data;

    const updatedSubscriptions = order.subscriptions.map((sub) =>
      subscriptionIdsToCancel.includes(sub.subscriptionId)
        ? { ...sub, subscriptionStatus: "已取消" }
        : sub,
    );

    // 透過計算推算訂單狀態 (移除原本 james 新增等註解，邏輯保持清晰)
    const isAllCancelled = updatedSubscriptions.every(
      (s) => s.subscriptionStatus === "已取消",
    );
    const newOrderStatus = isAllCancelled ? "已取消" : "處理中";

    const response = await axios.patch(
      `${API_BASE_URL}/600/orders/${orderId}`,
      {
        subscriptions: updatedSubscriptions,
        orderStatus: newOrderStatus,
      },
      { headers: getAuthHeader() },
    );

    toast.success("訂閱已成功取消");
    return response.data;
  } catch (error) {
    return handleProtectedError(error, null);
  }
};

export const getUserDogs = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await axios.get(`${API_BASE_URL}/dogs?ownerId=${userId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    return handleProtectedError(error, []);
  }
};

export const addToCart = async (sub, dog, month) => {
  const userId = localStorage.getItem("userId");
  const now = new Date().toISOString();

  const payload = {
    userId,
    dogId: dog.id,
    planName: sub.planName,
    planPrice: sub.planPrice,
    planQty: sub.planQty,
    totalCycles: month,
    pet: {
      name: dog.name,
      gender: dog.gender,
      size: dog.size,
      allergy: dog.allergies?.join("、") ?? "",
    },
    status: "pending",
    createdAt: now,
    updatedAt: now,
    content: sub.content,
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/600/carts`, payload, {
      headers: getAuthHeader(),
    });
    toast.success("已成功加入購物車");
    return response.data;
  } catch (error) {
    return handleProtectedError(error, null);
  }
};
