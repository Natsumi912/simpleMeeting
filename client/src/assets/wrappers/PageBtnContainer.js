import styled from "styled-components";

// ページボタンのスタイル
const Wrapper = styled.section`
  height: 6rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;
  .btn-container {
    background: var(--background-secondary-color);
    border-radius: var(--border-radius); /* 0.25rem */
    display: flex;
  }
  .page-btn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500); /* #2cb1bc */
    border-radius: var(--border-radius); /* 0.25rem */
    cursor: pointer;
  }
  .active {
    background: var(--primary-500); /* #2cb1bc */
    color: var(--white); /* #fff */
  }
  .prev-btn,
  .next-btn {
    background: var(--background-secondary-color);
    border-color: transparent;
    border-radius: var(--border-radius); /* 0.25rem */

    width: 100px;
    height: 40px;
    color: var(--primary-500); /* #2cb1bc */
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing); /* 1px */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500); /* #2cb1bc */
    color: var(--white); /* #fff */
    transition: var(--transition); /* 0.3s ease-in-out all */
  }
  .dots {
    display: grid;
    place-items: center;
    cursor: text;
  }
`;

export default Wrapper;
