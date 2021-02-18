import React from "react";
import styled from "styled-components";
import shortid from "shortid";

const Img = styled.img`
  width: 300px;
`;

function Item({ item }) {
  // const { item } = item;
  const keys = Object.keys(item);
  // console.log(item['images'])
  return (
    <div>
      {item['images'].map(j => (
        <Img src={j} key={shortid.generate()}></Img>
      ))}<br></br>
      {keys.map(i => (
    i !== 'images'? <span key={shortid.generate()}><strong>{i}</strong> {item[i]}<br></br></span> : ''
    ))}
    </div>
  )
}

export default Item;
