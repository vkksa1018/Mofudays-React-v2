// ==========================
// AdminHousehold/hooks/useHouseholdFilters.js
// ==========================
import { useMemo, useState } from "react";
import { formatYMD } from "../utils/date";

const DEFAULT_FILTERS = {
  keyword: "",
  category: "",
  petSize: "",
  dietStage: "",
  tag: "",
  isActive: "",
  createdAtStart: "",
  createdAtEnd: "",
};

function isWithinDateRange(value, start, end) {
  if (!start && !end) return true;
  const ymd = formatYMD(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return false;
  if (start && ymd < start) return false;
  if (end && ymd > end) return false;
  return true;
}

export function useHouseholdFilters(items) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const setFilter = (key) => (e) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((v) => String(v).trim() !== ""),
    [filters],
  );

  const visibleHousehold = useMemo(() => {
    const keyword = filters.keyword.trim().toLowerCase();
    const tagQ = filters.tag.trim().toLowerCase();

    return items.filter((row) => {
      if (keyword) {
        const name = (row?.itemName ?? "").toLowerCase();
        const desc = (row?.description ?? "").toLowerCase();
        if (!name.includes(keyword) && !desc.includes(keyword)) return false;
      }

      if (filters.category && row?.category !== filters.category) return false;
      if (filters.petSize && !(row?.petSize ?? []).includes(filters.petSize)) return false;
      if (filters.dietStage && !(row?.dietStage ?? []).includes(filters.dietStage)) return false;

      if (tagQ) {
        const tags = Array.isArray(row?.tags) ? row.tags.map((t) => String(t).toLowerCase()) : [];
        if (!tags.some((t) => t.includes(tagQ))) return false;
      }

      if (filters.isActive) {
        const want = filters.isActive === "true";
        if (Boolean(row?.isActive) !== want) return false;
      }

      if (!isWithinDateRange(row?.createdAt, filters.createdAtStart, filters.createdAtEnd)) {
        return false;
      }

      return true;
    });
  }, [items, filters]);

  return {
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters,
    visibleHousehold,
  };
}