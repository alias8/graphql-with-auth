import passport from "passport";
import { User } from "../models/user";

export class AuthenticationController {
  private login = ({ email, password, req }) => {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err, user) => {
        if (!user) {
          reject("Invalid credentials.");
        }

        req.login(user, () => resolve(user));
      })({ body: { email, password } });
    });
  };

  private signup = ({ email, password, req }) => {
    const user = new User({ email, password });
    if (!email || !password) {
      throw new Error("You must provide an email and password.");
    }

    return User.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          throw new Error("Email in use");
        }
        return user.save();
      })
      .then(user1 => {
        return new Promise((resolve, reject) => {
          req.logIn(user1, err => {
            if (err) {
              reject(err);
            }
            resolve(user1);
          });
        });
      });
  };
}
