var jwt = require("jsonwebtoken");
const { Animals } = require("../models");
const Validator = require("fastest-validator");
const v = new Validator();

const getAnimals = async (req, res) => {
  const animals = await Animals.findAll();
  return res
    .status(200)
    .json({ kode: 200, msg: "Data Hewan didapatkan", res: { animals } });
};
const getAnimalById = async (req, res) => {
  const id = req.params.id;
  const animal = await Animals.findByPk(id);
  if (animal) {
    return res
      .status(200)
      .json({ kode: 200, msg: "Data Hewan ditemukan", res: { animal } });
  } else {
    return res.status(404).json({
      kode: 404,
      msg: "Data Hewan tidak ditemukan",
      res: {},
    });
  }
};

const addAnimal = async (req, res) => {
  const decoded = jwt.verify(
    req.cookies.refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const userId = decoded.userId;
  req.body.userId = userId;
  console.error("data:", req.body);
  const schema = {
    namaLocal: "string",
    namaLatin: "string",
    habitat: "string",
    description: "string",
    longitude: "string",
    latitude: "string",
    userId: "number",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res
      .status(400)
      .json({ kode: 400, msg: "Periksa inputan lagi", res: { validate } });
  }

  const animal = await Animals.create(req.body);
  return res
    .status(200)
    .json({ kode: 200, msg: "Data berhasil diinputkan", res: { animal } });
};

const updateAnimal = async (req, res) => {
  const id = req.params.id;
  let animal = await Animals.findByPk(id);
  if (!animal) {
    return res
      .status(400)
      .json({ kode: 400, message: "hewan tidak ditemukan", res: {} });
  }
  const schema = {
    namaLocal: "string|optional",
    namaLatin: "string|optional",
    habitat: "string|optional",
    description: "string|optional",
    longitude: "string|optional",
    latitude: "string|optional",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      kode: 400,
      msg: "Periksa tipe data dari inputan",
      res: { validate },
    });
  }

  animal = await animal.update(req.body);
  return res.status(200).json({
    kode: 200,
    msg: "Data hewan berhasil diperbarui",
    res: { animal },
  });
};

const deleteAnimal = async (req, res) => {
  const id = req.params.id;
  let animal = await Animals.findByPk(id);

  if (!animal) {
    return res
      .status(400)
      .json({ kode: 400, message: "hewan tidak ditemukan", res: {} });
  }

  await animal.destroy();
  return res.status(200).json({
    kode: 200,
    msg: "Hewan dengan id " + id + " telah dihapus",
    res: {},
  });
};

module.exports = {
  getAnimals,
  getAnimalById,
  addAnimal,
  updateAnimal,
  deleteAnimal,
};
