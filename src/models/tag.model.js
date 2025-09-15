import { model, Schema } from "mongoose";

const tagSchema = new Schema(
  {
    tag_name: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null, // si es null el el campo esta activo, si tiene una fecha, esta "borrado".
    },
  },
  {
    versionKey: false,
  }
);

// aqui ponemos el "hook" para que al hacer cualquier tipo de find nos nos traiga los ya borrados
tagSchema.pre(/^find/, function (next) {
  // this seria la consulta y le añadimos un filtro que busque por donde el deteleAt sea null
  this.where({ deletedAt: null });
  next();
});
export const TagModel = model("Tag", tagSchema);
