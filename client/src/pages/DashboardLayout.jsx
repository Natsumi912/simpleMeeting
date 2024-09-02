import { createContext, useContext, useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/Dashboard.js";
import { Navbar, BigSidebar, SmallSidebar } from "../components";
import { checkDefaultTheme } from "../App.jsx";
import customFetch from "../utils/customFetch.js";

// 現在のユーザーデータを取得
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};
// コンテクスト作成
const DashboardContext = createContext();

// 会議室管理システムページ
const DashboardLayout = () => {
  const { user } = useLoaderData(); // 現在のユーザーオブジェクトを表示
  const navigate = useNavigate(); // 画面遷移
  const [showSidebar, setShowSidebar] = useState(false); // サイドバーの表示切り替え
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme()); // ダークモード切り替え
  // ダークモード設定
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };
  // サイドバー切り替え設定
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  // ログアウト設定
  const logoutUser = async () => {
    navigate("/"); // デフォルト画面に遷移
    await customFetch.get("/auth/logout");
    toast.success("ログアウトしました");
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
// 作成したコンテクストをエキスポート
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
