import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import Wrapper from "../assets/wrappers/Event";
import EventInfo from "./EventInfo";

day.extend(advancedFormat);
day.extend(utc);

// 会議情報画面
const Event = ({ _id, about, department, moderator, eventStatus, eventPlace, startDate }) => {
  // 日時フォーマット
  const formattedStartDate = day(startDate).format("YYYY/MM/DD HH:mm");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{department.charAt(0)}</div>
        <div className="info">
          <h5>{about}</h5>
          <p>{department}</p>
        </div>
      </header>
      {/* 会議内容 */}
      <div className="content">
        <div className="content-center">
          <EventInfo icon={<FaLocationArrow />} text={moderator} />
          <EventInfo icon={<FaCalendarAlt />} text={formattedStartDate} />
          <EventInfo icon={<FaBriefcase />} text={eventPlace} />
          <div className={`status ${eventStatus}`}>{eventStatus}</div>
        </div>
        {/* 編集または削除ボタン */}
        <footer className="actions">
          <Link to={`../edit-event/${_id}`} className="btn edit-btn">
            編集
          </Link>
          <Form method="post" action={`../delete-event/${_id}`}>
            <button type="submit" className="btn delete-btn">
              削除
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Event;
