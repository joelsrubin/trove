import React from "react";
import styled from "styled-components";

function Input({ label, handleChange, labels }) {
  let string = Object.keys(label)[0]
  return (
    <div>
      <label>
      {string}
      <input type="text" name={string} autoComplete="off" value={labels[string]} id={string}></input>
      </label>
    </div>
  )
}

export default Input;
