const OrderItem = () => {
  return (
    <>
      <div className="table-container-bg fs-14-sm d-flex py-4 px-4-sm pe-12-sm mb-2">
        {/* 訂閱期數 */}
        <div className="col-table-1-5 d-flex justify-content-center align-items-center">
          3
        </div>
        {/* 品項 */}
        <div className="col-table-4">
          <p className="table-title fw-bold mb-2 mb-4-sm">新手爸媽安心組</p>
          <p className="table-text fw-normal">
            零食 x 3 + 保健罐頭 x 2 + 互動小物 x 2
          </p>
        </div>
        {/* 單價 */}
        <div className="col-table-1-5 d-flex justify-content-center align-items-center">
          $699
        </div>
        {/* 數量 */}
        <div className="col-table-1-5 d-flex justify-content-center align-items-center">
          3
        </div>
        {/* 小計 */}
        <div className="col-table-1-5 d-flex justify-content-center align-items-center">
          $2,097
        </div>
      </div>
    </>
  );
};

export default OrderItem;
