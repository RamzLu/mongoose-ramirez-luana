import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await UserModel.create({
      username,
      email,
      password,
    });
    return res.status(201).json({
      msg: "Usuario creado exitosamente",
      newUser: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor.",
    });
  }
};
