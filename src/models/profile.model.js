import { model, Schema, Types } from "mongoose";

const profileSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },

    //Al usar los corchetes [ ] en Mongoose, se
    //está definiendo el campo "addresses" como un Array de Subdocumentos.
    //es decir  puede tener cero, una o MUCHAS direcciones guardadas en esa lista.

    // Al definirlo directamente como un objeto { } (sin corchetes),
    // se está creando un Subdocumento Único (o anidado).
    address: {
      street: {
        type: String,
        requiered: true,
      },
      street_number: {
        type: Number,
        required: true,
      },
    },
    profile_picture_URL: {
      type: String,
      requiered: false,
    },
    biography: {
      type: String,
      required: false,
    },
    social_media: {
      X: {
        type: String,
        required: false,
      },
      Instagram: {
        type: String,
        required: false,
      },
    },

    // la forma de hacer una realcion 1:1 es poniendo el campo unique: true para que el id sea único para cada perfil
    User: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

export const ProfileModel = model("Profile", profileSchema);
