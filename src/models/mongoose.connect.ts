import mongoose from "mongoose";

/* const usuarioSchema = new mongoose.Schema(
  {},
  { collection: "usuarios", strict: false }
);
const Usuario = mongoose.model("Usuario", usuarioSchema);
const usuarios = await Usuario.find({});
console.log("Documentos encontrados:", usuarios); */

// Conectando a MongoDB
const uri = process.env.MONGODB_URI || "";
export const initializeMongo = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(uri).then(() => {
      console.log("Conexión exitosa a MongoDB con Mongoose");
    });
  } catch (error) {
    console.error("Error al conectar o consultar:", error);
  }
};
