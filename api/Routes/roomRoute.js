const express = require("express");
const router = express.Router();
const roomModel = require("../models/roomModel");

router.post("/addroom", async (req, res) => {
  try {
    const {
      roomname,
      maxcount,
      phonenumber,
      rentperday,
      type,
      imageurls,
      description,
    } = req.body;

    const newRoom = new roomModel({
      roomname,
      maxcount,
      phonenumber,
      rentperday,
      type,
      imageurls,
      description,
    });
    await newRoom.save();

    res
      .status(201)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/allrooms", async (req, res) => {
  try {
    const rooms = await roomModel.find({});
    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid;
  try {
    const room = await roomModel.findOne({ _id: roomid });
    return res.status(200).json(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
