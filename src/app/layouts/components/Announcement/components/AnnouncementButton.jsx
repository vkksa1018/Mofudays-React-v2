import { useNavigate } from "react-router-dom"; // 引入 navigate

const AnnouncementButton = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const config = isLoggedIn
    ? { text: "會員中心", link: "/member" }
    : { text: "立即註冊", link: "/signup" };

  const handleNavigation = () => {
    navigate(config.link);
  };

  return (
    // 移除 <a> 標籤，改由按鈕 onClick 觸發跳轉
    <button
      type="button"
      className="btn btn-signup py-1 px-3 fw-bold"
      onClick={handleNavigation}
    >
      {config.text}
    </button>
  );
};

export default AnnouncementButton;
