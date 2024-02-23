# Katteb Technical Test MERN Stack Chat App

Hey there! 👋 I'm excited to share the completion of my technical test which was created using MERN stack chat application. 🚀

## Overview

This project implements a real-time chat application using the MERN stack:

- **MongoDB:** Database for storing chat messages.
- **Express.js:** Server-side framework for handling HTTP requests.
- **React:** Frontend library for building the user interface.
- **Node.js:** JavaScript runtime for server-side development.

## Features

- Real-time chat functionality.
- User authentication and authorization.
- Storing chat messages in MongoDB.
- user-friendly UI.

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js
- JWT (for user authentication)
- Socket.io (for real-time communication)

## Getting Started

To run the app locally you have 2 approaches, follow these steps:

### Approach 1

1. Clone the repository:

   ```bash
    git clone https://github.com/omarelsabaawy/Katteb-Technical-Test.git
    cd Katteb-Technical-Test
   ```

2. Open the Server Folder, install the dependencies and run the project.

    ```bash
    cd server
    npm install
    npm start
   ```

3. Open the Client Folder, install the dependencies and run the project.

    ```bash
    cd client
    npm install
    npm start
   ```

### Approach 2

1. Clone the repository:

   ```bash
    git clone https://github.com/omarelsabaawy/Katteb-Technical-Test.git
    cd Katteb-Technical-Test
   ```

2. You can use Docker to run the project.

    ```bash
    docker-compose up
   ```

## Or

1. Clone the repository:

   ```bash
    git clone https://github.com/omarelsabaawy/Katteb-Technical-Test.git
    cd Katteb-Technical-Test
   ```

2. Open the Server Folder, and run the dockerfile.

    ```bash
    cd server
    docker build -t server .
    docker run -p 5000:5000 server
   ```

3. Open the Client Folder, and run the dockerfile.

    ```bash
    cd client
    docker build -t client .
    docker run -p 3000:3000 client
   ```
