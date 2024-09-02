import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage.js";
import { Link } from "react-router-dom";
import Logo from "../components/Logo.jsx";

// ランディングページ
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            会議を<span>簡単に</span>
          </h1>
          <p>会議室予約管理システム</p>
          <Link to="/register" className="btn register-link">
            ユーザー登録
          </Link>
          <Link to="/login" className="btn">
            ログイン | 閲覧のみ
          </Link>
        </div>
        <img src={main} alt="update events" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
