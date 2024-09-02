import NavLinks from "./NavLinks.jsx";
import Logo from "../components/Logo.jsx";
import Wrapper from "../assets/wrappers/BigSidebar.js";
import { useDashboardContext } from "../pages/DashboardLayout.jsx";

// PC版サイドバー
const BigSidebar = () => {
  const { showSidebar } = useDashboardContext() || {};
  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
