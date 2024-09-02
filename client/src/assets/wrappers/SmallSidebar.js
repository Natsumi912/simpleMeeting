import styled from "styled-components";

// モバイル版サイドバーのスタイル設定
const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none; /* 992未満なら表示しない */
  }
  .sidebar-container {
    /* サイドバー設定(非表示) */
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1; /* 背景化して,非表示にする */
    opacity: 0;
    transition: var(--transition); /* 0.3s */
    visibility: hidden;
  }
  .show-sidebar {
    /* サイドバー表示 */
    z-index: 99; /* 実際に表示 */
    opacity: 1;
    visibility: visible;
  }
  .content {
    background: var(--background-secondary-color);
    width: var(--fluid-width); /* 90vw */
    height: 95vh;
    border-radius: var(--border-radius); /* 0.25rem */
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark); /* #842029 */
    cursor: pointer;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition); /* 0.3s */
  }
  .nav-link:hover {
    color: var(--primary-500); /* #2cb1bc */
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
  }
  .active {
    /* 選択中の項目 */
    color: var(--primary-500); /* #2cb1bc */
  }
`;

export default Wrapper;
