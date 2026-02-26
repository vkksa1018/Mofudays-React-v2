import { Pencil, PauseCircle, PlayCircle } from "lucide-react";
import { formatYMD } from "../../utils/date";

function renderNamePool(namePool = []) {
  if (!Array.isArray(namePool) || namePool.length === 0) return "—";
  return namePool.join("、");
}

function renderContent(content = {}) {
  return `零食 ${content?.treats ?? 0} / 玩具 ${content?.toys ?? 0} / 生活小物 ${content?.household ?? 0}`;
}

export default function PlanResultsTable({
  loading,
  plans,
  hasNoData,
  onEdit,
  onToggleActive,
}) {
  return (
    <section className="admin-pages__results">
      <div className="admin-pages__panel">
        <div className="table-responsive">
          <table className="table admin-pages__table align-middle mb-0">
            <thead>
              <tr className="small">
                <th style={{ width: 180 }}></th>
                <th className="text-center" style={{ width: 90 }}>
                  月數
                </th>
                <th className="text-center" style={{ width: 110 }}>
                  價格
                </th>
                <th className="text-center">方案名稱池</th>
                <th className="text-center">副標</th>
                <th className="text-center">內容物</th>
                <th className="text-center" style={{ width: 90 }}>
                  啟用
                </th>
                <th className="text-center text-nowrap" style={{ width: 150 }}>
                  建立日
                </th>
                <th className="text-center text-nowrap" style={{ width: 150 }}>
                  更新日
                </th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-muted">
                    載入中…
                  </td>
                </tr>
              )}

              {!loading && hasNoData && (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-muted">
                    尚無資料
                  </td>
                </tr>
              )}

              {!loading &&
                !hasNoData &&
                plans.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-sm btn-bg-edit"
                          onClick={() => onEdit(row)}
                        >
                          <Pencil size={14} className="me-1" />
                          編輯
                        </button>

                        {row.isActive ? (
                          <button
                            className="btn btn-sm btn-bg-delete"
                            onClick={() => onToggleActive(row, false)}
                          >
                            <PauseCircle size={14} className="me-1" />
                            停用
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => onToggleActive(row, true)}
                          >
                            <PlayCircle size={14} className="me-1" />
                            啟用
                          </button>
                        )}
                      </div>
                    </td>

                    <td>{row.months ?? "—"} 個月</td>
                    <td>${Number(row.planPrice ?? 0).toLocaleString()}</td>
                    <td>{renderNamePool(row.namePool)}</td>
                    <td>{row.subtitle ?? "—"}</td>
                    <td>{renderContent(row.content)}</td>
                    <td>
                      {row.isActive ? (
                        <span className="badge badge-bg-isActive">啟用</span>
                      ) : (
                        <span className="badge badge-bg-notActive">停用</span>
                      )}
                    </td>
                    <td className="text-muted text-nowrap">
                      {formatYMD(row.createdAt)}
                    </td>
                    <td className="text-muted text-nowrap">
                      {formatYMD(row.updatedAt)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}