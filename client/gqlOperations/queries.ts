import gql from "graphql-tag";

/*
 * Write graphql mutations and queries here, then run npm run generate.
 * The typescript types will be generated in server/generated/types.tsx
 * Use the generated types in react components.
 * */

export const getUserQuery = gql`
  query getUserQuery {
    user {
      id
      email
    }
  }
`;
