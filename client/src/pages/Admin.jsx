import { useLoaderData, redirect } from "react-router-dom";
import { CgUserlane, CgAlbum } from "react-icons/cg";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { StatItem } from "../components";

// [管理者向け]統計情報を取得
export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("このページへのアクセス権限がありません");
    return redirect("/dashboard");
  }
};

// 管理者情報ページ
const Admin = () => {
  const { users, events } = useLoaderData();
  return (
    <Wrapper>
      <StatItem title="users" count={users} color="#e9b949" bcg="#fcefc7" icon={<CgUserlane />} />
      <StatItem title="total events" count={events} color="#647acb" bcg="#e0e8f9" icon={<CgAlbum />} />
    </Wrapper>
  );
};

export default Admin;
