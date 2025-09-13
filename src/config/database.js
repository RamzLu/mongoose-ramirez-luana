import mongoose from "mongoose";

export const conectDB = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
    console.log("DB conectada correctamente.");
  } catch (error) {
    console.log("No se pudo conectar a la BD", error);
  }
};
