const { Users } = require("../models");
var jwt = require("jsonwebtoken");

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res
        .status(401)
        .json({ kode: 401, msg: "Anda belum login", res: {} });
    const user = await Users.findAll({
      where: {
        refreshToken: refreshToken,
      },
    });
    if (!user[0])
      return res.status(403).json({ kode: 403, msg: "Forbidden", res: {} });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.status(403).json({ kode: 403, msg: "Forbidden", res: {} });
        const userId = user[0].userId;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign(
          { userId, name, email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "20s" }
        );
        res.status(200).json({
          kode: 200,
          msg: "Access token telah diperbarui",
          res: {accessToken}
        });
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = refreshToken;
