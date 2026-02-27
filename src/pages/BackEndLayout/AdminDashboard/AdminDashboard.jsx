import { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
import LatestOrders from "./components/LatestOrders";
import LatestSubscriptions from "./components/LatestSubscriptions";
import LatestMembers from "./components/LatestMembers";
import "../../../styles/AdminStyle/adminDashboard.scss";

import { Info, RefreshCw } from "lucide-react";
import { adminToast, getErrorMessage } from "../utils/adminToast";
import {
  isToday,
  isThisMonth,
  sortByDateDesc
} from "../utils/adminDashboard";

const API_BASE = import.meta.env.VITE_API_BASE;

function StatCard({ title, value, unit }) {
  return (
    <div className="card shadow-sm border-0 rounded-4 h-100 ad-card">
      <div className="card-body d-flex flex-column gap-2">
        <div className="d-flex align-items-start justify-content-between">
          <div className="small fw-semibold">{title}</div>
          <button
            type="button"
            className="btn btn-link p-0 ad-iconLink"
            aria-label="info"
          >
            <Info size={16} />
          </button>
        </div>
        <div className="d-flex align-items-end gap-2">
          <div className="display-6 fw-bolder ad-orange">{value}</div>
          <div className="fw-semibold pb-2">{unit}</div>
        </div>
      </div>
    </div>
  );
}

function Dot({ variant = "warning" }) {
  return <span className={`ad-dot ad-dot--${variant}`} aria-hidden />;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [refreshing, setRefreshing] = useState(false); // toast用

  const fetchDashboardData = useCallback(async () => {
    const [ordersRes, subscriptionsRes, usersRes] = await Promise.all([
      axios.get(`${API_BASE}/orders`),
      axios.get(`${API_BASE}/subscriptions`),
      axios.get(`${API_BASE}/users`, { params: { role: "user" } }),
    ]);

    return {
      orders: Array.isArray(ordersRes.data) ? ordersRes.data : [],
      subscriptions: Array.isArray(subscriptionsRes.data)
        ? subscriptionsRes.data
        : [],
      members: Array.isArray(usersRes.data) ? usersRes.data : [],
    };
  }, []);

  useEffect(() => {
    let alive = true;

    const init = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const data = await fetchDashboardData();
        if (!alive) return;

        setOrders(data.orders);
        setSubscriptions(data.subscriptions);
        setMembers(data.members);
      } catch (error) {
        console.error("AdminDashboard 載入失敗:", error);
        if (!alive) return;

        const message = getErrorMessage(error, "資料載入失敗，請稍後再試");
        setErrorMsg(message);

        // 初次載入失敗時給一顆 toast（避免重複可加 toastId）
        adminToast.error(message, { toastId: "dashboard-init-fail" });
      } 
      // finally {
      //   if (!alive) return;
      //   setLoading(false);
      // }
    };

    init();

    return () => {
      alive = false;
    };
  }, [fetchDashboardData]);

  /* 最新資料 */
  const latestOrders = useMemo(() => {
    return sortByDateDesc(orders, "orderDate").slice(0, 5);
  }, [orders]);

  const latestSubs = useMemo(() => {
    return sortByDateDesc(subscriptions, "createdAt").slice(0, 5);
  }, [subscriptions]);

  const latestMembers = useMemo(() => {
    return sortByDateDesc(members, "createdAt").slice(0, 5);
  }, [members]);

  /*  統計卡*/
  const stats = useMemo(() => {
    // 本日訂單數：用 orders.orderDate
    const todayOrders = orders.filter((o) => isToday(o.orderDate)).length;

    // 代處理訂單數：
    // 你的 orders 沒有 orderStatus，這裡先用 subscriptions.shippingStatus 估算「待處理中的訂單/訂閱」
    const pendingOrders = subscriptions.filter((s) => {
      const status = String(s.shippingStatus || "");
      return status.includes("待") || status.includes("處理中");
    }).length;

    // 本月新增會員：users(role=user).createdAt
    const monthNewMembers = members.filter((m) =>
      isThisMonth(m.createdAt),
    ).length;

    return {
      todayOrders,
      pendingOrders,
      monthNewMembers,
    };
  }, [orders, subscriptions, members]);

  // 重新整理
  const handleRefresh = async () => {
    const toastId = adminToast.loading("重新整理儀表板資料中...");
    try {
      setRefreshing(true);
      setErrorMsg("");

      const data = await fetchDashboardData();

      setOrders(data.orders);
      setSubscriptions(data.subscriptions);
      setMembers(data.members);

      adminToast.update(toastId, {
        type: "success",
        render: "儀表板資料已更新",
      });
    } catch (error) {
      const message = getErrorMessage(error, "重新整理失敗，請稍後再試");
      setErrorMsg(message);

      adminToast.update(toastId, {
        type: "error",
        render: message,
      });
    } finally {
      setRefreshing(false);
    }
  };

  // 功能尚未開放按鈕
  // const handleFeatureComingSoon = (label = "此功能") => {
  //   adminToast.info(`${label}功能尚未開放`, {
  //     toastId: `coming-soon:${label}`,
  //   });
  // };

  return (
    <div className={`ad-main__inner ad-dashboard-page ${loading ? "is-loading" : "is-ready"}`}>

      <div className="d-flex align-items-center justify-content-start mb-3 gap-2">
        <h2 className="h5 fw-bolder m-0">數據總覽</h2>

        <button
          type="button"
          className="btn btn-sm btn-refresh d-inline-flex align-items-center gap-2"
          onClick={handleRefresh}
          disabled={loading || refreshing}
          title="重新整理資料"
        >
          <RefreshCw size={16} className={refreshing ? "spin" : ""} />
          {refreshing ? "重新整理中..." : "重新整理"}
        </button> 
      </div>

      {errorMsg && (
        <div
          className="alert alert-warning rounded-4 border-0 mb-3"
          role="alert"
        >
          {errorMsg}
        </div>
      )}

      {/* 統計卡 */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-lg-4">
          <StatCard title="本日訂單數" value={stats.todayOrders} unit="筆" />
        </div>
        <div className="col-12 col-lg-4">
          <StatCard
            title="代處理訂單數"
            value={stats.pendingOrders}
            unit="筆"
          />
        </div>
        <div className="col-12 col-lg-4">
          <StatCard
            title="本月新增會員"
            value={stats.monthNewMembers}
            unit="名"
          />
        </div>
      </div>

      {/* 最新訂單資料 */}
      <LatestOrders loading={ loading } latestOrders={ latestOrders }/>

      {/* 最新訂閱資料 */}
      <LatestSubscriptions loading={ loading } latestSubs={ latestSubs }/>

      {/* 最新會員資料 */}
      <LatestMembers loading={ loading } latestMembers={ latestMembers }/>

    </div>
  );
}
