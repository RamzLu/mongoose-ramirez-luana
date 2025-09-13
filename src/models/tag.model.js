import { model, Schema } from "mongoose";

const tagSchema = new Schema(
  {
    tag_name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const TagModel = model("Tag", tagSchema);
