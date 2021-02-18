import React from "react";
import styled from "styled-components";

const Greeting = styled.div`
  text-align:center;
`

function Dashboard({user}) {
  return (
    <Greeting>
      <h2>welcome back, {user}!</h2>
    </Greeting>
  );
}

export default Dashboard;
