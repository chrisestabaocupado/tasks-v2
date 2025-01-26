import type { APIRoute } from "astro";
import { add } from "date-fns";
import { deleteUndefinedProperties } from "src/utils/deleteUndefinedProperties";
import { getOne, get } from "src/models/mongoose.utils";
import { habits_model } from "../../models/schemas/habits.schema";

export const GET: APIRoute = async ({ url, request }) => {
  const _id = url.searchParams.get("_id");
  const user_mail = url.searchParams.get("user_mail");
  const mode = url.searchParams.get("mode");
  // date handling
  let start_date: any = url.searchParams.get("start_date");
  let end_date: any = url.searchParams.get("end_date");
  let created_at = undefined;
  if (start_date && end_date) {
    start_date = new Date(start_date);
    end_date = new Date(
      add(start_date, { days: 1, hours: 23, minutes: 59, seconds: 59 })
    );
    created_at = { $gte: start_date, $lt: end_date };
  }
  // query object
  const obj = deleteUndefinedProperties({
    _id,
    user_mail,
    created_at,
  });

  console.log(obj);
  // if no parameters are passed
  switch (Object.keys(obj).length === 0) {
    case true:
      return new Response(
        JSON.stringify({
          sucess: false,
          message: "Missing parameters!",
        }),
        { status: 400 }
      );
      break;
    case false:
      switch (mode) {
        case "find":
          try {
            const result = await get(habits_model, obj);
            return new Response(
              JSON.stringify({
                sucess: true,
                message: "Data retrieved",
                result: result,
              }),
              { status: 200 }
            );
          } catch (error) {
            return new Response(
              JSON.stringify({
                sucess: false,
                message: "Error while getting data",
                error: error,
              }),
              { status: 500 }
            );
          }
          break;
        case "findOne":
          try {
            const result = await getOne(habits_model, obj);
            return new Response(
              JSON.stringify({
                sucess: true,
                message: "Data retrieved",
                result: result,
              }),
              { status: 200 }
            );
          } catch (error) {
            return new Response(
              JSON.stringify({
                sucess: false,
                message: "Error while getting data",
                error: error,
              }),
              { status: 500 }
            );
          }
          break;
        default:
          return new Response(
            JSON.stringify({
              message: "Invalid mode",
            }),
            { status: 400 }
          );
          break;
      }
      break;
  }
};
