import { TagModel } from "../models/tag.model.js";

export const createTag = async (req, res) => {
  const { tag_name } = req.body;
  try {
    const newTag = await TagModel.create({
      tag_name,
    });
    return res.status(201).json({
      msg: "Tag creado exitosamente",
      data: newTag,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor.",
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.find();

    if (tags.length === 0) {
      return res.status(404).json({
        msg: "No hay ninguna tag en la base de datos.",
      });
    }

    return res.status(200).json({
      ok: true,
      data: tags,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getTagById = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await TagModel.findById(id);
    return res.status(200).json(tag);
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};

export const updateTag = async (req, res) => {
  const { id } = req.params;
  const { tag_name } = req.body;
  try {
    const tagUpdate = await TagModel.findByIdAndUpdate(
      id,
      { tag_name },
      { new: true }
    );
    return res.status(201).json({
      msg: "Actualizado correctamente.",
      data: tagUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};

export const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    // al ser una eliminacion lógica ya no usamos el .findByIdAndDelete(), sino que actualizamos para marcar y "borrar"
    const deleteTag = await TagModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() }, // para reemplazar el null con la fecha que se tiene al momento de borrar
      { new: true }
    );
    return res.status(200).json({
      msg: "Tag eliminado correctamente",
      data: deleteTag,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};
