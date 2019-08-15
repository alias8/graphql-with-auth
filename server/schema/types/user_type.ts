import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const UserType: any = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    email: {
      type: GraphQLString
    }
  })
});
