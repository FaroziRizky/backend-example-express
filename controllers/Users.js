require("dotenv").config();
const { Users } = require("../models");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.cookies.refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const userId = decoded.userId;
    const users = await Users.findByPk(userId, {
      attributes: ["userId", "name", "email", "phone", "picture"],
    });
    return res.status(200).json({
      kode: 200,
      msg: "Berhasil mendapatkan data user",
      res: { users },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

const setPicture = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.cookies.refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const userId = decoded.userId;
  } catch (error) {}
};

const Register = async (req, res) => {
  const { email, name, phone, password, confPassword } = req.body;
  if (!email && !name && !phone && !password && !confPassword)
    return res
      .status(400)
      .json({ kode: 400, msg: "Inputan tidak boleh kosong", res: {} });
  if (password !== confPassword)
    return res.status(400).json({
      kode: 400,
      msg: "Password dan Confirm Password Tidak Cocok",
      res: {},
    });
  const salt = await bcrypt.genSalt(10);
  const hasPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      email: email,
      name: name,
      phone: phone,
      password: hasPassword,
      picture: "",
      refreshToken: null,
    });
    res.status(200).json({ kode: 200, msg: "Registrasi Berhasil", res: {} });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ kode: 500, msg: "Internal Server Error", res: {} });
  }
};

const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match)
      return res
        .status(400)
        .json({ kode: 400, msg: "Password salah", res: {} });
    const userId = user[0].userId;
    const name = user[0].name;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    await Users.update(
      { refreshToken: refreshToken },
      {
        where: {
          userId: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ kode: 200, msg: "Berhasil login", res: { accessToken } });
  } catch (error) {
    console.error("Error:", error);
    res.status(204).json({ kode: 204, msg: "Email tidak ditemukan", res: {} });
  }
};

const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res
      .status(204)
      .json({ kode: 204, msg: "refresh token tidak ditemukan" });
  const user = await Users.findAll({
    where: {
      refreshToken: refreshToken,
    },
  });
  if (!user[0])
    return res.status(204).json({ kode: 204, msg: "user tidak ditemukan" });
  const userId = user[0].userId;
  await Users.update(
    { refreshToken: null },
    {
      where: {
        userId: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.status(200).json({ kode: 200, msg: "Berhasil logout" });
};

module.exports = { getUsers, Login, Register, Logout };
