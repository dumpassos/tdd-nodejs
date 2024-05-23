import dotenv from "dotenv";
import app from "./app.ts";

dotenv.config();

app.listen(process.env.PORT);