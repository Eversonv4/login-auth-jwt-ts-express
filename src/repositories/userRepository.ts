import { AppDataSource } from "../data-source";
import { User } from "../entities";

export const userRepository = AppDataSource.getRepository(User);
