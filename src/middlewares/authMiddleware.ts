import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";

type JwtPayload = {
  id: number;
};

// we created this middleware because we have to verify the token everytime a user need to access a private route, so we created a function to recycle this code instead of repeating code
export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).send({ message: "Not authorized!" });
  }

  const token = authorization.split(" ")[1];

  // verify if token is valid and returns the data passed in payload, in our case the user id ("id: isUserExists.id") remember? we pass a token we want to validate and the password unique we create to make sure that it's a token created by us ("abc123doremi")
  const { id } = jwt.verify(token, "abc123doremi") as JwtPayload;

  // verify if user exists
  const isUserExists = await userRepository.findOneBy({ id });
  if (!isUserExists) {
    return res.status(403).send({ message: "Not authorized!" });
  }

  const { password: _, ...loggedUser } = isUserExists;

  next();
};
