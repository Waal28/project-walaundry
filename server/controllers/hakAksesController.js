import Users from "../models/users.js";

export const getUsers = async (req, res) => {
  try {
    const user = await Users.find();
    res.json(user.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserbyId = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addUser = async (req, res) => {
  const { hakAkses, username, password, confPassword } = req.body;
  const user = await Users.find();
  const findUser = user.find((usr) => usr.username === username);
  if (findUser) {
    return res.status(400).json({ msg: "username sudah digunakan" });
  }
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "password dan confirm password tidak cocok" });
  }
  try {
    const user = await Users.insertMany({ hakAkses, username, password });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  const { hakAkses, username, password, confPassword } = req.body;

  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "password dan confirm password tidak cocok" });
  }
  try {
    const user = await Users.updateOne(
      { _id: req.params.id },
      { $set: { hakAkses, username, password } }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await Users.deleteOne({ _id: req.params.id });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const Login = async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.find();
  const findUser = user.find((usr) => usr.username === username);
  if (!findUser) {
    return res.status(400).json({ msg: "username tidak ditemukan" });
  }
  if (password !== findUser.password) {
    return res.status(400).json({ msg: "password tidak cocok" });
  }
  try {
    res.json(findUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
