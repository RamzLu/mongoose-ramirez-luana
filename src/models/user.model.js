import { model, Schema } from "mongoose";
import { PostModel } from "./post.model.js";
import { ProfileModel } from "./profile.model.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // select: false, esto es si quisiera no mostrarlo al hacer una consulta
    },
  },
  {
    versionKey: false,
    // Esta configuración le dice a Mongoose cómo manejar los "campos virtuales", es decir
    // con el toJSON incluimos los campos virtuales
    toJSON: { virtuals: true },
  }
);

// este es un campo virtual (para hacer populate aunque no lo tengamos como referencia en
// nuestro schema)
userSchema.virtual("posts", {
  ref: "Post", // aqui iria modelo al que queremos conectar (en este caso sería la colección "Post")
  localField: "_id", //Es el campo en este modelo (el User) que mongoose
  //  usa como el valor para buscar, en este caso es el propio _id del usuario.
  foreignField: "author", // el campo en el otro modelo (el Post) que mongoose revisa para encontrar una coincidencia.
});

userSchema.virtual("profile", {
  ref: "Profile",
  localField: "_id",
  foreignField: "User",
  justOne: true,
  // Para que devuelva uno solo y no un array
});

// hook para la eliminacion en cascada, post (es decir despues, o pre si es antes) de que un 'findOneAndDelete' se complete
userSchema.post("findOneAndDelete", async function (user) {
  //user es el documento del usuario elimiado
  if (user) {
    try {
      // siguiendo la logica de arriba a abajo borramos primero todos los post donde el id del author coincida con el id del user borrado
      // delete many porque pueden ser varios
      await PostModel.deleteMany({ author: user._id });
      // lo mismo hacemos con el perfil, borramos el perfil donde el "User" coincida con el id del user borrado
      // delete One porque solo tiene un perfil
      await ProfileModel.deleteOne({ User: user._id });
    } catch (error) {
      console.error("Error durante el borrado en cascada:", error);
    }
  }
});
export const UserModel = model("User", userSchema);
