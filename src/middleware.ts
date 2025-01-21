import { defineMiddleware } from "astro/middleware";
import { getSession } from "auth-astro/server";

export const onRequest = defineMiddleware(async (context: any, next: any) => {
  /* const session = await getSession(context.request);
  const requestURL = new URL(context.request.url);
  if (
    !session &&
    requestURL.pathname !== "/login" &&
    requestURL.pathname !== "/" &&
    requestURL.pathname.startsWith("/api/") === false
  ) {
    return context.redirect("/login");
  } else {
    return next();
  } */
  return next();
});
