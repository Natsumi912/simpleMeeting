import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout, Landing, Register, Login, DashboardLayout, Error, AddEvent, AllEvents, EditEvent, Profile, Admin } from "./pages";

// action設定
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addEventAction } from "./pages/AddEvent";
import { action as editEventAction } from "./pages/EditEvent";
import { action as deleteEventAction } from "./pages/DeleteEvent";
import { action as profileAction } from "./pages/Profile";
// loader設定
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allEventsLoader } from "./pages/AllEvents";
import { loader as editEventLoader } from "./pages/EditEvent";
import { loader as adminLoader } from "./pages/Admin";
// ダークモード設定
// eslint-disable-next-line
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};
checkDefaultTheme();

// ルーター設定
const router = createBrowserRouter([
  {
    // デフォルトページ
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        // デフォルトコンポーネント
        index: true,
        element: <Landing />,
      },
      {
        // 登録ページ
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        // ログインページ
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        // ダッシュボードページ
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            // 会議を追加ページ(ダッシュボードのデフォルトページ)
            index: true,
            element: <AddEvent />,
            action: addEventAction,
          },
          {
            // 会議予定検索ページ
            path: "all-events",
            element: <AllEvents />,
            loader: allEventsLoader,
          },
          {
            // 会議予定編集
            path: "edit-event/:id",
            element: <EditEvent />,
            loader: editEventLoader,
            action: editEventAction,
          },
          {
            // 会議予定削除
            path: "delete-event/:id",
            action: deleteEventAction,
          },
          {
            // プロフィールページ
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            // 管理者ページ
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
