import { useState, useEffect } from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import customFetch from "../utils/customFetch";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { EVENT_STATUS, EVENT_PLACE } from "../../../utils/constants";
import Wrapper from "../assets/wrappers/DashboardFormPage";

// フォームデータを取得し、会議情報編集に関するリクエストを送信
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/events/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-events");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // 日付のフォーマット調整
  data.startDate = new Date(data.startDate).toISOString();
  try {
    await customFetch.patch(`/events/${params.id}`, data);
    toast.success("編集が完了しました");
    return redirect("/dashboard/all-events");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

// 会議情報を編集
const EditEvent = () => {
  const { event } = useLoaderData();
  const [startDate, setStartDate] = useState(new Date(event.startDate));
  useEffect(() => {
    if (event.startDate) {
      setStartDate(new Date(event.startDate));
    }
  }, [event.startDate]);
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">予約を編集</h4>
        <div className="form-center">
          {/* 変更内容 */}
          <FormRow type="text" labelText="会議内容" name="about" defaultValue={event.about} />
          <FormRow type="text" labelText="部署名" name="department" defaultValue={event.department} />
          <FormRow type="text" labelText="予約者" name="moderator" defaultValue={event.moderator} />
          <FormRowSelect name="eventStatus" labelText="予約状況" defaultValue={event.eventStatus} list={Object.values(EVENT_STATUS)} />
          <FormRowSelect name="eventPlace" labelText="会議場所" defaultValue={event.eventPlace} list={Object.values(EVENT_PLACE)} />
          {/* 開始日時 */}
          <div className="form-row">
            <label htmlFor="startDate">開始日時</label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="yyyy/MM/dd HH:mm" name="startDate" className="calendar-input" required />
          </div>
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditEvent;
