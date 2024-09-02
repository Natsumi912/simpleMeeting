import styled from "styled-components";

// ダッシュボードフォームのスタイル
const Wrapper = styled.section`
  border-radius: var(--border-radius); /* 0.25rem */
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  .form-title {
    margin-bottom: 2rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-row label {
    display: block;
    font-size: var(--small-text); /* 0.875rem */
    margin-bottom: 0.5rem;
  }
  .form-row input,
  .form-row select {
    width: 100%;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  input.calendar-input {
    background: var(--grey-300); /* #cbd5e1 */
  }
  #startDate.date-picker-input {
    background: var(--grey-300); /* #cbd5e1 */
  }
  .react-datepicker-wrapper {
    width: 100%;
    text-align: center;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
    grid-template-columns: 1fr;
  }
  .form-input.avatar-btn {
    padding: 0.25rem 1rem 0.75rem;
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
