import "reflect-metadata";
import "./shared/container/dependencies";
import { server } from "./server";
import dotenv from "dotenv";

dotenv.config({
  path: "./src/environment/.env",
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`API rodando na porta ${process.env.SERVER_PORT}`);
});
