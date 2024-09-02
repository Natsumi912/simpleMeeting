import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useDashboardContext } from "../pages/DashboardLayout.jsx";
import Wrapper from "../assets/wrappers/ThemeToggle.js";

// ダークモードとライトモードの切り替え設定
const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return <Wrapper onClick={toggleDarkTheme}>{isDarkTheme ? <BsFillSunFill className="toggle-icon" /> : <BsFillMoonFill />}</Wrapper>;
};

export default ThemeToggle;
