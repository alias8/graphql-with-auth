import gql from "graphql-tag";

/*
 * Write graphql mutations and queries here, then run npm run generate.
 * The typescript types will be generated in server/generated/types.tsx
 * Use the generated types in react components.
 * */

export const logoutMutation = gql`
  mutation logoutMutation {
    logout {
      id
      email
    }
  }
`;

export const loginMutation = gql`
  mutation loginMutation($email: String, $password: String) {
    login(email: $email, password: $password) {
      email
      id
    }
  }
`;

export const signupMutation = gql`
  mutation signupMutation($email: String, $password: String) {
    signup(email: $email, password: $password) {
      email
      id
    }
  }
`;
