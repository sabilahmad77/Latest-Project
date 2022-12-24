// import express from "express";
const express = require("express");
// import userModel from "../models/userModel";
// import USERS from "../models/userModel";
const USERS = require("../models/userModel");
const router = express.Router();
router.post("/login", async (req, res) => {
  console.log("loginn call");
  const { address, balance } = req.body;
  let ExistingUsers;
  try {
    ExistingUsers = await USERS.findOne({ address });
  } catch (error) {
    return console.log(error);
  }
  if (ExistingUsers) {
    // Set the current balance
    console.log("existing users", ExistingUsers);
    await ExistingUsers.updateOne(
      { address: address },
      { $set: { balance: balance } }
    );
    return res.status(201).json({ ExistingUsers });
  } else {
    const user = new USERS({
      address,
      balance
    });
    try {
      await user.save();
      return res.status(201).json({ user });
    } catch (error) {
      return console.log(error);
    }
    console.log("user saved", user, ExistingUsers);
  }
});

module.exports = router;
