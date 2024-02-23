import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import axios from "axios";
import { sendMessageRoute, receiveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = JSON.parse(
          localStorage.getItem("user")
        );

        const response = await axios.post(
          receiveMessageRoute,
          {
            from: data._id,
            to: currentChat._id,
          },
          {
            headers: {
              "X-Authorization-Token": JSON.parse(
                localStorage.getItem("token")
              ),
            },
          }
        );

        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (currentChat) {
      getMessages();
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    try {
      const data = JSON.parse(
        localStorage.getItem("user")
      );

      // Emit message to the server using socket
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: data._id,
        msg,
      });

      // Send the message to the server using axios
      await axios.post(
        sendMessageRoute,
        {
          from: data._id,
          to: currentChat._id,
          message: msg,
        },
        {
          headers: {
            "X-Authorization-Token": JSON.parse(
              localStorage.getItem("token")
            ),
          },
        }
      );

      // Update the state with the sent message
      setMessages((prevMessages) => [
        ...prevMessages,
        { fromSelf: true, message: msg },
      ]);

      // Scroll to the latest message
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    // Listen for incoming messages from the server
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }

    // Update state with the received message
    arrivalMessage &&
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
  }, [socket, arrivalMessage]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 75% 10%;
  gap: 0.1rem;
  overflow: hidden;
  background-color: #f5f5f5; /* Change to your light mode background color */
  
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: #333; /* Change to your light mode text color */
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.2rem;

      &-thumb {
        background-color: #ccc; /* Change to your light mode scrollbar thumb color */
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #333; /* Change to your light mode text color */

        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }

    .sended {
      justify-content: flex-end;

      .content {
        background-color: #e6e6e6; /* Change to your light mode sent message background color */
      }
    }

    .recieved {
      justify-content: flex-start;

      .content {
        background-color: #f0f0f0; /* Change to your light mode received message background color */
      }
    }
  }
`;

