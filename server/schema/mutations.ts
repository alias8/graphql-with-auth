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
      // @ts-ignore
      resolve(parentValue, { email, password }, req) {
        console.log(`trying to find ${email} ${password}`);
        return AuthenticationService.signup({ email, password, req });
      }
    }
  }
});
