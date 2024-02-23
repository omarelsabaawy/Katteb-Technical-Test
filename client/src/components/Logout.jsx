import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("An error occurred during the logout request:", error);
    }
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #ff0e0e;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ffff;
  }
`;
