import React from "react";
import styled from "styled-components";

const Navbar = styled.div`
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  border-bottom: #cacaca solid 1px;

  h2 {
    margin: 0;
    display: block;
    width: 20%;
    text-align: center;
  }

  div {
    width: 40%;
    text-align: right;
    /* background-color: red; */
  }
`;

const Links = styled.ul`
  display: flex;
  li {
    padding-right: 2em;
    padding-left: 0;
  }
`;

function Navigation({collections, getPage, updateGallery}) {
  return (
    <Navbar>
      <div>
        <Links>
          <li onClick={()=>{getPage('createCollection')}}>create new</li>
          <li>your collections</li>
          {collections.map(item => <li onClick={() => { updateGallery(item) }}>{item}</li>)}
        </Links>
      </div>
      <h2>[ trove ]</h2>
      <div>
        <i className="fas fa-search"></i>
      </div>
    </Navbar>
  );
}

export default Navigation;
