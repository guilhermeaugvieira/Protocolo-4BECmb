import "reflect-metadata";
import "./shared/container/dependencies";
import { server } from "./server";

server.listen("3000", () => {
  console.log("API rodando na porta 3000");
});
