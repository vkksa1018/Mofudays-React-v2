import { formatDate, formatDateTime } from "../../utils/adminDashboard";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { adminToast } from "../../utils/adminToast";
// 功能尚未開放按鈕
  const handleFeatureComingSoon = (label = "此功能") => {
    adminToast.info(`${label}功能尚未開放`, {
      toastId: `coming-soon:${label}`,
    });
  };
export default function LatestUsers({ loading, latestMembers }) {
  return (
    <section className="card shadow-sm border-0 rounded-4 ad-card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="fw-bolder">最新會員資料</div>
          <Link className="ad-link" to="/admin/users">
            查看所有會員
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 ad-table">
            <thead>
              <tr className="small text-secondary">
                <th>會員編號</th>
                <th>姓名</th>
                <th>生日</th>
                <th>聯絡電話</th>
                <th>Email</th>
                <th>地址</th>
                <th>註冊時間</th>
                <th className="text-end">操作</th>
              </tr>
            </thead>
            <tbody className="small">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-secondary">
                    資料載入中...
                  </td>
                </tr>
              ) : latestMembers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-secondary">
                    目前沒有會員資料
                  </td>
                </tr>
              ) : (
                latestMembers.map((m) => (
                  <tr key={m.id}>
                    <td
                      className="ad-orange fw-bold text-truncate"
                      style={{ maxWidth: 180 }}
                      title={m.id}
                    >
                      {m.id}
                    </td>
                    <td>{m.name || "-"}</td>
                    <td>{m.birthday ? formatDate(m.birthday) : "-"}</td>
                    <td>{m.phone || "-"}</td>
                    <td className="text-truncate" style={{ maxWidth: 220 }}>
                      {m.email || "-"}
                    </td>
                    <td className="text-truncate" style={{ maxWidth: 280 }}>
                      {m.address || "-"}
                    </td>
                    <td>{m.createdAt ? formatDateTime(m.createdAt) : "-"}</td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn ad-iconBtn"
                        title="編輯"
                        onclick={()=>{handleFeatureComingSoon()}}
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
