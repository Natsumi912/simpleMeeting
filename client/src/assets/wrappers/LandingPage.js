import styled from "styled-components";

// ランディングページのスタイル
const Wrapper = styled.section`
  nav {
    width: var(--fluid-width); /* 90vw */
    max-width: var(--max-width); /* 1120px */
    margin: 0 auto;
    height: var(--nav-height); /* 6rem */
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height)); /* 100vh-6rem */
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: #f9a826;
    }
    margin-bottom: 2.25rem;
  }
  p {
    font-size: 1.25rem;
    line-height: 2;
    color: var(--text-secondary-color); /* #64748b */
    margin-bottom: 1.25rem;
    max-width: 35em;
  }
  .register-link {
    margin-right: 1rem;
  }
  .main-img {
    display: none;
  }
  .btn {
    padding: 0.75rem 1rem;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Wrapper;
