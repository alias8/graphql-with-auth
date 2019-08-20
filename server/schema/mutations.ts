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
        // console.log("james 2", req.user);
        return AuthenticationService.logout(req);
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
    }
  }
});
