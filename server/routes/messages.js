const { addMessage, getMessages } = require("../controllers/message");
const router = require("express").Router();

router.post("/add-message", addMessage);
router.post("/get-message", getMessages);

module.exports = router;
