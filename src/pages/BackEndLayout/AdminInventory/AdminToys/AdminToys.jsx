
import { useEffect, useState } from "react";
import axios from "axios";
import { Package2 } from "lucide-react";

import "../../../../styles/AdminStyle/adminCommonPages.scss";
import ToyTitle from "./components/ToyTitle";
import ToyFiltersPanel from "./components/ToyFiltersPanel";
import ToyResultsTable from "./components/ToyResultsTable";
import ToyFormModal from "./components/ToyFormModal";
import PaginationBar from "../../PaginationBar";

import { authHeaders } from "../../utils/auth";
import { nowISO } from "../../utils/date";
import { usePagination } from "../../hooks/usePagination";
import { useToyFilters } from "../../hooks/useToyFilters";

const API_BASE = import.meta.env.VITE_API_BASE;

const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

export default function AdminToys() {
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(null);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [editing, setEditing] = useState(null);

  const { filters, setFilter, clearFilters, hasActiveFilters, visibleToys } =
    useToyFilters(toys);

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
  } = usePagination(visibleToys, {
    initialPageSize: 10,
    resetDeps: [filters],
  });

  const fetchToys = async () => {
    setLoading(true);
    setFlash(null);
    try {
      const res = await axios.get(`${API_BASE}/toys`, authHeaders());
      setToys(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setFlash({
        type: "danger",
        message:
          err?.response?.status === 401
            ? "權限已失效，請重新登入後台。"
            : "載入玩具資料失敗，請稍後再試。",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToys();
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
    const ok = window.confirm(`確定要刪除玩具「${row?.toyName ?? "—"}」嗎？`);
    if (!ok) return;

    setFlash(null);
    try {
      await axios.patch(
        `${API_BASE}/toys/${row.id}`,
        {
          deletedAt: nowISO(),
          isActive: false,
          updatedAt: nowISO(),
        },
        authHeaders(),
      );
      setFlash({ type: "success", message: "已刪除玩具資料" });
      await fetchToys();
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
        `${API_BASE}/toys/${row.id}`,
        {
          deletedAt: null,
          isActive: true,
          updatedAt: nowISO(),
        },
        authHeaders(),
      );
      setFlash({ type: "success", message: "已復原玩具資料" });
      await fetchToys();
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
      toyName: data.toyName?.trim(),
      petSize: toArray(data.petSize),
      dietStage: toArray(data.dietStage),
      playStyle: toArray(data.playStyle),
      description: data.description?.trim() ?? "",
      isActive: data.isActive === "true",
      updatedAt: nowISO(),
    };

    try {
      if (mode === "create") {
        await axios.post(
          `${API_BASE}/toys`,
          {
            ...payload,
            createdAt: nowISO(),
            deletedAt: null,
          },
          authHeaders(),
        );
        setFlash({ type: "success", message: "新增玩具成功！" });
      } else {
        if (!editing?.id) throw new Error("Missing toy id");
        await axios.patch(`${API_BASE}/toys/${editing.id}`, payload, authHeaders());
        setFlash({ type: "success", message: "更新玩具成功！" });
      }

      await fetchToys();
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
      <ToyTitle flash={flash} />

      <ToyFiltersPanel
        filters={filters}
        setFilter={setFilter}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        onCreate={openCreate}
        onRefresh={fetchToys}
        loading={loading}
      />

      <ToyResultsTable
        loading={loading}
        toys={pagedItems}
        hasNoData={!loading && visibleToys.length === 0}
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

      <ToyFormModal
        open={open}
        mode={mode}
        initialData={editing}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
}

