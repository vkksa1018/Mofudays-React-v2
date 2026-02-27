import { Bone } from "lucide-react";

export default function TreatTitle({ flash }) {
  return (
    <section className="admin-pages__title mb-5">
      <div className="admin-pages__titleCard">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb small mb-2">
            <li className="breadcrumb-item">後台管理</li>
            <li className="breadcrumb-item">庫存管理</li>
            <li className="breadcrumb-item active" aria-current="page">
              零食資料
            </li>
          </ol>
        </nav>

        <div className="d-flex align-items-start gap-3">
          <div className="admin-pages__titleIcon">
            <Bone size={28} />
          </div>
          <div>
            <h1 className="admin-pages__titleText m-0">零食資料</h1>
            <div className="admin-pages__titleSub mt-1">
              針對零食資料進行查詢、新增、修改與停用。
            </div>
          </div>
        </div>
      </div>

      {flash && (
        <div className={`alert alert-${flash.type} py-2 mt-3`} role="alert">
          {flash.message}
        </div>
      )}
    </section>
  );
}