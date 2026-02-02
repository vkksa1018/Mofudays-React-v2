import {useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from "bootstrap";

// scss載入
// import "./userCenter.scss";

// 圖片載入
import heroYellowPattern from "../../assets/images/userCenter/hero_yellow_pattern.png";
import heroGreenPattern from "../../assets/images/userCenter/hero_green_pattern.png";
import shippingCart from "../../assets/images/userCenter/member_shipping_cart.png";
import aboutBg from "../../assets/images/userCenter/about-bg.png";
import waitingDog from "../../assets/images/userCenter/member_waiting_dog.png";
import petToy from "../../assets/images/userCenter/pet-toy.png";
import petSnack from "../../assets/images/userCenter/pet_snack.png";

// 主元件
export default function UserInfo() {
  useEffect(() => {
    document.title = "會員中心";
  }, []);

  return (
    <main className="member-center position-relative mb-80">
      <div className="container">
        {/* 裝飾圖：先確定你圖片放哪裡（建議 public/assets/...） */}
        <img
          src={heroYellowPattern}
          alt="黃色裝飾"
          className="position-absolute yellow-patten-1 z-3"
        />
        <img
          src={heroGreenPattern}
          alt="綠色裝飾"
          className="position-absolute green-patten-1 me-0 z-3"
        />

        <div className="row justify-content-center">
          <div className="col-12 col-md-10 position-relative">
            {/* tab區塊 */}
            <ul
              className="nav nav-pills d-flex align-items-end"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item me-16" role="presentation">
                <button
                  className="btn button-outline-primary btn-member active rounded-pill"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="true"
                >
                  <span className="icon-user-round-pen align-bottom"></span>
                  <span className="ms-2">會員資料</span>
                </button>
              </li>

              <li className="nav-item me-16" role="presentation">
                <button
                  className="btn button-outline-primary btn-member rounded-pill"
                  id="pills-orderlists-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-orderlists"
                  type="button"
                  role="tab"
                  aria-controls="pills-orderlists"
                  aria-selected="false"
                >
                  <span className="icon-receipt-text align-bottom"></span>
                  <span className="ms-2">訂單管理</span>
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="btn button-outline-primary btn-member rounded-pill"
                  id="pills-exclusives-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-exclusives"
                  type="button"
                  role="tab"
                  aria-controls="pills-exclusives"
                  aria-selected="false"
                >
                  <span className="icon-ticket-check align-bottom"></span>
                  <span className="ms-2">會員專屬活動</span>
                </button>
              </li>
            </ul>

            {/* 頁面內容 */}
            <div
              className="tab-content p-48 bg-yellow bg-radius py-40 px-55"
              id="pills-tabContent"
            >
              {/* tab-會員資料 */}
              <div
                className="member-data tab-pane fade show active"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
                tabIndex={0}
              >
                <form className="needs-validation" noValidate>
                  <div className="mb-40">
                    <h2 className="h h2 text-primary-500 mt-16 mb-32">
                      <span className="icon-user me-2"></span>會員資料
                    </h2>

                    <div className="mb-56 ps-8 position-relative">
                      <label htmlFor="user-name" className="form-label p1">
                        姓名
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control pe-5"
                          id="user-name"
                          placeholder="請輸入姓名"
                          maxLength={20}
                          required
                        />
                        <i className="icon icon-user-round-pen position-absolute top-50 end-0 translate-middle-y me-3"></i>
                      </div>

                      <div className="valid-tooltip">正確!</div>
                      <div className="invalid-tooltip">
                        姓名不得為空或是超過20個字!
                      </div>
                    </div>

                    <div className="mb-56 ps-8 position-relative">
                      <label htmlFor="user-nick-name" className="form-label p1">
                        暱稱
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control pe-5"
                          id="user-nick-name"
                          placeholder="請輸入暱稱"
                        />
                        <i className="icon icon-file-user position-absolute top-50 end-0 translate-middle-y me-3"></i>
                      </div>
                    </div>

                    <div className="mb-56 ps-8 position-relative">
                      <label htmlFor="birthday" className="form-label p1">
                        生日
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="birthday"
                          placeholder="請輸入生日, 例如: 1991/10/09"
                          required
                        />
                        <i className="icon icon-cake position-absolute top-50 end-0 translate-middle-y me-3"></i>
                      </div>
                      <div className="valid-tooltip">正確!</div>
                      <div className="invalid-tooltip">
                        請輸入正確年月日! 例如: 1991/10/09
                      </div>
                    </div>

                    <div className="mb-56 ps-8 position-relative">
                      <label htmlFor="email" className="form-label p1">
                        Email
                      </label>
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="請輸入電子信箱"
                          autoComplete="email"
                          inputMode="email"
                          required
                        />
                        <div className="icon icon-mail position-absolute top-50 end-0 translate-middle-y me-3"></div>
                      </div>
                      <div className="valid-tooltip">正確!</div>
                      <div className="invalid-tooltip">請輸入正確電子信箱!</div>
                    </div>

                    <div className="mb-56 ps-8 position-relative">
                      <label htmlFor="mobile" className="form-label p1">
                        手機號碼
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="mobile"
                          placeholder="請輸入手機號碼"
                          maxLength={10}
                          required
                        />
                        <i className="icon icon-smartphone position-absolute top-50 end-0 translate-middle-y me-3"></i>
                      </div>
                      <div className="valid-tooltip">正確!</div>
                      <div className="invalid-tooltip">請輸入手機號碼!</div>
                    </div>

                    <div className="mb-56 ps-8">
                      <label className="form-label p1">住家地址</label>

                      <div id="address" className="row g-3 g-lg-4">
                        <div className="col-md-3 position-relative">
                          <select
                            className="form-select"
                            id="city"
                            required
                            defaultValue=""
                          >
                            <option disabled value="">
                              縣/市
                            </option>
                            <option>台北市</option>
                            <option>台中市</option>
                            <option>高雄市</option>
                          </select>
                          <div className="invalid-tooltip">請選擇縣/市!</div>
                        </div>

                        <div className="col-md-3 position-relative">
                          <input
                            type="text"
                            className="form-control"
                            id="zip"
                            placeholder="郵遞區號"
                            required
                          />
                          <div className="invalid-tooltip">請輸入郵遞區號!</div>
                        </div>

                        <div className="col-md-6 position-relative">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              id="addres"
                              placeholder="地址"
                              required
                            />
                            <div className="icon icon-map-pin-house position-absolute top-50 end-0 translate-middle-y me-3"></div>
                          </div>
                          <div className="invalid-tooltip">請輸入地址!</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 送貨資料 */}
                  <div className="shipping-info mb-4 position-relative">
                    <h2 className="h h2 text-primary-500 mb-32">
                      <span className="icon-shopping-bag me-2"></span>送貨資料
                    </h2>

                    <img
                      src={shippingCart}
                      alt="行進中的貨車圖"
                      className="position-absolute img-shipping-cart img-shake top-0 end-0 z-2"
                    />
                    <img
                      src={aboutBg}
                      alt="黃色底框"
                      className="position-absolute img-shipping-cart img-shake top-0 end-0 z-1"
                    />
                    <img
                      src={waitingDog}
                      alt="等待中的小狗狗"
                      className="position-absolute img-waiting-dog transform-x img-shake top-1 end-1 z-1"
                    />

                    <div className="mb-3 ps-8">
                      <label className="form-label p1">送達地址</label>

                      <div id="shipping-address" className="row g-3 g-lg-4">
                        <div className="col-md-3 position-relative">
                          <select
                            className="form-select"
                            id="shipping-city"
                            required
                            defaultValue=""
                          >
                            <option disabled value="">
                              縣/市
                            </option>
                            <option>台北市</option>
                            <option>台中市</option>
                            <option>高雄市</option>
                          </select>
                          <div className="invalid-tooltip">請選擇縣/市!</div>
                        </div>

                        <div className="col-md-3 position-relative">
                          <input
                            type="text"
                            className="form-control"
                            id="shipping-zip"
                            placeholder="郵遞區號"
                            required
                          />
                          <div className="invalid-tooltip">請輸入郵遞區號!</div>
                        </div>

                        <div className="col-md-6 position-relative">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              id="shipping-addr"
                              placeholder="地址"
                              required
                            />
                            <div className="icon icon-map-pin-house position-absolute top-50 end-0 translate-middle-y me-3"></div>
                          </div>
                          <div className="invalid-tooltip">請輸入送達地址!</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mt-80">
                    <button
                      type="button"
                      className="btn btn-save rounded-pill align-bottom"
                    >
                      存檔
                    </button>
                  </div>
                </form>
              </div>

              {/* tab-訂閱資料 */}
              <div
                className="member-orderlist tab-pane fade mt-16"
                id="pills-orderlists"
                role="tabpanel"
                aria-labelledby="pills-orderlists-tab"
                tabIndex={0}
              >
                {/* 內層 tabs：總覽 / 未結帳 / 已結帳 */}
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active p1 fw-500"
                      id="all-orderlist-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#all-orderlist-pane"
                      type="button"
                      role="tab"
                      aria-controls="all-orderlist-pane"
                      aria-selected="true"
                    >
                      總覽
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link p1 fw-500"
                      id="not-paid-orderlist-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#not-paid-orderlist-pane"
                      type="button"
                      role="tab"
                      aria-controls="not-paid-orderlist-pane"
                      aria-selected="false"
                    >
                      未結帳
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link p1 fw-500"
                      id="paid-orderlist-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#paid-orderlist-pane"
                      type="button"
                      role="tab"
                      aria-controls="paid-orderlist-pane"
                      aria-selected="false"
                    >
                      已結帳
                    </button>
                  </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                  {/* 總覽 */}
                  <div
                    className="tab-pane fade show active orderlist-table-wrap"
                    id="all-orderlist-pane"
                    role="tabpanel"
                    aria-labelledby="all-orderlist-tab"
                    tabIndex={0}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">購買時間</th>
                          <th scope="col">名稱/編號</th>
                          <th scope="col">單價</th>
                          <th scope="col">數量</th>
                          <th scope="col">總金額</th>
                          <th scope="col">預計最晚出貨日</th>
                          <th scope="col">訂單狀態</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="row">2025/08/10</td>
                          <td>
                            <a href="#">
                              新手爸媽安心組
                              <br />
                              <span className="order-number">
                                訂單編號 #00003
                              </span>
                            </a>
                          </td>
                          <td>$699</td>
                          <td>3</td>
                          <td>$2097</td>
                          <td>-</td>
                          <td>待結帳</td>
                        </tr>

                        <tr>
                          <td scope="row">2025/08/09</td>
                          <td>
                            <a href="#">
                              青春汪能量補給包
                              <br />
                              <span className="order-number">
                                訂單編號 #00002
                              </span>
                            </a>
                          </td>
                          <td>$699</td>
                          <td>2</td>
                          <td>$1398</td>
                          <td>2025/08/12</td>
                          <td>運送中</td>
                        </tr>

                        <tr>
                          <td scope="row">2025/08/03</td>
                          <td>
                            <a href="#">
                              牛氣補補能量盒
                              <br />
                              <span className="order-number">
                                訂單編號 #00001
                              </span>
                            </a>
                          </td>
                          <td>$699</td>
                          <td>1</td>
                          <td>$1699</td>
                          <td>2025/08/06</td>
                          <td>2025/08/05已取貨</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* 未結帳 */}
                  <div
                    className="tab-pane fade orderlist-table-wrap"
                    id="not-paid-orderlist-pane"
                    role="tabpanel"
                    aria-labelledby="not-paid-orderlist-tab"
                    tabIndex={0}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">購買時間</th>
                          <th scope="col">名稱/編號</th>
                          <th scope="col">單價</th>
                          <th scope="col">數量</th>
                          <th scope="col">總金額</th>
                          <th scope="col">預計最晚出貨日</th>
                          <th scope="col">訂單狀態</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="row">2025/08/10</td>
                          <td>
                            <a href="#">
                              新手爸媽安心組
                              <br />
                              <span className="order-number">
                                訂單編號 #00003
                              </span>
                            </a>
                          </td>
                          <td>$699</td>
                          <td>3</td>
                          <td>$2097</td>
                          <td>-</td>
                          <td>待結帳</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* 已結帳 */}
                  <div
                    className="tab-pane fade orderlist-table-wrap"
                    id="paid-orderlist-pane"
                    role="tabpanel"
                    aria-labelledby="paid-orderlist-tab"
                    tabIndex={0}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">購買時間</th>
                          <th scope="col">名稱/編號</th>
                          <th scope="col">單價</th>
                          <th scope="col">數量</th>
                          <th scope="col">總金額</th>
                          <th scope="col">預計最晚出貨日</th>
                          <th scope="col">訂單狀態</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="row">2025/08/09</td>
                          <td>
                            <a href="#">
                              青春汪能量補給包
                              <br />
                              <span className="order-number">
                                訂單編號 #00002
                              </span>
                            </a>
                          </td>
                          <td>$699</td>
                          <td>2</td>
                          <td>$1398</td>
                          <td>2025/08/12</td>
                          <td>運送中</td>
                        </tr>

                        <tr>
                          <td scope="row">2025/08/03</td>
                          <td>
                            <a href="#">
                              牛氣補補能量盒
                              <br />
                              <span className="order-number">
                                訂單編號 #00001
                              </span>
                            </a>
                          </td>
                          <td>$699</td>
                          <td>1</td>
                          <td>$1699</td>
                          <td>2025/08/06</td>
                          <td>已取貨(2025/08/05)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 裝飾圖 */}
                <div>
                  <div className="d-flex justify-content-end mt-48">
                    <img
                      src={petToy}
                      alt="寵物玩具圖, 包含狗骨頭和兩個球"
                      className="img-pet-toy img-shake"
                    />
                    <img
                      src={petSnack}
                      alt="寵物點心包"
                      className="img-pet-snack img-shake"
                    />
                  </div>
                </div>

                {/* pagination：先靜態，下一步再接 state */}
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center align-bottom mt-16 mb-32">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div
                className="tab-pane fade theme-event"
                id="pills-exclusives"
                role="tabpanel"
                aria-labelledby="pills-exclusives-tab"
                tabIndex={0}
              >
                <MemberExclusives />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// 會員專屬優惠內容比較多先拆出來做
