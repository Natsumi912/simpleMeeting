import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout.jsx";
import links from "../utils/links.jsx";

// ナブバーのリンク設定
const NavLinks = ({ isBigSidebar }) => {
  const { user, toggleSidebar } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { path, text, icon } = link;
        const { role } = user;
        // 管理者以外はアクセスできないよう制御
        if (path === "admin" && role !== "admin") return;
        return (
          <NavLink to={path} key={text} className="nav-link" onClick={isBigSidebar ? null : toggleSidebar} end>
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
