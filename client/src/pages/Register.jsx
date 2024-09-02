import { Form, redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage.js";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";

// フォームデータを取得し,ユーザーの登録リクエストを送信
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("ユーザー登録完了");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

// 登録ページ
const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="lastName" labelText="姓" />
        <FormRow type="text" name="name" labelText="名" />
        <FormRow type="text" name="location" labelText="住所" />
        <FormRow type="email" name="email" labelText="メールアドレス" />
        <FormRow type="password" name="password" labelText="パスワード" />
        <SubmitBtn />
        <p>
          登録済みの方はこちら
          <Link to="/login" className="member-btn">
            ログイン
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