function MemberExclusives() {
  return (
    <>
      {/* 會員專屬優惠 - 毛寶貝開箱秀 => 載入開箱秀元件 */}
      <section className="unbox mt-16 mb-132 position-relative">
        <img
          src="/assets/images/member/member_open_box.png"
          alt="毛寶貝開箱秀活動圖"
          className="position-absolute end-0 img-open-box img-shake"
        />

        <h2 className="h2 text-center unbox-title mb-12">毛寶貝開箱秀</h2>
        <h4 className="h4 text-center text-secondary-500 mb-4">秀出你的小可愛!</h4>
        <p className="mb-36 text-center text-teritary-500 p2 fw-500">
          拍下寶貝開箱的照片或影片並投稿分享，即有機會獲得會員點數與專屬小禮物哦~
        </p>

        <div className="row row-cols-1 row-cols-md-4 row-cols-sm-1 g-4 mb-24">
          <UnboxCarousel />
        </div>
      </section>

      {/* 會員限定優惠 */}
      <section className="exclusive mb-132">
        <div className="exclusive-content">
          <div className="auto-show">
            <div className="d-flex justify-content-center align-items-center gap-2">
              <img
                src="/assets/images/member/member_wave.png"
                alt="小扇子裝飾圖"
                className="img-wave me-16 img-shake img-reveal"
              />

              <div>
                <h2 className="h2 exclusive-title text-center">會員限定優惠</h2>
                <h4 className="h4 text-center text-secondary-500">夏日感謝祭</h4>
                <h4 className="h4 text-center text-secondary-500 mb-4">會員專屬優惠活動</h4>
              </div>

              <img
                src="/assets/images/member/member_firework.png"
                alt="煙火裝飾圖"
                className="img-firework-1 ml-16 img-shake img-reveal"
              />
            </div>

            <p className="text-center text-teritary-500 fw-500 p2 mb-4">
              每一位支持「毛日和」的你，都是我們最想感謝的存在！
            </p>
          </div>

          <div className="card mb-3 card-hover p-20 auto-show">
            <div className="row g-0">
              <div className="col-md-5 order-2 order-md-1">
                <div className="card-body text-center pt-200 d-flex flex-column justify-content-center align-items-center">
                  <h3 className="h4 card-title mb-4 fw-900">即日起續訂就送限定折扣!</h3>
                  <p className="card-text p3 mb-4 fw-500">
                    還有機會免費獲得「夏季限定沁涼盒」
                    <br />
                    邀請你和毛孩一起享受專屬得療癒時光!
                  </p>
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary rounded-pill btn-keep-subscribe" type="button">
                      立即續訂
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-7 order-1 order-md-2">
                <div className="img-wrap h-100">
                  <img
                    src="/assets/images/member/member_summer_exclusive.png"
                    className="img-fluid rounded-start summer_exclusive"
                    alt="夏日感謝祭活動圖"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 主題活動 */}
      <section className="theme-event">
        <div className="auto-show">
          <div className="position-relative">
            <img
              src="/assets/images/member/Illustration-feed.png"
              alt="飼料裝飾圖"
              className="img-feed img-shake img-reveal"
            />
            <h2 className="h2 text-center mb-2 text-primary-500 mb-4 title-lined">主題活動</h2>
            <h4 className="h4 text-center text-secondary-500 mb-4">專屬你與毛孩的特別時光 !</h4>
            <img
              src="/assets/images/member/member_play.png"
              alt="主人與狗狗互動圖"
              className="img-play img-shake img-reveal"
            />
          </div>

          <p className="mb-36 text-center text-teritary-500 p2 fw-500">
            9月~10月的會員專屬毛孩派對開跑啦！一起熱血 Show 出愛、探索寵物心聲，還有驚喜福袋等你來拿！
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          <ThemeEventCard
            img="/assets/images/member/theme_event_1.png"
            alt="毛​​麻吉​捐血犬活​動圖"
            title="毛​​麻吉​捐血犬活​動來啦!"
            date="活動日期:  9/19 - 20"
            desc="現​場將​提供​獸醫​健檢、​健康​講座、​免​費狂犬​病​疫苗、​抽好禮，​還有​限量​10​組免​費血檢​名​額！​一起​「Show出熱血」，​加入​捐血​犬行列​吧！​"
            href="/member_activities_1.html"
          />
          <ThemeEventCard
            img="/assets/images/member/theme_event_2.png"
            alt="寵物溝通師活動圖"
            title="想更了解毛寶貝嗎?"
            date="活動日期:  9/26 - 27"
            desc={`狗勾其實也常使用尾巴、耳朵等等肢體語言，來向我們傳遞各式各樣的訊息!
特別邀請狗兒行為諮詢師 PAPA 老師來分享，快來一起聽懂、看懂牠們到底在想甚麼吧！`}
            href="/member_activities_2.html"
          />
          <ThemeEventCard
            img="/assets/images/member/theme_event_3.png"
            alt="福袋交換日活動圖"
            title="會員限定福袋互換日!"
            date="活動日期:  9/26 - 27"
            desc={`這個月，我們將舉辦一次「毛孩福袋互換」，參加者將獲得一份隨機的驚喜福袋！
裡面可能有別人家毛孩最愛的玩具或點心，也許會是你的寶貝的新歡！`}
            footnote="📌本次活動採會員限定登記制，每人限額登記一份。"
            href="/member_activities_3.html"
          />
        </div>
      </section>
    </>
  );
}

