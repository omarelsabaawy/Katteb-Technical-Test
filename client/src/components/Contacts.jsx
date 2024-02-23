import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [selectedRole, setSelectedRole] = useState("all");
  useEffect(() => {
    const fetchUsername = async () => {
      const data = await JSON.parse(
        localStorage.getItem("user")
      );
      setCurrentUserName(data.username);
    }
    fetchUsername();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  const filterContactsByRole = () => {
    if (selectedRole === "all") {
      return contacts;
    } else {
      return contacts.filter(contact => contact.role === selectedRole);
    }
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setCurrentSelected(null);
  };

  return (
    <Container>
      <div className="title">
        <h3>Katteb Technical Test</h3>
        <RoleFilter>
          <button
            onClick={() => handleRoleChange("all")}
            className={selectedRole === "all" ? "active" : ""}
          >
            All
          </button>
          <button
            onClick={() => handleRoleChange("user")}
            className={selectedRole === "user" ? "active" : ""}
          >
            User
          </button>
          <button
            onClick={() => handleRoleChange("agent")}
            className={selectedRole === "agent" ? "active" : ""}
          >
            Agent
          </button>
        </RoleFilter>
      </div>
      <div className="contacts">
        {filterContactsByRole().map((contact, index) => (
          <Contact
            key={contact._id}
            onClick={() => changeCurrentChat(index, contact)}
            isSelected={index === currentSelected}
          >
            <div className="username">
              <h3>{contact.username}</h3>
              <p>Role: {contact.role}</p>
            </div>
          </Contact>
        ))}
      </div>
      <div className="current-user">
        <div className="username">
          <h2>{currentUserName}</h2>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 20% 70% 10%;
  overflow: hidden;
  background-color: #f5f5f5;

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: left;
    padding-left: 1rem;
    overflow: auto;
    gap: 1rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #4e0eff;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }

  .current-user {
    background-color: #4e0eff;
    display: flex;
    justify-content: center;
    align-items: center;
    .username {
      h2 {
        color: #fff;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

const RoleFilter = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1rem;

  button {
    background-color: #4e0eff;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;

    &:hover,
    &.active {
      background-color: #4e0eff;
    }
  }
`;

const Contact = styled.div`
  background-color: ${(props) => (props.isSelected ? "#4e0eff" : "#fff")};
  color: ${(props) => (props.isSelected ? "#fff" : "#333")};
  min-height: 3rem;
  cursor: pointer;
  width: 90%;
  border-radius: 0.2rem;
  padding: 0.4rem;
  gap: 1rem;
  align-items: center;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  &:hover {
    background-color: #4e0eff;
    color: #fff;
  }

  .username {
    h3 {
      color: inherit;
    }
    p {
      padding-top: 0.1rem;
      font-size: 0.8rem;
      color: inherit;
    }
  }
`;
