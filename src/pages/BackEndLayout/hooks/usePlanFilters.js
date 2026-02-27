import { useMemo, useState } from "react";
import { formatYMD } from "../utils/date";

const DEFAULT_FILTERS = {
  keyword: "",
  months: "",
  isActive: "",
  planPriceMin: "",
  planPriceMax: "",
  createdAtStart: "",
  createdAtEnd: "",
};

function isWithinDateRange(value, start, end) {
  if (!start && !end) return true;

  const ymd = formatYMD(value);

  // 無法轉成 yyyy-mm-dd 時，視為不符合
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return false;

  if (start && ymd < start) return false;
  if (end && ymd > end) return false;

  return true;
}

export function usePlanFilters(plans = []) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // 共用欄位更新
  const setFilter = (key) => (e) => {
    setFilters((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  // 清除全部條件
  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  // 是否有任何條件啟用中
  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((v) => String(v).trim() !== ""),
    [filters],
  );

  const visiblePlans = useMemo(() => {
    const keyword = filters.keyword.trim().toLowerCase();

    const planPriceMin =
      filters.planPriceMin === "" ? null : Number(filters.planPriceMin);
    const planPriceMax =
      filters.planPriceMax === "" ? null : Number(filters.planPriceMax);

    return plans.filter((plan) => {
      // 關鍵字：subtitle / namePool
      if (keyword) {
        const subtitle = (plan?.subtitle ?? "").toLowerCase();
        const namePoolText = Array.isArray(plan?.namePool)
          ? plan.namePool.join(" ").toLowerCase()
          : "";

        if (
          !subtitle.includes(keyword) &&
          !namePoolText.includes(keyword)
        ) {
          return false;
        }
      }

      // 月數
      if (filters.months) {
        if (Number(plan?.months ?? 0) !== Number(filters.months)) {
          return false;
        }
      }

      // 啟用狀態
      if (filters.isActive) {
        const want = filters.isActive === "true";
        if (Boolean(plan?.isActive) !== want) {
          return false;
        }
      }

      // 價格最小值
      if (planPriceMin !== null) {
        if (Number(plan?.planPrice ?? 0) < planPriceMin) {
          return false;
        }
      }

      // 價格最大值
      if (planPriceMax !== null) {
        if (Number(plan?.planPrice ?? 0) > planPriceMax) {
          return false;
        }
      }

      // 建立日區間
      if (
        !isWithinDateRange(
          plan?.createdAt,
          filters.createdAtStart,
          filters.createdAtEnd,
        )
      ) {
        return false;
      }

      return true;
    });
  }, [plans, filters]);

  return {
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters,
    visiblePlans,
  };
}