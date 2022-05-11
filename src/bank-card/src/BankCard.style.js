import { css } from 'lit';

// language=CSS
export const style = css`
  :host {
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    font-size: 16px;
    line-height: 18px;
    font-family: sans-serif;
  }

  .card {
    width: 300px;
    height: 284px;
  }

  .front-side,
  .back-side {
    /*transition: all ease-out 500ms;*/
    box-sizing: border-box;
    padding: 20px;
    width: 300px;
    height: 186px;
    border-radius: 16px;
    background-color: #ff5900;
    overflow: hidden;
  }

  .front-side {
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }

  .front-side::before {
    content: '';
    display: block;
    background-color: white;
    opacity: 0.1;
    width: 250px;
    height: 250px;
    position: absolute;
    pointer-events: none;
    transform: rotate(-10deg) translateX(-40px) translateY(-20%);
  }

  .front-side .header {
    display: flex;
    height: 24px;
    width: 190px;
    justify-content: flex-start;
    align-items: center;
  }

  .switch-button {
    border: 0;
    /*transition: color ease-out 500ms,*/
    /*    background-color ease-out 500ms,*/
    /*    opacity ease-out 500ms;*/
    background-color: transparent;
    display: flex;
    border-radius: 8px;
    padding: 2px 4px;
    fill: currentColor;
    color: white;
  }

  .switch-button:hover {
    cursor: pointer;
    background-color: white;
    color: #ff5900;
  }

  .switch-button[disabled] {
    opacity: 0.2;
  }

  .switch-button:active {
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) inset;
  }

  .switch-button:active :first-child {
    opacity: 0.9;
  }

  .switch-button :first-child {
    width: 32px;
    height: 32px;
  }

  .front-side .body {
    display: flex;
    flex-direction: column;
    height: 90px;
    justify-content: space-between;
  }

  .back-side {
    box-shadow: initial;
    position: absolute;
    top: 0;
    left: 0;
  }

  .back-side::before {
    content: '';
    display: block;
    background-color: black;
    width: 300px;
    height: 44px;
    position: absolute;
    pointer-events: none;
    top: 20px;
    left: 0;
  }

  .signature {
    display: flex;
    justify-content: end;
    width: 170px;
    height: 20px;
    background-color: #dbdbdb;
    position: absolute;
    top: 120px;
    line-height: 20px;
    padding: 2px 8px;
    color: black;
  }

  .signature::after {
    content: 'XXXX';
    display: block;
  }

  .logo,
  .logo::after {
    content: '';
    width: 44px;
    height: 44px;
    border-radius: 50%;
    position: absolute;
  }

  .logo {
    background-color: red;
    right: 36px;
    top: 10px;
  }

  .logo:after {
    content: '';
    display: block;
    left: 26px;
    opacity: 0.5;
    background-color: yellow;
  }

  .card-number {
    font-size: 20px;
    line-height: 22px;
  }

  .expiration {
    font-size: 14px;
  }

  .expiration :first-child {
    font-size: 8px;
  }

  .verification-code {
    margin-top: 80px;
    width: 50px;
    right: 30px;
    position: absolute;
    display: flex;
    flex-direction: column;
  }

  .verification-code :first-child {
    font-size: 12px;
    line-height: 22px;
  }

  .screen-reader-only {
    position: absolute;
    top: 0;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(100%);
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
    border: 0;
    margin: 0;
    padding: 0;
  }

  :host([opened]) {
    height: 276px;
  }

  :host([opened]) .front-side {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
  }

  :host([opened]) .back-side {
    top: 90px;
  }

  @media (min-width: 400px) {
    .card {
      width: 400px;
      height: 220px;
    }

    :host([opened]) {
      width: 400px;
      height: 196px;
    }

    :host([opened]) .back-side {
      top: 10px;
      left: 100px;
    }
  }
`;
