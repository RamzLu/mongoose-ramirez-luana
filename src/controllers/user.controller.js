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
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor.",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (users.length === 0) {
      return res.status(404).json({
        msg: "No hay ningun usuario en la base de datos.",
      });
    }

    return res.status(200).json({
      ok: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const userUpdate = await UserModel.findByIdAndUpdate(
      id, // Encuentra el documento por su id
      { username, email, password }, // Actualiza en la base de datos lo que se le pase por el body
      // como la variable userUpdate te devuelve el original porque primero te muestra el primer estado y luego lo modifica,
      // entonces se pone new: true para que te muestre ya actualizado
      { new: true }
    );
    return res.status(201).json({
      msg: "Actualizado correctamente.",
      data: userUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await UserModel.findOneAndDelete(id);
    return res.status(200).json({
      msg: "User eliminado correctamente",
      data: deleteUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};
