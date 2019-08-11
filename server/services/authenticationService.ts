import passport from "passport";
import { User } from "../models/user";

export class AuthenticationService {
  public static login = ({ email, password, req }) => {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err, user) => {
        if (!user) {
          reject("Invalid credentials.");
        }

        req.login(user, () => resolve(user));
      })({ body: { email, password } });
    });
  };

  public static signup = ({ email, password, req }) => {
    if (!email || !password) {
      throw new Error("You must provide an email and password.");
    }

    return User.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          throw new Error("Email in use");
        }
        const user = new User({email, password});
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
}
