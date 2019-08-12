import { GraphQLObjectType, GraphQLString } from "graphql";
import { AuthenticationService } from "../services/authenticationService";
import { UserType } from "./types/user_type";

export const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: {
          type: GraphQLString
        },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthenticationService.signup({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        // we could move this to AuthenticationService if we wanted
        const {user} = req;
        req.logout(); // http://www.passportjs.org/docs/logout/
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: {
          type: GraphQLString
        },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthenticationService.login({ email, password, req });
      }
    },
  }
});
