import { Link } from "react-router-dom";
import {
  formatDate,
  formatMoney,
  getOrderPlanText,
  getOrderQty,
  getOrderStatus,
  getOrderStatusDotVariant,
} from "../../utils/adminDashboard";

import Dot from "../../components/Dots";

import { Pencil } from "lucide-react";

export default function LatestOrders({ loading, latestOrders }) {
  return (
    <section className="card shadow-sm border-0 rounded-4 mb-3 ad-card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="fw-bolder">最新訂單資料</div>
          <Link className="ad-link" to="/admin/orders">
            查看所有訂單
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 ad-table">
            <thead>
              <tr className="small text-secondary">
                <th>訂單編號</th>
                <th>訂單日期</th>
                <th>訂購方案</th>
                <th className="text-end">訂購數量</th>
                <th className="text-end">總費金額</th>
                <th>訂單狀態</th>
                <th>訂購人</th>
                <th className="text-end">操作</th>
              </tr>
            </thead>
            <tbody className="small">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    資料載入中...
                  </td>
                </tr>
              ) : latestOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-secondary">
                    目前沒有訂單資料
                  </td>
                </tr>
              ) : (
                latestOrders.map((o) => {
                  const status = getOrderStatus(o);

                  return (
                    <tr key={o.id}>
                      <td>
                        <a
                          className="ad-link fw-bold"
                          href="#order"
                          onClick={(e) => e.preventDefault()}
                        >
                          {o.id}
                        </a>
                      </td>
                      <td>{formatDate(o.orderDate)}</td>
                      <td className="text-truncate" style={{ maxWidth: 260 }}>
                        {getOrderPlanText(o)}
                      </td>
                      <td className="text-end">{getOrderQty(o)}</td>
                      <td className="text-end">
                        {formatMoney(o.orderTotalAmount)}
                      </td>
                      <td>
                        <Dot variant={getOrderStatusDotVariant(status)} />
                        <span className="ms-2">{status}</span>
                      </td>
                      <td>{o.buyerInfo?.name || o.buyer || "-"}</td>
                      <td className="text-end">
                        {/* <button
                                    type="button"
                                    className="btn border ad-iconBtn me-2"
                                    title="留言"
                                  >
                                    <MessageCircle size={16} />
                                  </button> */}
                        <button
                          type="button"
                          className="btn ad-iconBtn"
                          title="編輯"
                        >
                          <Pencil size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
