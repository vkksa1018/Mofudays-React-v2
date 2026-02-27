
import { useEffect, useState } from "react";
import axios from "axios";
import { Bone } from "lucide-react";

import "../../../../styles/AdminStyle/adminCommonPages.scss";
import TreatTitle from "./components/TreatTitle";
import TreatFiltersPanel from "./components/TreatFiltersPanel";
import TreatResultsTable from "./components/TreatResultsTable";
import TreatFormModal from "./components/TreatFormModal";
import PaginationBar from "../../PaginationBar";
import { usePagination } from "../../hooks/usePagination";

import { authHeaders } from "../../utils/auth";
import { nowISO } from "../../utils/date";
import { useTreatFilters } from "../../hooks/useTreatFilters";

const API_BASE = import.meta.env.VITE_API_BASE;
const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

export default function AdminTreats() {
  const [treats, setTreats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(null);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [editing, setEditing] = useState(null);

  const {
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters,
    visibleTreats,
  } = useTreatFilters(treats);

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
  } = usePagination(visibleTreats, {
    initialPageSize: 10,
    resetDeps: [filters],
  });

  const fetchTreats = async () => {
    setLoading(true);
    setFlash(null);
    try {
      const res = await axios.get(`${API_BASE}/treats`, authHeaders());
      setTreats(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setFlash({
        type: "danger",
        message:
          err?.response?.status === 401
            ? "權限已失效，請重新登入後台。"
            : "載入零食資料失敗，請稍後再試。",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreats();
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

  const softDelete = async (row) => {
    if (!row?.id) return;
    const ok = window.confirm(`確定要刪除零食「${row?.treatName ?? "—"}」嗎？`);
    if (!ok) return;

    setFlash(null);
    try {
      await axios.patch(
        `${API_BASE}/treats/${row.id}`,
        {
          deletedAt: nowISO(),
          isActive: false,
          updatedAt: nowISO(),
        },
        authHeaders(),
      );
      setFlash({ type: "success", message: "已刪除零食資料" });
      await fetchTreats();
    } catch (err) {
      setFlash({
        type: "danger",
        message:
          err?.response?.status === 401
            ? "權限已失效，請重新登入後台。"
            : "刪除失敗，請稍後再試。",
      });
    }
  };

  const restore = async (row) => {
    if (!row?.id) return;
    setFlash(null);
    try {
      await axios.patch(
        `${API_BASE}/treats/${row.id}`,
        {
          deletedAt: null,
          isActive: true,
          updatedAt: nowISO(),
        },
        authHeaders(),
      );
      setFlash({ type: "success", message: "已復原零食資料" });
      await fetchTreats();
    } catch (err) {
      setFlash({
        type: "danger",
        message:
          err?.response?.status === 401
            ? "權限已失效，請重新登入後台。"
            : "復原失敗，請稍後再試。",
      });
    }
  };

  const handleSave = async (data) => {
    setFlash(null);

    const payload = {
      treatName: data.treatName?.trim(),
      petSize: toArray(data.petSize),
      dietStage: toArray(data.dietStage),
      ingredients: toArray(data.ingredients),
      texture: data.texture,
      healthCare: toArray(data.healthCare),
      description: data.description?.trim() ?? "",
      isActive: data.isActive === "true",
      updatedAt: nowISO(),
    };

    try {
      if (mode === "create") {
        await axios.post(
          `${API_BASE}/treats`,
          {
            ...payload,
            createdAt: nowISO(),
            deletedAt: null,
          },
          authHeaders(),
        );
        setFlash({ type: "success", message: "新增零食成功！" });
      } else {
        if (!editing?.id) throw new Error("Missing treat id");
        await axios.patch(`${API_BASE}/treats/${editing.id}`, payload, authHeaders());
        setFlash({ type: "success", message: "更新零食成功！" });
      }

      await fetchTreats();
    } catch (err) {
      throw (
        err?.response?.data?.message ||
        (err?.response?.status === 401
          ? "權限已失效，請重新登入後台。"
          : "送出失敗，請確認資料是否正確。")
      );
    }
  };

  return (
    <div className="container-fluid mt-3 py-5 admin-pages">
      <TreatTitle
        icon={Bone}
        flash={flash}
      />

      <TreatFiltersPanel
        filters={filters}
        setFilter={setFilter}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        onCreate={openCreate}
        onRefresh={fetchTreats}
        loading={loading}
      />

      <TreatResultsTable
        loading={loading}
        treats={pagedItems}
        hasNoData={!loading && visibleTreats.length === 0}
        onEdit={openEdit}
        onSoftDelete={softDelete}
        onRestore={restore}
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

      <TreatFormModal
        open={open}
        mode={mode}
        initialData={editing}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
}