/** 開箱秀元件：依螢幕寬度 1 / 2 / 4 張一頁 */
function UnboxCarousel() {
  const carouselRef = useRef(null);
  const bsRef = useRef(null);

  const [groupSize, setGroupSize] = useState(getGroupSize());

  // 卡片資料
  const cards = useMemo(
    () => [
      {
        name: "豆豆",
        meta: "柴犬 5 歲",
        img: "/assets/images/member/member_shiba.png",
        imgAlt: "豆豆",
        backTitle: "豆豆",
        backText:
          "「豆豆一看到開箱盒就立刻湊上來，眼神超專注，好像在當檢查官！裡面有小零食、玩具，還有專屬牠的寵物小卡，完全是柴隊長認證過的驚喜組合！」",
      },
      {
        name: "Haru",
        meta: "哈士娃 1 歲",
        img: "/assets/images/member/member_chihwahwa.png",
        imgAlt: "Haru",
        frontImgClass: "object-position-right-center",
        pawClass: "object-position-center",
        backTitle: "Haru",
        backText:
          "「Haru 戴上 Angry Bird 毛帽的同時，也開心迎接自己的驚喜盒！一邊賣萌一邊拆，發現裡面有最愛的小零食、玩具，還有一張專屬小卡，整個活動瞬間變成牠的派對秀啦！」",
      },
      {
        name: "可可",
        meta: "貴賓犬 2 歲",
        img: "/assets/images/member/member_poodle.png",
        imgAlt: "可可",
        backTitle: "可可",
        backText:
          "「可可小小的身影蹲在盒子旁，乖巧地等著開箱。當看到裡面有牠愛的小零食、可愛玩具，還有獨一無二的專屬寵物小卡，眼神都閃閃發亮，彷彿在說：『這是專屬於我的幸福禮物呢 💖』」",
      },
      {
        name: "奶昔",
        meta: "邊境牧羊犬 2 歲",
        img: "/assets/images/member/member_shapper.png",
        imgAlt: "奶昔",
        backTitle: "奶昔",
        backText:
          "「奶昔一如既往地衝在最前面，奔跑的樣子就像把整個草原都踩在腳下 🐾！開箱盒一打開，小零食和玩具立刻成了牠的新目標，而那張專屬的小卡更讓人忍不住想珍藏。這份滿滿的能量，就是牠收到禮物時最真實的笑容！」",
      },
      {
        name: "布丁",
        meta: "巴哥犬 2 歲",
        img: "/assets/images/member/member_pug.png",
        imgAlt: "布丁",
        backTitle: "布丁",
        backText:
          "「布丁最愛湊熱鬧，這次看到開箱盒眼睛都亮了 ✨！小零食、玩具一樣都不能少，還有專屬小卡更是讓主人感動。牠滿足的表情彷彿在說：『這是屬於我的驚喜大禮包！』」",
      },
      {
        name: "阿福",
        meta: "米克斯 4 歲",
        img: "/assets/images/member/member_mix.png",
        imgAlt: "阿福",
        backTitle: "阿福",
        backText:
          "「阿福是一看到開箱盒就立刻衝上來的急先鋒 ！小零食和玩具馬上就被牠盯上，專屬寵物小卡讓主人心裡暖呼呼。果然米克斯的快樂能量，連開箱都特別熱鬧！」",
      },
      {
        name: "雪球 & 雪寶",
        meta: "博美 3 歲 / 3歲",
        img: "/assets/images/member/member_bomei.png",
        imgAlt: "雪球&雪寶",
        backTitle: "雪球(右) & 雪寶(左)",
        backText:
          "「開箱的瞬間，奶油和棉花立刻湊上來，兩顆小雪球擠在一起，一起分享這份驚喜。小零食讓牠們搖著小尾巴，玩具變成了搶來搶去的快樂源泉！」",
      },
      {
        name: "皮蛋",
        meta: "米克斯 7 歲",
        img: "/assets/images/member/member_mix_1.jpg",
        imgAlt: "皮蛋",
        backTitle: "皮蛋",
        backText:
          "「皮蛋一臉專注地守在開箱盒旁，好像在等著主人說一聲『可以開動！』小零食讓牠眼睛一亮，玩具馬上就被叼走，而那張專屬寵物小卡更是讓人心裡滿滿感動!」",
      },
    ],
    []
  );


  const slides = useMemo(() => {
    const out = [];
    for (let i = 0; i < cards.length; i += groupSize) {
      out.push(cards.slice(i, i + groupSize));
    }
    return out;
  }, [cards, groupSize]);

  // resize → 更新 groupSize（含 debounce）
  useEffect(() => {
    let t = null;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setGroupSize(getGroupSize()), 60);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // groupSize / slides 變更後 → 重建 Bootstrap Carousel instance（避免狀態亂掉）
  useEffect(() => {
    if (!carouselRef.current) return;

    if (bsRef.current) {
      bsRef.current.dispose();
      bsRef.current = null;
    }

    bsRef.current = bootstrap.Carousel.getOrCreateInstance(carouselRef.current, {
      interval: false,
      ride: false,
      wrap: true,
    });

    return () => {
      if (bsRef.current) {
        bsRef.current.dispose();
        bsRef.current = null;
      }
    };
  }, [groupSize, slides.length]);

  return (
    <div
      id="petUnboxCarousel"
      ref={carouselRef}
      className="carousel slide w-100"
      data-bs-ride="false"
      data-bs-interval="false"
      data-bs-wrap="true"
    >
      <div className="carousel-indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            data-bs-target="#petUnboxCarousel"
            data-bs-slide-to={idx}
            className={idx === 0 ? "active" : ""}
            aria-current={idx === 0 ? "true" : undefined}
            aria-label={`第 ${idx + 1} 頁`}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {slides.map((group, slideIdx) => (
          <div key={slideIdx} className={`carousel-item ${slideIdx === 0 ? "active" : ""}`}>
            <div className="row g-4">
              {group.map((card) => (
                <UnboxFlipCard key={card.name} card={card} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#petUnboxCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">上一頁</span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#petUnboxCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">下一頁</span>
      </button>
    </div>
  );
}

// 開箱 flip card
function UnboxFlipCard({ card }) {
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <div className="flip-card h-100">
        <div className="flip-inner">
          {/* 正面 */}
          <div className="flip-face flip-front">
            <div className="p-1">
              <img src={card.img} className={`card-img-top ${card.frontImgClass ?? ""}`.trim()} alt={card.imgAlt} />
            </div>
            <div className="d-flex justify-content-between p-16">
              <div>
                <h5 className="card-title mb-1">{card.name}</h5>
                <p className="card-text mb-0 p2">{card.meta}</p>
              </div>
              <img
                src="/assets/images/member/footprint_patten 2.png"
                alt="小腳印"
                className={`img-single-paw ${card.pawClass ?? ""}`.trim()}
              />
            </div>
          </div>

          {/* 背面 */}
          <div className="flip-face flip-back d-flex flex-column justify-content-center align-items-center text-center p-16">
            <h6 className="card-title-back mb-4 fw-700">{card.backTitle}</h6>
            <p className="card-text-back mb-0 p3">{card.backText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 用於調整開箱秀 function
function getGroupSize() {
  const w = window.innerWidth;
  if (w <= 576) return 1;
  if (w < 768) return 2;
  return 4;
}

// 主題活動
function ThemeEventCard({ img, alt, title, date, desc, footnote, href }) {
  return (
    <div className="col">
      <div className="card h-100 theme-event-card p-2 fade-up">
        <img src={img} className="card-img-top mb-6 theme-event-card img-hover-bigger" alt={alt} />
        <div className="card-body">
          <h6 className="card-title h6 fw-700 mb-4">{title}</h6>
          <p className="card-text p3 fw-700 mb-2">{date}</p>

          {String(desc)
            .split("\n")
            .map((line, idx) => (
              <p key={idx} className={`card-text p4 ${idx === 0 ? "mb-1" : ""}`}>
                {line}
              </p>
            ))}

          {footnote ? <small className="fw-700">{footnote}</small> : null}
        </div>

        <a className="text-center" href={href} onClick={(e) => e.preventDefault()}>
          <button className="btn b2 btn-primary rounded-pill btn-reserve" type="button">
            查看詳情
          </button>
        </a>
      </div>
    </div>
  );
}