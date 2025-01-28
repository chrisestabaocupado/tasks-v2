import { defineMiddleware } from "astro/middleware";
import { getSession } from "auth-astro/server";
import { verifyConnection, initializeMongo } from "./models/mongoose.utils";
let mongoIsConnected = false;

export const onRequest = defineMiddleware(async (context: any, next: any) => {
  const uri = new URL(context.request.url);
  if (
    uri.pathname.split("/")[1] === "api" &&
    uri.pathname.split("/")[2] !== "auth"
  ) {
    const session: any = await getSession(context.request);
    switch (!session) {
      case true:
        return new Response(
          JSON.stringify({
            success: false,
            message: "Unauthorized",
          }),
          { status: 401 }
        );
        break;
      default:
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
        return next();
        break;
    }
  } else {
    return next();
  }
});
