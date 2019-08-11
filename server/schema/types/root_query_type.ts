import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType
} from "graphql";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType"
});
