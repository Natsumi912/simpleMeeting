import { Form, useSubmit, Link } from "react-router-dom";
import { useAllEventsContext } from "../pages/AllEvents";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { EVENT_STATUS, EVENT_PLACE } from "../../../utils/constants";
import { FormRow, FormRowSelect } from ".";

// 会議検索設定
const SearchContainer = () => {
  const { searchValues } = useAllEventsContext();
  const { search, eventStatus, eventPlace } = searchValues;
  const submit = useSubmit();
  // ユーザーが入力を終えると、0.5秒後に自動的に検索結果が表示される
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 500);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        <h4 className="form-title">予約検索</h4>
        <div className="form-center">
          <FormRow
            type="search"
            labelText="検索"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="予約状況"
            name="eventStatus"
            list={["all", ...Object.values(EVENT_STATUS)]}
            defaultValue={eventStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="eventPlace"
            labelText="会議場所"
            defaultValue={eventPlace}
            list={["all", ...Object.values(EVENT_PLACE)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="/dashboard/all-events" className="btn form-btn delete-btn">
            検索をリセット
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
