import { GraphQLObjectType, GraphQLString } from "graphql";

export const UserType: any = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    email: {
      type: GraphQLString
    }
  })
});
