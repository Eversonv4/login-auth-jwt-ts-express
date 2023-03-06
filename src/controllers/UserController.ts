import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  // create a new user
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    // Verify if user exists
    const userExists = await userRepository.findOneBy({ email });
    if (userExists) {
      throw new BadRequestError("E-mail already exists");
    }

    // converts user password to a hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create a new instance of the user
    const newUser = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    // save data to database
    await userRepository.save(newUser);

    return res.status(201).json({ name, email });
  }

  // authenticating a user
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // verify if user exists
    const isUserExists = await userRepository.findOneBy({ email });
    if (!isUserExists) {
      throw new BadRequestError("Email or password invalid");
    }

    // compares a password passed by the user with the password registered in database
    const verifyIfPasswordMatches = await bcrypt.compare(
      password,
      isUserExists.password
    );

    if (!verifyIfPasswordMatches) {
      throw new BadRequestError("Email or password invalid");
    }

    // configuring json web token, the first param we pass a specific data related to the user, the second is a important param it's a password which will validate our token or recreate another one, usually we use a difficult password or a hash password that no one will ever discorver. The third param it is the time we want to expire this token. We can pass the time in seconds (ex: 10) ten seconds, or we can pass (ex: "8h"), eight hours, or (ex: "2d") two days.
    const token = jwt.sign({ id: isUserExists.id }, "abc123doremi", {
      expiresIn: "1d",
    });

    const { password: _, ...userLogin } = isUserExists;

    return res.status(200).json({
      user: userLogin,
      token: token,
    });
  }

  // access a private route using token
  async getProfileData(req: Request, res: Response) {
    return res.status(200).json(req.user);
  }
}

const userController = new UserController();
export { userController };
