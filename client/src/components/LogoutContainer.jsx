import { useState } from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer.js";
import { useDashboardContext } from "../pages/DashboardLayout.jsx";

// ログアウト設定
const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();
  return (
    <Wrapper>
      <button type="button" className="btn logout-btn" onClick={() => setShowLogout(!showLogout)}>
        {/* プロフィール画像が設定済みならその画像を、未設定ならデフォルトのアイコンを表示 */}
        {user.avatar ? <img src={user.avatar} alt="avatar" className="img" /> : <FaUserCircle />}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          ログアウト
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;
