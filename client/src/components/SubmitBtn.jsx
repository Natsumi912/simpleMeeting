import { useNavigation } from "react-router-dom";

// 送信ボタン
const SubmitBtn = ({ formBtn }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "送信中";
  return (
    <button type="submit" className={`btn btn-block ${formBtn && "form-btn"}`} disabled={isSubmitting}>
      {isSubmitting ? "送信中..." : "送信"}
    </button>
  );
};

export default SubmitBtn;
