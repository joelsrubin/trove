import React from "react";
import styled from "styled-components";
import shortid from "shortid";

function Dropdown(collections, updateGallery) {
  return (
    <div>
      <ul>
        {collections.map(item => <li key={shortid.generate()} onClick={() => { updateGallery(item) }}>{item}</li>)}
      </ul>
    </div>
  );
}

export default Dropdown;
