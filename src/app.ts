import "express-async-errors";
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { routes } from "./routes";
import { errorMiddleware } from "./middlewares/error";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(express.json());

    app.use(routes);

    app.use(errorMiddleware);
    return app.listen(3000, () => console.log("It's working!"));
  })
  .catch((error) => console.log(error));
