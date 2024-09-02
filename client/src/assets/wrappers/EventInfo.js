import styled from "styled-components";

// イベント一覧表示のアイコンに関するスタイル
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .event-icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--text-secondary-color);
    }
  }
  .event-text {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing); /* 1px */
  }
`;

export default Wrapper;
