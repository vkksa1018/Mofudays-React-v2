import { Link } from "react-router-dom";

import "./Cart.scss";

import ProgressBar2 from "../Subscribe/ProgressBar2";
import CartCardWeb from "../Subscribe/CartCardWeb";
import CartCardPhone from "../Subscribe/CartCardPhone";

import productImg1 from "../../../assets/images/subscribe/product-img-01.png";
import productImg2 from "../../../assets/images/subscribe/product-img-02.png";
import productImg3 from "../../../assets/images/subscribe/product-img-03.png";

function Cart() {
  return (
    <>
      <main className="cart py-11 pt-80-sm pb-0-sm">
        <div className="container">
          {/* 標題進度條 */}
          <ProgressBar2 />

          {/* 訂閱內容卡片 */}
          <div className="card-bg py-9 px-110 px-12-sm mb-6 mb-0-sm">
            <div className="row-table">
              {/* 訂閱內容表格 */}
              <div className="col-table-10 mb-7">
                <h5 className="mb-5 ls-5 text-center-sm">訂閱內容</h5>

                {/* 表格標題列 */}
                <div className="table-title-bg d-flex py-2 mb-2 d-none-sm">
                  <p className="col-table-2 text-center"></p>
                  <p className="col-table-3 text-center">品項</p>
                  <p className="col-table-1 text-center">單價</p>
                  <p className="col-table-2 text-center">數量</p>
                  <p className="col-table-1 text-center">小計</p>
                  <p className="col-table-1 text-center"></p>
                </div>

                {/* 表格網頁版 */}
                {/* 第一列 */}
                <CartCardWeb
                  productImg={productImg1}
                  title="新手爸媽安心組"
                  price="699"
                  quantity="3"
                  total="2,097"
                />

                {/* 第二列 */}
                <CartCardWeb
                  productImg={productImg2}
                  title="青春汪能量補給包"
                  price="699"
                  quantity="2"
                  total="1,398"
                />

                {/* 第三列 */}
                <CartCardWeb
                  productImg={productImg3}
                  title="牛氣補補能量盒"
                  price="699"
                  quantity="1"
                  total="699"
                />

                {/* 表格手機版 */}
                {/* 第一列 */}
                <CartCardPhone
                  productImg={productImg1}
                  title="新手爸媽安心組"
                  price="699"
                  quantity="3"
                  total="2,097"
                />

                {/* 第二列 */}
                <CartCardPhone
                  productImg={productImg2}
                  title="青春汪能量補給包"
                  price="699"
                  quantity="2"
                  total="1,398"
                />

                {/* 第三列 */}
                <CartCardPhone
                  productImg={productImg3}
                  title="牛氣補補能量盒"
                  price="699"
                  quantity="1"
                  total="699"
                />
              </div>

              {/* 選擇訂閱期數 */}
              <div className="col-table-6 col-12-sm mb-56-sm">
                <div className="px-16-sm">
                  <h5 className="mb-5 ls-5 text-center-sm">選擇訂閱期數</h5>
                  <div
                    className="px-0 py-0 w-100 d-flex d-block-sm gap-4"
                    role="group"
                    aria-label="Basic radio toggle button group"
                  >
                    {/* 1 個月 */}
                    <input
                      type="radio"
                      className="btn-check"
                      name="subscription-period"
                      id="one-month"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-primary btn-diet px-0 py-3 mb-8-sm w-25 w-100-sm"
                      htmlFor="one-month"
                      style={{ height: "48px" }}
                    >
                      1 個月
                    </label>

                    {/* 3 個月 */}
                    <input
                      type="radio"
                      className="btn-check"
                      name="subscription-period"
                      id="three-month"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-primary btn-diet px-0 py-3 mb-8-sm w-25 w-100-sm"
                      htmlFor="three-month"
                      style={{ height: "48px" }}
                    >
                      3 個月
                    </label>

                    {/* 6 個月 */}
                    <input
                      type="radio"
                      className="btn-check"
                      name="subscription-period"
                      id="six-month"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-primary btn-diet px-0 py-3 mb-8-sm w-25 w-100-sm"
                      htmlFor="six-month"
                      style={{ height: "48px" }}
                    >
                      6 個月
                    </label>

                    {/* 12 個月 */}
                    <input
                      type="radio"
                      className="btn-check"
                      name="subscription-period"
                      id="twelve-month"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-primary btn-diet px-0 py-3 w-25 w-100-sm"
                      htmlFor="twelve-month"
                      style={{ height: "48px" }}
                    >
                      12 個月
                    </label>
                  </div>
                </div>
              </div>

              {/* 訂單合計網頁版 */}
              <div className="col-table-4 d-none-sm">
                <h5 className="mb-5 ls-5 text-center-sm">訂單合計</h5>
                <div
                  className="total-bg px-5 py-9-5"
                  style={{ height: "48px" }}
                >
                  <p className="total-text fw-bold text-end">
                    每月<span className="fs-24 fw-medium px-2">$4,194</span>
                  </p>
                </div>
              </div>

              {/* 訂單合計手機版 */}
              <div className="col-12-sm d-none-min-sm mb-24-sm">
                <div className="px-16-sm">
                  <div className="total-bg d-flex justify-content-between align-items-center px-5 py-4">
                    <h6 className="ls-5">訂單合計</h6>
                    <p className="total-text fw-bold fs-16-sm text-end">
                      每月<span className="fs-24 fw-medium px-2">$4,194</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 儲存按鈕手機版 */}
            <div className="text-center d-none-min-sm px-5-5-sm">
              <div className="row">
                <div className="col-6-sm">
                  <Link
                    className="btn btn-primary rounded-pill btn-active-white ls-5 fs-18-sm fw-medium-sm px-38-sm"
                    to="/pet-info"
                    role="button"
                  >
                    繼續訂閱
                  </Link>
                </div>
                <div className="col-6-sm">
                  <Link
                    className="btn btn-primary rounded-pill btn-active ls-5 fs-18-sm fw-medium-sm px-38-sm"
                    to="/checkout"
                    role="button"
                  >
                    確認結帳
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 儲存按鈕網頁版 */}
        <div className="text-center d-none-sm">
          <Link
            className="btn btn-primary rounded-pill btn-active-white fs-18-sm fw-medium-sm ls-10-sm px-40 me-6 me-24-sm"
            to="/pet-info"
            role="button"
          >
            繼續訂閱
          </Link>
          <Link
            className="btn btn-primary rounded-pill btn-active fs-18-sm fw-medium-sm ls-10-sm px-40"
            to="/checkout"
            role="button"
          >
            確認結帳
          </Link>
        </div>
      </main>
    </>
  );
}

export default Cart;
