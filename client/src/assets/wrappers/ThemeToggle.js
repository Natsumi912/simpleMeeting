import styled from "styled-components";

// ダークモードとライトモードの切り替えのスタイル
const Wrapper = styled.button`
  background: transparent;
  border-color: transparent;
  width: 3.5rem;
  height: 2rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  .toggle-icon {
    font-size: 1.15rem;
    color: var(--text-color); /* #0f172a */
  }
`;

export default Wrapper;
