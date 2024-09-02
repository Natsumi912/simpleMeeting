import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

// 会議情報を削除
export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/events/${params.id}`);
    toast.success("会議情報が削除されました");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect("/dashboard/all-events");
};
