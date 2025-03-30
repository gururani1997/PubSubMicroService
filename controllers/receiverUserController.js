const { v4: uuidv4 } = require("uuid");
const User = require("../models/userSchema");
const { sendMessage } = require("../services/sqsManager");
const jwt = require("jsonwebtoken");

// Login route
exports.login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const payload = { userId: user.id, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.saveData = async (req, res) => {
  try {
    const { user, class: userClass, age, email } = req.body;

    if (!user || !userClass || !age || !email) {
      return res.status(400).send({ error: "All fields are required!" });
    }

    let isUserExist = await User.findOne(
      { email: email },
      { _id: 0, email: 1, name: 1 }
    );
    if (isUserExist)
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });

    const newData = new User({
      id: uuidv4(),
      user,
      class: userClass,
      age,
      email,
      inserted_at: new Date(),
    });

    try {
      const savedData = await newData.save();
      res.status(201).send(savedData);
      await sendMessage(savedData);
    } catch (err) {
      console.error(err);
      return res.status(500).send({ error: "Failed to save data!" });
    }
  } catch (error) {
    return res.status(500).send({ error: error?.message });
  }
};
