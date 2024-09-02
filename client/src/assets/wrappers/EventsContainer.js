import styled from "styled-components";

// イベント一覧を表示するスタイル
const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    /* 限定的に */
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .events {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 1120px) {
    .events {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;

export default Wrapper;
