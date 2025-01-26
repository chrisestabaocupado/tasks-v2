import mongoose from "mongoose";
// Función para inicializar la conexión
const uri = import.meta.env.MONGODB_URI || "";
export const verifyConnection = async () => {
  const isConnected = await mongoose.connection.readyState;
  return isConnected;
};

export const initializeMongo = async () => {
  try {
    await mongoose.connect(uri).then(() => {
      console.log("Conexión exitosa a Base de Datos:", uri);
    });
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};

export const closeMongo = async () => {
  try {
    await mongoose.connection.close().then(() => {
      console.log("Conexión cerrada a Base de Datos:", uri);
    });
  } catch (error) {
    console.error("Error al cerrar conexión a MongoDB:", error);
  }
};

export const insert = async (model: any, obj: any) => {
  const inserted_model = new model(obj);
  await inserted_model
    .save()
    .then(() => {
      console.log("Usuario guardado");
    })
    .catch((error: any) => {
      console.error("Error al guardar usuario:", error);
    });
  return inserted_model;
};

export const getOne = async (model: any, query: any) => {
  const result = await model.findOne(query);
  return result;
};

export const get = async (model: any, query: any) => {
  const result = await model.find(query);
  return result;
};
