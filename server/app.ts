import mongo from "connect-mongo";
import { promisify } from "es6-promisify";
import express, { Router } from "express";
import expressGraphQL from "express-graphql";
import session from "express-session";
import mongoose from "mongoose";
import { AddressInfo } from "net";
import passport from "passport";
import { Strategy } from "passport-local";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import { webpackConfig } from "../webpack.config";
import { IUserModel, User } from "./models/user";
import schema from "./schema/schema";
import path from "path";

export interface IController {
  // path: string;
  router: Router;
}

export class App {
  public app: express.Application;
  private MONGO_URI = "mongodb://james:password1@ds161517.mlab.com:61517/auth"; // todo: move to env file and change password

  constructor() {
    this.app = express();

    this.app.set("port", 4000);

    this.app.use(express.static(path.join(__dirname, 'index.html')));
    this.connectToTheDatabase();
    this.initializeLogins();
    this.setupMiddleware();
    this.setupPassport();
  }

  public listen() {
    const server = this.app.listen(this.app.get("port"), () => {
      console.log(
        `Express running → PORT ${(server.address() as AddressInfo).port}`
      );
    });
    console.log(`trying to serve: ${path.join(__dirname, 'index.html')}`);
  }

  private initializeLogins() {
    const MongoStore = mongo(session);

    this.app.use(
      session({
        resave: true,
        saveUninitialized: true,
        secret: "aaabbbccc",
        store: new MongoStore({
          mongooseConnection: mongoose.connection
        })
      })
    );

    // promisify some callback based APIs
    this.app.use((req, res, next) => {
      (req as any).login = promisify(req.login.bind(req));
      next();
    });
  }

  private connectToTheDatabase() {
    mongoose.Promise = global.Promise;
    mongoose
      .connect(this.MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true
      })
      .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
      })
      .catch(err => {
        console.log(
          "MongoDB connection error. Please make sure MongoDB is running. " +
            err
        );
      });
  }

  private setupMiddleware() {
    // Passport is wired into express as a middleware. When a request comes in,
    // Passport will examine the request's session (as set by the above config) and
    // assign the current user to the 'req.user' object.  See also services/auth.ts
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    // Instruct Express to pass on any request made to the '/graphql' route
    // to the GraphQL instance.
    this.app.use(
      "/graphql",
      expressGraphQL({
        schema,
        graphiql: true
      })
    );

    // Webpack runs as a middleware.  If any request comes in for the root route ('/')
    // Webpack will respond with the output of the webpack process: an HTML file and
    // a single bundle.js output of all of our client side Javascript
    // this.app.use(
    //   webpackMiddleware(webpack(webpackConfig), {
    //     publicPath: webpackConfig.output!.publicPath as string
    //   })
    // );
  }

  private setupPassport() {
    // todo: perhaps refactor to use passport-local-mongoose
    // Instructs Passport how to authenticate a user using a locally saved email
    // and password combination.  This strategy is called whenever a user attempts to
    // log in.  We first find the user model in MongoDB that matches the submitted email,
    // then check to see if the provided password matches the saved password. There
    // are two obvious failure points here: the email might not exist in our DB or
    // the password might not match the saved one.  In either case, we call the 'done'
    // callback, including a string that messages why the authentication process failed.
    // This string is provided back to the GraphQL client.
    passport.use(
      new Strategy({ usernameField: "email" }, (email, password, done) => {
        User.findOne({ email: email.toLowerCase() }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Invalid Credentials" });
          }
          user.comparePassword(password, (passwordErr, isMatch) => {
            if (passwordErr) {
              return done(passwordErr);
            }
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false, { message: "Invalid Credentials" });
          });
        });
      })
    );
    // SerializeUser is used to provide some identifying token that can be saved
    // in the users session.  We traditionally use the 'ID' for this.
    passport.serializeUser<IUserModel, string>((user, done) => {
      done(null, user.id);
    });
    // The counterpart of 'serializeUser'.  Given only a user's ID, we must return
    // the user object.  This object is placed on 'req.user'.
    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
        done(err, user);
      });
    });
  }
}
