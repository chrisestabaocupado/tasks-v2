import mongoose from "mongoose";

// Función para inicializar la conexión
export const initializeMongo = async () => {
  const uri = process.env.MONGODB_URI || "";
  console.log(uri);
  try {
    await mongoose.connect("mongodb://172.30.32.1:27017/pruebas").then(() => {
      console.log("Conexión exitosa a MongoDB");
    });
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};