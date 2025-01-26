import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export const validateBody = async (body: any, validation_class: any) => {
  // convertingn the plain object to a class instance
  const habit = plainToInstance(validation_class, body);
  // validating the class instance
  const errors = validate(habit);
  // if there are errors, return them
  return errors;
};
