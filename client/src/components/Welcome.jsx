import React, { useState, useEffect } from "react";
import styled from "styled-components";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchUsername = async () => {
      setUserName(
        await JSON.parse(
          localStorage.getItem("user")
        ).username
      );
    }
    fetchUsername();
  }, []);
  return (
    <Container>
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  span {
    color: #4e0eff;
  }
`;

