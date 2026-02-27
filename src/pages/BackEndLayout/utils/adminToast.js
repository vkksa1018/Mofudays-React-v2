import { toast } from "react-toastify";


//將各種錯誤格式（字串 / Error / axios error / rejectWithValue）轉成可顯示文字
export function getErrorMessage(error, fallback = "發生錯誤，請稍後再試") {
  if (!error) return fallback;

  // rejectWithValue("登入失敗")
  if (typeof error === "string") return error;

  // 一般 Error
  if (error instanceof Error && error.message) return error.message;

  // Axios 常見格式
  const axiosMsg =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.response?.data?.msg;

  if (typeof axiosMsg === "string" && axiosMsg.trim()) return axiosMsg;

  // redux 中 rejectWithValue 包成  payload
  if (typeof error?.payload === "string" && error.payload.trim()) {
    return error.payload;
  }

  return fallback;
}

/**
 * 產生穩定 toastId（避免同一訊息短時間狂跳）
 * 可傳 key；不傳就用 message 當 key
 */
function buildToastId(prefix, keyOrMessage) {
  return `${prefix}:${String(keyOrMessage)}`;
}

/**
 * 共用預設設定
 * （位置/樣式主要由 AdminLayout 的 ToastContainer 控制，這裡以行為為主）
 */
const baseOpts = {
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/**
 * 若要避免重複跳出相同通知，預設會帶 toastId
 * 也可以在 options 裡傳自訂 toastId 覆蓋
 */
function show(typeFn, message, options = {}, idPrefix = "toast") {
  const safeMessage = typeof message === "string" && message.trim()
    ? message
    : "通知";

  const finalOptions = {
    ...baseOpts,
    ...options,
  };

  // 若呼叫端沒給 toastId，自動依訊息生成一個
  if (!finalOptions.toastId) {
    finalOptions.toastId = buildToastId(idPrefix, safeMessage);
  }

  return typeFn(safeMessage, finalOptions);
}

export const adminToast = {
  // 成功
  success(message = "操作成功", options = {}) {
    return show(toast.success, message, options, "success");
  },

  // 錯誤
  error(message = "操作失敗", options = {}) {
    return show(toast.error, message, options, "error");
  },

  // 資訊
  info(message = "提示訊息", options = {}) {
    return show(toast.info, message, options, "info");
  },

  // 警告
  warn(message = "請留意", options = {}) {
    return show(toast.warning, message, options, "warn");
  },

  // 載入中（回傳 toastId，後續可 update）
  loading(message = "處理中...", options = {}) {
    const toastId = options.toastId || buildToastId("loading", message);
    toast.loading(message, {
      ...baseOpts,
      toastId,
      closeOnClick: false,
      ...options,
    });
    return toastId;
  },

  /**
   * 更新既有 toast（常用在 loading -> success/error）
   * 範例：
   * const id = adminToast.loading("儲存中...");
   * adminToast.update(id, { type: "success", render: "儲存成功" });
   */
  update(
    toastId,
    {
      render = "完成",
      type = "default", // "success" | "error" | "info" | "warning" | "default"
      isLoading = false,
      autoClose = 2200,
      ...rest
    } = {}
  ) {
    if (!toastId) return;
    toast.update(toastId, {
      render,
      type,
      isLoading,
      autoClose,
      ...rest,
    });
  },

  // 關閉單一或全部 toast
  dismiss(toastId) {
    if (toastId) toast.dismiss(toastId);
    else toast.dismiss();
  },

  /**
   * 包裝 API 錯誤：自動解析訊息並跳出 error toast
   * 回傳解析後文字，方便你同時 setError / 顯示在畫面
   */
  apiError(error, fallback = "操作失敗，請稍後再試", options = {}) {
    const message = getErrorMessage(error, fallback);
    this.error(message, options);
    return message;
  },

  /**
   * Promise 模式（可選，用於新增/儲存/刪除）
   * 範例：
   * await adminToast.promise(apiCall(), { pending: "儲存中...", success: "儲存成功", error: "儲存失敗" });
   */
  promise(promise, messages = {}, options = {}) {
    const {
      pending = "處理中...",
      success = "操作成功",
      error = "操作失敗",
    } = messages;

    return toast.promise(
      promise,
      {
        pending,
        success,
        error: {
          render({ data }) {
            // data 是 rejected error
            return getErrorMessage(data, typeof error === "string" ? error : "操作失敗");
          },
        },
      },
      {
        ...baseOpts,
        ...options,
      }
    );
  },
};