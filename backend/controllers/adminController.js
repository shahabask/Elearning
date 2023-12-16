import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import generateAdminToken from "../utils/generateAdminToken.js";
import sendresetmail from "../utils/nodeMailer.js";
import User from "../models/userModel.js";
import Tutor from "../models/tutorModel.js";
const adminAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email: email });

  if (admin && (await admin.matchPassword(password))) {
    const token = await generateAdminToken(res, admin._id);
    res.status(201).json({
      token: token,
    });
  } else {
    res.status(400).json("Invalid email or password");
    // throw new Error('invalid username or password')
  }
});

const adminLogout = asyncHandler(async (req, res) => {
  res.cookie("adminJwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Admin Logged Out" });
});

const adminForgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await Admin.findOne({ email });
  const token1 = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiration = new Date(Date.now() + 1 * 120 * 1000);
  if (user) {
    user.otp = token1;
    user.otpExpiration = otpExpiration;
    await user.save();
    sendresetmail("Admin", email, user.otp);

    res.status(200).json({ message: "its working" });
  } else {
    res.status(400).json({ message: "User not found" });
  }
});

const adminConfirmOtp = asyncHandler(async (req, res) => {
  const { state, otp } = req.body;

  const user = await Admin.findOne({ email: state });

  if (user.otp == otp) {
    res.status(200).json("Successfull");
  } else {
    res.status(400).json("Incorrect otp");
  }
});

const adminResetPassword = asyncHandler(async (req, res) => {
  const { state, password } = req.body;

  const user = await Admin.findOne({ email: state });
  if (user) {
    user.password = password;
    await user.save();
    res.status(200).json("success");
  }
});

const adminOtpLoginVerifyEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await Admin.findOne({ email });
  const token1 = Math.floor(100000 + Math.random() * 900000).toString();
  if (user) {
    user.otp = token1;
    await user.save();
    sendresetmail("Admin", email, user.otp);
    res.status(200).json("succesfull");
  } else {
    res.status(400).json("Invalid Email");
  }
});

const adminOtpLogin = asyncHandler(async (req, res) => {
  const { state, otp } = req.body;
  const user = await Admin.findOne({ email: state });
  if (user.otp == otp) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
    });
  } else {
    res.status(400).json("Incorrect Otp");
  }
});

export {
  adminLogout,
  adminAuth,
  adminForgotPassword,
  adminConfirmOtp,
  adminResetPassword,
  adminOtpLoginVerifyEmail,
  adminOtpLogin,
};
