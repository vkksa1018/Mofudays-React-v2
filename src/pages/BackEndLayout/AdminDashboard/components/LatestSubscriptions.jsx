import { Link } from "react-router-dom";

import {
  formatDate,
  getShipStatusDotVariant,
} from "../../utils/adminDashboard";

import Dot from "../../components/Dots";

export default function LatestSubscriptions({ loading, latestSubs }) {
  return (
    <section className="card shadow-sm border-0 rounded-4 mb-3 ad-card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="fw-bolder">最新訂閱資料</div>
           <Link className="ad-link" to="/admin/subscriptions">
            查看所有訂閱
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 ad-table">
            <thead>
              <tr className="small text-secondary">
                <th>訂單編號</th>
                <th>訂購方案</th>
                <th>訂閱起始日</th>
                <th className="text-end">訂購數量</th>
                <th className="text-end">目前期數</th>
                <th>出貨狀態</th>
                <th>出貨日</th>
                <th>下次出貨</th>
                <th className="text-end">訂閱狀態</th>
              </tr>
            </thead>
            <tbody className="small">
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-secondary">
                    資料載入中...
                  </td>
                </tr>
              ) : latestSubs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-secondary">
                    目前沒有訂閱資料
                  </td>
                </tr>
              ) : (
                latestSubs.map((s) => {
                  const subStatus = s.subscriptionStatus || "-";

                  return (
                    <tr key={s.id}>
                      <td>
                        <a
                          className="ad-link fw-bold"
                          href="#sub"
                          onClick={(e) => e.preventDefault()}
                        >
                          {s.orderId || s.id}
                        </a>
                      </td>
                      <td className="text-truncate" style={{ maxWidth: 260 }}>
                        {s.planName || "-"}
                      </td>
                      <td>{formatDate(s.startDate)}</td>
                      <td className="text-end">
                        {s.subscriptionQuantity ?? 0}
                      </td>
                      <td className="text-end">
                        {`${s.currentCycleIndex ?? 0}/${s.currentCycleTotal ?? s.termCycles ?? 0}`}
                      </td>
                      <td>
                        <Dot
                          variant={getShipStatusDotVariant(s.shippingStatus)}
                        />
                        <span className="ms-2">{s.shippingStatus || "-"}</span>
                      </td>
                      <td>{s.shippedDate ? formatDate(s.shippedDate) : "-"}</td>
                      <td>
                        {s.nextShippedDate
                          ? formatDate(s.nextShippedDate)
                          : "-"}
                      </td>
                      <td className=" text-end">
                        {subStatus === "訂閱中" ? (
                          <SoftBadge variant="orange">
                            {" "}
                            <span className="text-primary">訂閱中</span>
                          </SoftBadge>
                        ) : (
                          <SoftBadge variant="gray">{subStatus}</SoftBadge>
                        )}
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

function SoftBadge({ variant, children }) {
  return (
    <span className={`badge rounded-pill ad-badge ad-badge--${variant}`}>
      {children}
    </span>
  );
}
