import { Form, redirect, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage.js";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";

// フォームデータを取得し,ユーザーのログインリクエストを送信
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("ログインしました");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

// ログインページ
const Login = () => {
  const navigate = useNavigate();
  // ユーザー登録なしでも使えるようにテストユーザーを作成
  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("閲覧のみ可能です");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  // ログインレイアウト
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" labelText="メールアドレス" />
        <FormRow type="password" name="password" labelText="パスワード" />
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          閲覧のみ
        </button>
        <p>
          ユーザー登録はこちらから
          <Link to="/register" className="member-btn">
            登録
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
