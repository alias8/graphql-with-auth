import express from "express";
import passport from "passport";
import { User } from "../models/user";

export class AuthenticationService {
  public static login = ({
    email,
    password,
    req
  }: {
    email: string;
    password: string;
    req: express.Request;
  }) => {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err, user) => {
        if (!user) {
          reject("Invalid credentials.");
        }
        req.login(user, () => resolve(user));
      })({ body: { email, password } });
    });
  };

  public static signup = ({
    email,
    password,
    req
  }: {
    email: string;
    password: string;
    req: express.Request;
  }) => {
    if (!email || !password) {
      throw new Error("You must provide an email and password.");
    }

    return User.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          throw new Error("Email in use");
        }
        const user = new User({ email, password });
        return user.save();
      })
      .then(newUser => {
        return new Promise((resolve, reject) => {
          req.logIn(newUser, err => {
            if (err) {
              reject(err);
            }
            resolve(newUser);
          });
        });
      });
  };

  public static logout = (req: express.Request) => {
    const { user } = req;
    req.logout(); // http://www.passportjs.org/docs/logout/
    return user;
  };
}
