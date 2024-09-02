import styled from "styled-components";

// ログアウトのスタイル
const Wrapper = styled.div`
  position: relative;
  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .dropdown {
    position: absolute;
    left: 0;
    width: 100%;
    box-shadow: var(--shadow-2); /* 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) */
    text-align: center;
    visibility: hidden;
    border-radius: var(--border-radius); /* 0.25rem */
    background: var(--background-secondary-color);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    border-radius: var(--border-radius); /* 0.25rem */
    padding: 0.46rem;
    background: transparent;
    border-color: transparent;
    font-weight: 600;
    color: var(--primary-500); /* #2cb1bc */
    letter-spacing: var(--letter-spacing); /* 1px */
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`;

export default Wrapper;
