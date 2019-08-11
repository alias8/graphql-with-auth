import mongo from "connect-mongo";
import { promisify } from "es6-promisify";
import express, { Router } from "express";
import expressGraphQL from "express-graphql";
import session from "express-session";
import mongoose from "mongoose";
import { AddressInfo } from "net";
import passport from "passport";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import { webpackConfig } from "../webpack.config";
import { User } from "./models/user";
import schema from "./schema/schema";

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
    this.setupPassport();
    this.connectToTheDatabase();
    this.initializeLogins();
    this.setupMiddleware();
  }

  public listen() {
    const server = this.app.listen(this.app.get("port"), () => {
      console.log(
        `Express running → PORT ${(server.address() as AddressInfo).port}`
      );
    });
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
    // assign the current user to the 'req.user' object.  See also servces/auth.ts
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
    this.app.use(
      webpackMiddleware(webpack(webpackConfig), {
        publicPath: webpackConfig.output!.publicPath as string
      })
    );
  }

  private setupPassport() {
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
  }
}
