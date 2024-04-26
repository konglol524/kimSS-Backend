const User = require('../models/User');
const jwt = require("jsonwebtoken");


exports.getMe = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  };
