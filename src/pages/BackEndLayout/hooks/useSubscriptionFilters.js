import { useMemo, useState } from "react";

const initialFilters = {
  subscriptionId: "",
  orderId: "",
  planName: "",
  shippingStatus: "",
  subscriptionStatus: "",
  startDateStart: "",
  startDateEnd: "",
};

export function useSubscriptionFilters(subscriptions = []) {
  const [filters, setFilters] = useState(initialFilters);

  const setFilter = (field) => (e) => {
    const value = e?.target?.value ?? "";
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => String(value).trim() !== "",
  );

  const visibleSubscriptions = useMemo(() => {
    return (subscriptions || []).filter((sub) => {
      const subscriptionId = String(sub?.id ?? "").toLowerCase();
      const orderId = String(sub?.orderId ?? "").toLowerCase();
      const planName = String(sub?.planName ?? "").toLowerCase();
      const shippingStatus = String(sub?.shippingStatus ?? "").toLowerCase();
      const subscriptionStatus = String(sub?.subscriptionStatus ?? "").toLowerCase();
      const startDate = String(sub?.startDate ?? "");

      if (
        filters.subscriptionId &&
        !subscriptionId.includes(filters.subscriptionId.trim().toLowerCase())
      ) {
        return false;
      }

      if (
        filters.orderId &&
        !orderId.includes(filters.orderId.trim().toLowerCase())
      ) {
        return false;
      }

      if (
        filters.planName &&
        !planName.includes(filters.planName.trim().toLowerCase())
      ) {
        return false;
      }

      if (
        filters.shippingStatus &&
        !shippingStatus.includes(filters.shippingStatus.trim().toLowerCase())
      ) {
        return false;
      }

      if (
        filters.subscriptionStatus &&
        subscriptionStatus !== filters.subscriptionStatus.trim().toLowerCase()
      ) {
        return false;
      }

      if (filters.startDateStart && startDate < filters.startDateStart) {
        return false;
      }

      if (filters.startDateEnd && startDate > filters.startDateEnd) {
        return false;
      }

      return true;
    });
  }, [subscriptions, filters]);

  return {
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters,
    visibleSubscriptions,
  };
}