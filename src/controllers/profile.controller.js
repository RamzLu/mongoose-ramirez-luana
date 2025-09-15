import { populate } from "dotenv";
import { ProfileModel } from "../models/profile.model.js";
export const createProfile = async (req, res) => {
  const {
    first_name,
    last_name,
    address,
    profile_picture_URL,
    biography,
    social_media,
    User,
  } = req.body;
  try {
    const newProfile = await ProfileModel.create({
      first_name,
      last_name,
      address,
      profile_picture_URL,
      biography,
      social_media,
      User,
    });
    // como no se puede usar el populate en el método create populamos la variable donde hicimos create
    await newProfile.populate("User", "-password");
    return res.status(201).json({
      msg: "Perfil creado exitosamente",
      data: newProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor.",
    });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.find().populate({
      path: "User",
      populate: {
        path: "posts",
        populate: {
          path: "tags",
          model: "Tag",
          select: "-_id",
        },
      },
    });

    if (profiles.length === 0) {
      return res.status(404).json({
        msg: "No hay ningun perfil en la base de datos.",
      });
    }

    return res.status(200).json({
      ok: true,
      data: profiles,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await ProfileModel.findById(id).populate({
      path: "User",
      populate: {
        path: "posts",
        populate: {
          path: "tags",
          model: "Tag",
          select: "-_id",
        },
      },
    });
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  //se manda solamente el req.body porque al querer actualizar un solo campo de un objeto por ejemplo
  // si quisiera actualizar solamente la calle de mi direccion y hiciera:
  // address:{
  // street: "Calle 2"
  // }
  // En la base de datos al no mandarle tambien el número lo elimina y solo queda la street, asi que para que
  // eso no pase le pasamos el req.body para poder hacer un patch como este "address.street": "Calle 2"
  try {
    const profileUpdate = await ProfileModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.status(201).json({
      msg: "Actualizado correctamente.",
      data: profileUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};

export const deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProfile = await ProfileModel.findOneAndDelete(id).populate({
      path: "User",
      populate: {
        path: "posts",
        populate: {
          path: "tags",
          model: "Tag",
          select: "-_id",
        },
      },
    });
    return res.status(200).json({
      msg: "Perfil eliminado correctamente",
      data: deleteProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};
