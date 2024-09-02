import Event from "./Event";
import PageBtnContainer from "./PageBtnContainer";
import Wrapper from "../assets/wrappers/EventsContainer";
import { useAllEventsContext } from "../pages/AllEvents";

// 会議一覧画面の全体設定
const EventsContainer = () => {
  const { data } = useAllEventsContext();
  const { events, totalEvents, numOfPages } = data;
  // 何も予定がない場合
  if (events.length === 0) {
    return (
      <Wrapper>
        <h2>予定はまだありません</h2>
      </Wrapper>
    );
  }
  // ページ情報レイアウト
  return (
    <Wrapper>
      <h5>
        {totalEvents} event{events.length > 1 && "s"} found
      </h5>
      <div className="events">
        {events.map((event) => {
          return <Event key={event._id} {...event} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default EventsContainer;
