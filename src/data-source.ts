import { DataSource } from "typeorm";
import Migrations from "./migrations";
import * as Entities from "./entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "root",
  database: "api-auth-jwt",
  entities: Object.values(Entities),
  migrations: [...Migrations],
});
