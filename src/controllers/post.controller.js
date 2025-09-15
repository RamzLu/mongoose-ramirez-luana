import { PostModel } from "../models/post.model.js";

export const createPost = async (req, res) => {
  const { title, description, author, tags } = req.body;
  try {
    const newPost = await PostModel.create({
      title,
      description,
      author,
      tags,
    });
    await newPost.populate("author", "-password");
    return res.status(201).json({
      msg: "Post creado exitosamente",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor.",
    });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const post = await PostModel.find().populate("author", "-password");

    if (post.length === 0) {
      return res.status(404).json({
        msg: "No hay ningun post en la base de datos.",
      });
    }

    return res.status(200).json({
      ok: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id).populate("author", "-password");

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags } = req.body;
  try {
    const postUpdate = await PostModel.findByIdAndUpdate(
      id,
      { title, description, tags },
      { new: true }
    ).populate("author", "-password");

    console.log(postUpdate);
    return res.status(201).json({
      msg: "Actualizado correctamente.",
      data: postUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletePost = await PostModel.findOneAndDelete(id).populate(
      "author",
      "-password"
    );
    return res.status(200).json({
      msg: "Post eliminado correctamente",
      data: deletePost,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};
