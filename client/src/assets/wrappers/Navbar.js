import styled from "styled-components";

// ナブバーのスタイル
const Wrapper = styled.nav`
  height: var(--nav-height); /* 6rem */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500); /* #cc7a00 */
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .btn-container {
    display: flex;
    align-items: center;
  }
  .logo-text {
    display: none;
  }
  @media (min-width: 768px) {
    .logo {
      transform: translateX(50%);
    }
  }
  @media (min-width: 992px) {
    position: sticky; /* 要素を固定 */
    top: 0;
    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
      transform: translateX(25%);
    }
  }
`;

export default Wrapper;
