import { useEffect, useState } from "react";
import axios from "axios";

import "../../../styles/AdminStyle/adminCommonPages.scss";

import PlanTitle from "./components/PlanTitle";
import PlanFiltersPanel from "./components/PlanFiltersPanel";
import PlanResultsTable from "./components/PlanResultsTable";
import PlanFormModal from "./components/PlanFormModal";
import PaginationBar from "../PaginationBar";

import { authHeaders } from "../utils/auth";
import { nowISO } from "../utils/date";
import { usePagination } from "../hooks/usePagination";
import { usePlanFilters } from "../hooks/usePlanFilters";

const API_BASE = import.meta.env.VITE_API_BASE;

function parseNamePool(text = "") {
  return String(text)
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(null);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [editing, setEditing] = useState(null);

  const { filters, setFilter, clearFilters, hasActiveFilters, visiblePlans } =
    usePlanFilters(plans);

  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalRows,
    totalPages,
    pagedItems,
    pageItems,
    rangeText,
  } = usePagination(visiblePlans, {
    initialPageSize: 10,
    resetDeps: [filters],
  });

  const fetchPlans = async () => {
    setLoading(true);
    setFlash(null);

    try {
      const res = await axios.get(`${API_BASE}/plans`, authHeaders());
      setPlans(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setFlash({
        type: "danger",
        message:
          err?.response?.status === 401
            ? "權限已失效，請重新登入後台。"
            : "載入方案資料失敗，請稍後再試。",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const openCreate = () => {
    setMode("create");
    setEditing(null);
    setFlash(null);
    setOpen(true);
  };

  const openEdit = (row) => {
    setMode("edit");
    setEditing(row);
    setFlash(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
  };

  const toggleActive = async (row, nextActive) => {
    if (!row?.id) return;

    const ok = window.confirm(
      nextActive
        ? `確定要啟用方案「${row?.subtitle ?? row?.id}」嗎？`
        : `確定要停用方案「${row?.subtitle ?? row?.id}」嗎？`,
    );
    if (!ok) return;

    setFlash(null);

    try {
      await axios.patch(
        `${API_BASE}/plans/${row.id}`,
        {
          isActive: nextActive,
          updatedAt: nowISO(),
        },
        authHeaders(),
      );

      setFlash({
        type: "success",
        message: nextActive ? "已啟用方案" : "已停用方案",
      });

      await fetchPlans();
    } catch (err) {
      setFlash({
        type: "danger",
        message:
          err?.response?.status === 401
            ? "權限已失效，請重新登入後台。"
            : "狀態更新失敗，請稍後再試。",
      });
    }
  };

  const handleSave = async (data) => {
    setFlash(null);

    const payload = {
      planPrice: Number(data.planPrice ?? 0),
      months: Number(data.months ?? 0),
      isActive: data.isActive === "true",
      namePool: parseNamePool(data.namePoolText),
      subtitle: data.subtitle?.trim() ?? "",
      content: {
        treats: Number(data.contentTreats ?? 0),
        toys: Number(data.contentToys ?? 0),
        household: Number(data.contentHousehold ?? 0),
      },
      imageUrl: data.imageUrl?.trim() ?? "",
      updatedAt: nowISO(),
    };

    try {
      if (mode === "create") {
        await axios.post(
          `${API_BASE}/plans`,
          {
            ...payload,
            createdAt: nowISO(),
          },
          authHeaders(),
        );
        setFlash({ type: "success", message: "新增方案成功！" });
      } else {
        if (!editing?.id) throw new Error("Missing plan id");

        await axios.patch(
          `${API_BASE}/plans/${editing.id}`,
          payload,
          authHeaders(),
        );
        setFlash({ type: "success", message: "更新方案成功！" });
      }

      await fetchPlans();
    } catch (err) {
      const msg =
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.response?.status === 401
            ? "權限已失效，請重新登入後台。"
            : "送出失敗，請確認資料是否正確。";

      throw msg;
    }
  };

  return (
    <div className="container-fluid mt-3 py-5 admin-pages">
      <PlanTitle flash={flash} />

      <PlanFiltersPanel
        filters={filters}
        setFilter={setFilter}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        onCreate={openCreate}
        onRefresh={fetchPlans}
        loading={loading}
      />

      <PlanResultsTable
        loading={loading}
        plans={pagedItems}
        hasNoData={!loading && visiblePlans.length === 0}
        onEdit={openEdit}
        onToggleActive={toggleActive}
      />

      <PaginationBar
        loading={loading}
        totalRows={totalRows}
        rangeText={rangeText}
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setPage={setPage}
        pageItems={pageItems}
      />

      <PlanFormModal
        open={open}
        mode={mode}
        initialData={editing}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
}