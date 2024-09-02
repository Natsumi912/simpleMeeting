import styled from "styled-components";

// イベント一覧表示に関するスタイル
const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius); /* 0.25rem */
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2); /* 0 4px 6px -1px */
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100); /* #f1f5f9 */
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500); /* #2cb1bc */
    border-radius: var(--border-radius); /* 0.25rem */
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white); /* #fff */
    margin-right: 1.75rem;
  }
  .info {
    h5 {
      line-height: 1.25;
      padding-bottom: 0.5rem;
      @media (max-width: 1120px) {
        font-size: 1.25rem;
      }
    }
    p {
      margin: 0;
      text-transform: capitalize;
      letter-spacing: var(--letter-spacing); /* 1px */
      color: var(--text-secondary-color);
    }
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
    align-items: center;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .status {
    border-radius: var(--border-radius); /* 0.25rem */
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing); /* 1px */
    text-align: center;
    width: 100px;
    height: 30px;
    display: grid;
    align-items: center;
  }
  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }
  .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }
  .edit-btn {
    margin-right: 0.5rem;
  }
`;

export default Wrapper;
