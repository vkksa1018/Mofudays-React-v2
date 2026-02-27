export function toDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDate(value) {
  const d = toDate(value);
  if (!d) return "-";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}

export function formatDateTime(value) {
  const d = toDate(value);
  if (!d) return "-";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}/${m}/${day} ${hh}:${mm}`;
}

export function formatMoney(value) {
  return `$${Number(value || 0).toLocaleString("zh-TW")}`;
}

export function isToday(value) {
  const d = toDate(value);
  if (!d) return false;
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export function isThisMonth(value) {
  const d = toDate(value);
  if (!d) return false;
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth()
  );
}

export function sortByDateDesc(list, dateKey) {
  return [...list].sort((a, b) => {
    const aTime = toDate(a?.[dateKey])?.getTime() || 0;
    const bTime = toDate(b?.[dateKey])?.getTime() || 0;
    return bTime - aTime;
  });
}

export function getOrderPlanText(order) {
  if (!Array.isArray(order.subscriptionPlans) || order.subscriptionPlans.length === 0) {
    return "-";
  }

  return order.subscriptionPlans
    .map((p) => `${p.name}${p.quantity ? ` x${p.quantity}` : ""}`)
    .join(" / ");
}

export function getOrderQty(order) {
  if (!Array.isArray(order.subscriptionPlans)) return 0;
  return order.subscriptionPlans.reduce(
    (sum, p) => sum + Number(p.quantity || 0),
    0
  );
}

export function getOrderStatus(order) {
  return order.paymentStatus || "待處理";
}

export function getOrderStatusDotVariant(status) {
  const s = String(status || "");
  if (s.includes("待處理") || s.includes("處理中")) return "warning";
  if (s.includes("已付款") || s.includes("完成")) return "success";
  return "muted";
}

export function getShipStatusDotVariant(status) {
  const s = String(status || "");
  if (s.includes("待處理")) return "warning";
  if (s.includes("處理中")) return "orange";
  if (s.includes("已出貨")) return "success";
  if (s.includes("完成")) return "muted";
  return "muted";
}