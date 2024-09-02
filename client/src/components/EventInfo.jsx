import Wrapper from "../assets/wrappers/EventInfo";

// 会議一覧のアイコン設定
const EventInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="event-icon">{icon}</span>
      <span className="event-text">{text}</span>
    </Wrapper>
  );
};

export default EventInfo;
