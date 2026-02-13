import { useState, useEffect } from "react";
import { getUserProfile } from "../../api/userApi"; // 引入你寫的 API

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [isLoading, setIsLoading] = useState(true); // 新增讀取狀態

  useEffect(() => {
    const initAuth = async () => {
      // 1. 如果連 Token 都沒有，直接結束
      if (!token) {
        setIsLoading(false);
        return;
      }

      // 2. 如果有 Token，呼叫 userApi 去確認這個人是誰
      try {
        const userData = await getUserProfile();
        if (userData) {
          setUser(userData);
        } else {
          // 如果拿不到資料，可能 Token 過期了，清除它
          localStorage.removeItem("accessToken");
          setToken(null);
        }
      } catch (error) {
        console.error("驗證失敗", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [token]);

  return {
    isAuthed: !!token, // 只要有 token 就視為已登入（前端初步判斷）
    user, // 這裡會有從 API 拿到的詳細資料（包含 role）
    isLoading,
    token,
  };
};
