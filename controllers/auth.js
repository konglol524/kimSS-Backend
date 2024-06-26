const User = require("../models/User");
const Booking = require("../models/Booking");
const Feedback = require("../models/Feedback");

exports.register = async (req, res, next) => {
  try {
    const { name, telephone, email, password, role } = req.body;
    //Create user
    const user = await User.create({
      name,
      telephone,
      email,
      password,
      role,
    });
    //Create Token
    // const token = user.getSignedJwtToken();
    // res.status(200).json({ success: true, token });
    console.log(user._id);
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err.stack);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  //!validate
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, msg: "Please provide an email and password" });
  //!Check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return res.status(400).json({ success: false, msg: "Invalid credentials" });

  const isMatch = await user.matchPassword(password);
  if (!isMatch)
    return res.status(400).json({ success: false, msg: "Invalid credentials" });
  // Create token
  // const token = user.getSignedJwtToken();
  // res.status(200).json({ success: true, token });
  sendTokenResponse(user, 200, res);
};

const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, data: user });
};

exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
};

exports.logout = async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};

exports.deleteUser = async (req, res, next) => {
  try {
    console.log(`Trying to delete id: ${req.params.id}`);
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Can't find user" });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: "error" });
  }
};

