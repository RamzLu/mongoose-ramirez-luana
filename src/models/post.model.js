import { model, Schema, Types } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // RELACIÓN 1:N
    // Guardamos el id del autor, el tipo es UN solo ObjectId.
    // NO es 'unique', porque muchos posts compartirían el mismo id del autor.
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    // RELACIÓN N:M
    // Usamos un array [ ] para guardar MUCHOS ids (referencias).
    // se usa [Types.ObjectId] porque al validar el campo con reglas (required, validate, default), debe estar a altura de
    // array, ya que si se hace User:[{}] no perimitirá ponerlo por fuera
    tags: {
      type: [Types.ObjectId],
      ref: "Tag",
    },
  },
  {
    versionKey: false,
  }
);

export const PostModel = model("Post", postSchema);
