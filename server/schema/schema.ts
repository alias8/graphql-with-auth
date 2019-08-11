import { GraphQLSchema } from "graphql";
import { RootQuery } from "./types/root_query_type";

export default new GraphQLSchema({
  query: RootQuery
});
