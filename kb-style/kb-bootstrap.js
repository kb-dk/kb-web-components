import {css} from "lit";

export const BSContainer = css`
  .container,
  .container-fluid,
  .container-xxl,
  .container-xl,
  .container-lg,
  .container-md,
  .container-sm {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    width: 100%;
    padding-right: calc(var(--bs-gutter-x) * 0.5);
    padding-left: calc(var(--bs-gutter-x) * 0.5);
    margin-right: auto;
    margin-left: auto;
  }

  @media (min-width: 576px) {
    .container-sm, .container {
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    .container-md, .container-sm, .container {
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    .container-lg, .container-md, .container-sm, .container {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .container-xl, .container-lg, .container-md, .container-sm, .container {
      max-width: 1140px;
    }
  }
  @media (min-width: 1400px) {
    .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {
      max-width: 1320px;
    }
  }
`;
export const BSColSM6 = css`
  @media (min-width: 576px) {
    .col-sm-6 {
      flex: 0 0 auto;
      width: 50%;
    }
  }
`;
export const BSColLG3 = css`
  @media (min-width: 992px) {
    .col-lg-3 {
      flex: 0 0 auto;
      width: 25%;
    }
  }
`;
export const BSRow = css`
  .row {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(-1 * var(--bs-gutter-y));
    margin-right: calc(-0.5 * var(--bs-gutter-x));
    margin-left: calc(-0.5 * var(--bs-gutter-x));
  }

  .row > * {
    box-sizing: border-box;
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-right: calc(var(--bs-gutter-x) * 0.5);
    padding-left: calc(var(--bs-gutter-x) * 0.5);
    margin-top: var(--bs-gutter-y);
  }
`;
export const BSH3 = css`
  .h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }

  .h3 {
    font-size: calc(1.3rem + 0.6vw);
  }

  @media (min-width: 1200px) {
    .h3 {
      font-size: 1.75rem;
    }
  }
`;