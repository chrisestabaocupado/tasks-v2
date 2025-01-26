import type { APIRoute } from "astro";
import { validateBody } from "src/utils/validateBody";
import { insert } from "src/models/mongoose.utils";
import { habits_model, Habit } from "../../models/schemas/habits.schema";

export const POST: APIRoute = async ({ request }) => {
  let body = await request.json();
  body.created_at = new Date();
  body.updated_at = new Date("1900-01-01");
  const validation = await validateBody(body, Habit);
  if (validation.length > 0) {
    return new Response(
      JSON.stringify({
        message: "There are errors in the body",
        validation,
      }),
      { status: 400 }
    );
  }
  try {
    const inserted = await insert(habits_model, body);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Data inserted",
        results: inserted,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        succes: false,
        message: "Error while inserting data",
        error: error,
      }),
      { status: 500 }
    );
  }
};
