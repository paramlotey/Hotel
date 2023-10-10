const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");
const { v4: uuidv4 } = require('uuid');

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;

  try {
    const newbooking = new Booking({
      room: room.roomname,
      roomid: room._id,
      userid,
      fromdate,
      todate,
      totalamount,
      totaldays,
      transactionId: uuidv4(),
    });

    const booking = await newbooking.save();

    const roomtemp = await Room.findOne({ _id: room._id });
    roomtemp.currentbookings.push({
      booking: booking._id,
      fromdate: fromdate,
      todate: todate,
      userid: userid,
      status: booking.status,
    });
    await roomtemp.save();
    res.send("Room Booked");
    console.log(booking);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
