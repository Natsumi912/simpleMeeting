import { FaTimes } from "react-icons/fa";
import { useDashboardContext } from "../pages/DashboardLayout.jsx";
import Wrapper from "../assets/wrappers/SmallSidebar.js";
import Logo from "./Logo";
import NavLinks from "./NavLinks.jsx";

// モバイル版サイドバー
const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
