import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 18px;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, Sans-Serif;
  }

  ul {
  display: block;
  list-style-type: none;
  padding-inline-start: 0;
  margin: 0;
}

form {
  display: grid;
  width: 300px;
  margin: 0 auto;
  flex-grow: 1;
}

button {
  width: 100%;
  margin: 0 auto;
  font-size: 20px;
  cursor: pointer;
}

input {
  margin-bottom: 1em;
  width: 100%;
  padding: 5px;
}

`;

export default GlobalStyle;
