import { IsDate, IsString } from "class-validator";
import mongoose from "mongoose";
export class Habit {
  @IsString()
  user_mail: string;

  @IsString()
  habit_title: string;

  @IsString()
  describe: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;
}
export class Habit_Record {
  @IsString()
  user_mail: string;

  @IsString()
  habit_title: string;

  @IsString()
  describe: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;
}
const habits_schema = new mongoose.Schema({
  user_mail: { type: String, required: true },
  habit_title: { type: String, required: true },
  describe: { type: String, required: false },
  created_at: { type: Date, required: false },
  updated_at: { type: Date, required: false },
});
export const habits_model = mongoose.model("habits", habits_schema);
