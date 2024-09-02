import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { EVENT_STATUS, EVENT_PLACE } from "../../../utils/constants";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

// フォームデータを取得し、イベント追加に関するリクエストを送信
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // 日付と時間のフォーマット調整
  if (data.startDate) {
    data.startDate = dayjs(data.startDate).format("YYYY-MM-DDTHH:mm:ss");
  }
  try {
    await customFetch.post("/events", data);
    toast.success("会議情報が追加されました");
    return redirect("all-events");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

// 会議を追加ページ
const AddEvent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useOutletContext(); // 更新準備
  // カレンダーを表示
  const handleDateChange = (date) => {
    setStartDate(date);
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">予約フォーム</h4>
        <div className="form-center">
          {/* String部分 */}
          <FormRow type="text" labelText="会議内容" name="about" />
          <FormRow type="text" labelText="部署名" name="department" />
          <FormRow type="text" labelText="予約者" name="moderator" />
          {/* ドロップダウン部分 */}
          <FormRowSelect labelText="予約状況" name="eventStatus" defaultValue={EVENT_STATUS.BOOKED} list={Object.values(EVENT_STATUS)} />
          <FormRowSelect labelText="会議場所" name="eventPlace" defaultValue={EVENT_PLACE.ROOM_A} list={Object.values(EVENT_PLACE)} />
          {/* 開始日時を選択するカレンダー */}
          <div className="form-row">
            <label htmlFor="startDate">開始日時</label>
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="yyyy/MM/dd HH:mm"
              minDate={new Date()}
              className="date-picker-input" // スタイルクラス追加
              name="startDate" // フォームデータ送信用name属性
            />
          </div>
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddEvent;
