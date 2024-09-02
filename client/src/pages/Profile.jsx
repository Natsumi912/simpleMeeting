import { Form, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";

// フォームデータからアバター画像を取得し、プロフィール画像として更新
export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  if (file && file.size > 500000) {
    toast.error("サイズを確認してください");
    return null;
  }
  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("プロフィールの編集が完了しました");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

// プロフィール設定
const Profile = () => {
  const { user } = useOutletContext(); // 更新準備
  const { name, lastName, email, location } = user; // ユーザーデータから個々のフィールドを抽出
  return (
    <Wrapper>
      {/* ファイルアップロード用のフォームを作成 */}
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">プロフィール</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              {/* <label htmlFor="image" className="form-label"> */}
              イメージ画像(0.5MBまで)
            </label>
            <input type="file" id="avatar" name="avatar" className="form-input avatar-btn" accept="image/*" />
          </div>
          {/* フォーム */}
          <FormRow type="text" labelText="姓" name="lastName" defaultValue={lastName} />
          <FormRow type="text" labelText="名" name="name" defaultValue={name} />
          <FormRow type="email" labelText="メールアドレス" name="email" defaultValue={email} />
          <FormRow type="text" labelText="住所" name="location" defaultValue={location} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;