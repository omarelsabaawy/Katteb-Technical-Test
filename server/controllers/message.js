const Messages = require("../models/message");

// Get messages between two users
exports.getMessages = async (req, res, next) => {
  try {
    // Destructure the request body
    const { from, to } = req.body;

    // Retrieve messages between the specified users, sorted by updatedAt
    const messages = await Messages.find({
      users: { $all: [from, to] },
    }).sort({ updatedAt: 1 });

    // Project the relevant information for the response
    const projectedMessages = messages.map((msg) => ({
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    }));

    // Send the projected messages in the response
    res.status(200).json(projectedMessages);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};

// Add a new message
exports.addMessage = async (req, res, next) => {
  try {
    // Destructure the request body
    const { from, to, message } = req.body;

    // Create a new message in the database
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    // Check if the message was added successfully and respond accordingly
    const responseMsg = data ? "Message added successfully." : "Failed to add message to the database";
    res.json({ msg: responseMsg });
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};
