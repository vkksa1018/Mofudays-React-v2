import { Link } from "react-router-dom";

import "./Checkout.scss";
import ProgressBar2 from "../Subscribe/ProgressBar2";
import OrderList from "../Subscribe/OrderList";

function Checkout() {
  return (
    <>
      <main className="checkout py-11 pt-80-sm pb-0-sm">
        <div className="container">
          {/* 標題進度條 */}
          <ProgressBar2 />

          {/* 訂單明細卡片 */}
          <div className="card-bg py-9 px-110 px-12-sm mb-6 mb-0-sm">
            <OrderList />
            {/* 儲存按鈕手機版 */}
            <div className="text-center d-none-min-sm px-5-5-sm">
              <div className="row">
                <div className="col-6-sm">
                  <Link
                    className="btn btn-primary rounded-pill btn-active-white ls-5 fs-18-sm fw-medium-sm px-38-sm"
                    to="/cart"
                    role="button"
                  >
                    回上一步
                  </Link>
                </div>
                <div className="col-6-sm">
                  <Link
                    className="btn btn-primary rounded-pill btn-active ls-5 fs-18-sm fw-medium-sm px-38-sm"
                    to="/finish"
                    role="button"
                  >
                    確認付款
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 儲存按鈕 */}
          <div className="text-center d-none-sm">
            <Link
              className="btn btn-primary rounded-pill btn-active-white px-40 me-6"
              to="/cart"
              role="button"
            >
              回上一步
            </Link>
            <Link
              className="btn btn-primary rounded-pill btn-active px-40"
              to="/finish"
              role="button"
            >
              確認付款
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Checkout;
