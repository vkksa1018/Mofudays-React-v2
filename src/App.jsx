import "./pages/Plan/Plan.scss";

import serviceStep1 from "./assets/images/subscribe/service_step_1.svg";
import serviceStep2 from "./assets/images/subscribe/service_step_2.svg";
import planImg from "./assets/images/subscribe/plan-img.png";

const PlanCard = ({ id, title, text }) => {
  return (
    <div
      className="btn-group w-100-sm"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="radio"
        className="btn-check"
        name="recommended-plan"
        id={id}
        autoComplete="off"
      />
      <label
        className="btn btn-primary btn-plan fw-normal py-5 px-5"
        htmlFor={id}
      >
        <div className="d-flex justify-content-between mb-2">
          <p className="fs-6 fw-bold">{title}</p>
          <p className="total-text text-end fs-14">
            <span className="plan-price fw-medium pe-1">$699</span>
            /月
          </p>
        </div>
        <p className="text-brown-300 text-start mb-4">{text}</p>
        <div className="d-flex justify-content-between align-item-center mb-4">
          <div className="include-line my-10-5"></div>
          <p className="fs-14 text-brown-100 mx-5">包含</p>
          <div className="include-line my-10-5"></div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <p className="text-brown-300">零食</p>
          <div className="number-box fw-medium">x3</div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <p className="text-brown-300">保健​罐頭</p>
          <div className="number-box fw-medium">x2</div>
        </div>
        <div className="d-flex justify-content-between">
          <p className="text-brown-300">互動​小​玩​具</p>
          <div className="number-box fw-medium">x2</div>
        </div>
      </label>
    </div>
  );
};
const ProgressBar2 = () => {
  return (
    <div className="d-flex justify-content-between align-items-center flex-col-sm px-110 px-24-sm mb-6 mb-24-sm">
      {/* 標題 */}
      <div className="title py-5-5-sm mb-32-sm">
        <h2 className="fw-bold mb-2 text-center-sm">簡單 2 步驟</h2>
        <p className="fw-bold text-center-sm">為毛孩送上每月一盒溫暖心意</p>
      </div>

      {/* 進度條 */}
      <div className="step d-flex align-items-center align-item-start-sm">
        <div className="step-item">
          <img
            src={serviceStep1}
            alt="step_1"
            className="mx-auto d-block mb-2 mb-10-sm"
          />
          <p className="text-center fs-14">填寫毛孩資料</p>
        </div>
        <div className="step-line"></div>
        <div className="step-item">
          <img
            src={serviceStep2}
            alt="step_2"
            className="mx-auto d-block mb-2 mb-10-sm"
          />
          <p className="text-center fs-14">查看方案</p>
        </div>
      </div>
    </div>
  );
};
const ActiveButtonPhone = () => {
  return (
    <div className="text-center d-none-min-sm px-5-5-sm">
      <div className="row">
        <div className="col-6-sm">
          <a
            className="btn btn-primary rounded-pill btn-active-white ls-5 fs-18-sm fw-medium-sm px-38-sm"
            href="./pet-info.html"
            role="button"
          >
            回上一頁
          </a>
        </div>
        <div className="col-6-sm">
          <a
            className="btn btn-primary rounded-pill btn-active ls-5 fs-18-sm fw-medium-sm px-38-sm"
            href="./checkout.html"
            role="button"
          >
            儲存並繼續
          </a>
        </div>
      </div>
    </div>
  );
};
const ActiveButtonWeb = () => {
  return (
    <div className="text-center d-none-sm">
      <a
        className="btn btn-primary rounded-pill btn-active-white fs-18-sm fw-medium-sm ls-10-sm px-40 me-6 me-24-sm"
        href="./pet-info.html"
        role="button"
      >
        回上一頁
      </a>
      <a
        className="btn btn-primary rounded-pill btn-active fs-18-sm fw-medium-sm ls-10-sm px-40"
        href="./checkout.html"
        role="button"
      >
        儲存並繼續
      </a>
    </div>
  );
};

function App() {
  return (
    <>
      <main className="plan py-11 pt-80-sm pb-0-sm">
        <div className="container">
          {/* 標題進度條 */}
          <ProgressBar2 />

          {/* 推薦方案 */}
          <div className="card-bg py-9 px-12-sm mb-6 mb-0-sm">
            <div className="row justify-content-center">
              {/* 標題 */}
              <div className="col-10">
                <h4 className="fw-bold text-primary-500 text-center-sm mb-40">
                  選擇方案
                </h4>
              </div>

              <div className="col-10 d-flex gap-5">
                {/* 左邊欄位 */}
                <div className="plan-title justify-content-center px-26">
                  <img src={planImg} alt="推薦方案" className="mb-32" />
                  <div>
                    <h5 className="mb-4 ls-5 text-center-sm">
                      給​毛孩​的​三種​驚喜​提案
                    </h5>
                    <p className="text-brown-300">
                      為​了​讓​你​能​更​輕​鬆​找到​最​適​合毛孩​的​盒子，
                      <br />
                      我​們​依照​內​容物、​用途與​毛孩特性​整理​出三​種​不同​的​訂閱​組合。
                      <br />
                      ​無論​你​是​新手​爸媽，​或是​想給​毛孩​更​多​陪伴，​我​們​都​準備​了​合適​的​選擇。​
                    </p>
                  </div>
                </div>

                {/* 右邊欄位 */}
                <div className="plan-item">
                  {/* 方案一 */}
                  <PlanCard
                    id="plan1"
                    title="新手爸媽安心組"
                    text="給​第一​次​養毛孩​的​你，​一​份​剛​剛好​的​照顧"
                  ></PlanCard>
                  {/* 方案二 */}
                  <PlanCard
                    id="plan2"
                    title="活力​成長​探索組"
                    text="給​每​天​都​充滿​活力、​喜歡​探索​世界​的​孩子​"
                  ></PlanCard>
                  {/* 方案三 */}
                  <PlanCard
                    id="plan3"
                    title="豪華寵愛​禮物​組"
                    text="每​月​為毛​孩​送​上​一​份​滿滿​儀式​感​的​大禮​​"
                  ></PlanCard>
                </div>
              </div>
            </div>

            {/* 儲存按鈕手機版 */}
            <ActiveButtonPhone />
          </div>

          {/* 儲存按鈕網頁版 */}
          <ActiveButtonWeb />
        </div>
      </main>
    </>
  );
}

export default App;
