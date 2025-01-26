import { defineMiddleware } from "astro/middleware";
/* import { getSession } from "auth-astro/server"; */
import { verifyConnection, initializeMongo } from "./models/mongoose.utils";
let mongoIsConnected = false;

export const onRequest = defineMiddleware(async (context: any, next: any) => {
  if (!mongoIsConnected) {
    console.log("---");
    console.log("Conexión a MongoDB no establecida");
    await initializeMongo().then(async () => {
      console.log("---");
      if (await verifyConnection()) mongoIsConnected = true;
      return next();
    });
  } else {
    console.log("---");
    console.log("La conexión a MongoDB ya está establecida");
    console.log("---");
    return next();
  }
});
