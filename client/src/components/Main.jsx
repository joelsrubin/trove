import React from "react";
import styled from "styled-components";
import Form from "./Form.jsx";
import CreateCollection from "./CreateCollection.jsx";

const Container = styled.div`
  /* background-color: red; */
  width: 90%;
  margin: 1em auto;
`;

function Main({ page }) {
  // if (page === 'dashboard') {
  //   <Dashboard/>
  // } else if (page === 'gallery') {

  // }
  return (
    <Container>
      {/* {page === "dashboard" ? "dashboard" : "hmm"} */}
      <CreateCollection/>
    </Container>
  )
}

export default Main;
