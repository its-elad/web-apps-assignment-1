import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  MONGO_URI: z.string(),
  PORT: z.string(),
});

export const env = envSchema.parse(process.env);
