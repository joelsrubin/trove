import React from "react";
import styled from "styled-components";
import Item from "./Item.jsx";
import shortid from "shortid";

const ItemContainer = styled.div`
  border: solid black 2px;
  margin: 1em;
  padding: 20px;
`;

const Container = styled.div`
  width: 90%;
  margin: 1em auto;
  text-align:center;
`;

const GalleryContainer = styled.div`
  width: 90%;
  margin: 1em auto;
  display: flex;
  text-align: left;
`;

const Button = styled.button`
  width: 300px;
  margin:20px;
`

function Gallery({ collection, deleteCollection, getPage, selectedGallery }) {
  return (
    <Container>
      {console.log(collection)}
      <h1>{selectedGallery}</h1>
      <Button onClick={deleteCollection}>delete collection</Button>
      <Button onClick={() => getPage('addItem')}>add item</Button>
    <GalleryContainer>
      {collection.map(item => <ItemContainer key={shortid.generate()}><Item item={item}/></ItemContainer>)}
    </GalleryContainer>
    </Container>
  );
}

export default Gallery;
