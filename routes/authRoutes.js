const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

router.get("/get", (req, res) => {
  res.status(200).json({ message: "response from server" });
});
router.post(
  "/register",
  [
    check("email", "enter valid email").isEmail(),
    check("password", "enter password").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res
          .status(400)
          .json({ message: "some errors occured", errors: errors });
      }
      const {email,password} = req.body
      const candidate = await User.findOne({email})
      if (candidate){
        return res.status(400).json({message:'user olready exist'})
      }
      const hashedPassword  =await bcryptjs.hash(password,12)
      const user = new User({email,password:hashedPassword})
      await user.save().then(()=>{
        return res.status(201).json({message:'user successfully created'})
      })
    } catch (e) {
      res.status(500).json({ message: "server error occured", e });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "enter valid email").isEmail(),
    check("password", "enter password").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res
          .status(400)
          .json({ message: "some errors occured", errors: errors });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      const isMatch =await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "password not found try again" });
      }
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h"
      });
      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "server error occured", e });
    }
  }
);

module.exports = router;
