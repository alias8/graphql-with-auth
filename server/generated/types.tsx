/* tslint:disable */
import gql from "graphql-tag";
import * as ReactApollo from "react-apollo";
import * as React from "react";
export type Maybe<T> = T | null;
export type MaybePromise<T> = Promise<T> | T;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: "Mutation";
  signup?: Maybe<UserType>;
  logout?: Maybe<UserType>;
  login?: Maybe<UserType>;
};

export type MutationSignupArgs = {
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type MutationLoginArgs = {
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type RootQueryType = {
  __typename?: "RootQueryType";
  user?: Maybe<UserType>;
};

export type UserType = {
  __typename?: "UserType";
  id?: Maybe<Scalars["ID"]>;
  email?: Maybe<Scalars["String"]>;
};
export type LogoutMutationMutationVariables = {};

export type LogoutMutationMutation = { __typename?: "Mutation" } & {
  logout: Maybe<{ __typename?: "UserType" } & Pick<UserType, "id" | "email">>;
};

export type LoginMutationMutationVariables = {
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type LoginMutationMutation = { __typename?: "Mutation" } & {
  login: Maybe<{ __typename?: "UserType" } & Pick<UserType, "email" | "id">>;
};

export type SignupMutationMutationVariables = {
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type SignupMutationMutation = { __typename?: "Mutation" } & {
  signup: Maybe<{ __typename?: "UserType" } & Pick<UserType, "email" | "id">>;
};

export type GetUserQueryQueryVariables = {};

export type GetUserQueryQuery = { __typename?: "RootQueryType" } & {
  user: Maybe<{ __typename?: "UserType" } & Pick<UserType, "id" | "email">>;
};

export const LogoutMutationDocument = gql`
  mutation logoutMutation {
    logout {
      id
      email
    }
  }
`;
export type LogoutMutationMutationFn = ReactApollo.MutationFn<
  LogoutMutationMutation,
  LogoutMutationMutationVariables
>;
export type LogoutMutationComponentProps = Omit<
  ReactApollo.MutationProps<
    LogoutMutationMutation,
    LogoutMutationMutationVariables
  >,
  "mutation"
>;

export const LogoutMutationComponent = (
  props: LogoutMutationComponentProps
) => (
  <ReactApollo.Mutation<LogoutMutationMutation, LogoutMutationMutationVariables>
    mutation={LogoutMutationDocument}
    {...props}
  />
);

export type LogoutMutationProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    LogoutMutationMutation,
    LogoutMutationMutationVariables
  >
> &
  TChildProps;
export function withLogoutMutation<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LogoutMutationMutation,
    LogoutMutationMutationVariables,
    LogoutMutationProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LogoutMutationMutation,
    LogoutMutationMutationVariables,
    LogoutMutationProps<TChildProps>
  >(LogoutMutationDocument, {
    alias: "withLogoutMutation",
    ...operationOptions
  });
}
export const LoginMutationDocument = gql`
  mutation loginMutation($email: String, $password: String) {
    login(email: $email, password: $password) {
      email
      id
    }
  }
`;
export type LoginMutationMutationFn = ReactApollo.MutationFn<
  LoginMutationMutation,
  LoginMutationMutationVariables
>;
export type LoginMutationComponentProps = Omit<
  ReactApollo.MutationProps<
    LoginMutationMutation,
    LoginMutationMutationVariables
  >,
  "mutation"
>;

export const LoginMutationComponent = (props: LoginMutationComponentProps) => (
  <ReactApollo.Mutation<LoginMutationMutation, LoginMutationMutationVariables>
    mutation={LoginMutationDocument}
    {...props}
  />
);

export type LoginMutationProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginMutationMutation, LoginMutationMutationVariables>
> &
  TChildProps;
export function withLoginMutation<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginMutationMutation,
    LoginMutationMutationVariables,
    LoginMutationProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LoginMutationMutation,
    LoginMutationMutationVariables,
    LoginMutationProps<TChildProps>
  >(LoginMutationDocument, {
    alias: "withLoginMutation",
    ...operationOptions
  });
}
export const SignupMutationDocument = gql`
  mutation signupMutation($email: String, $password: String) {
    signup(email: $email, password: $password) {
      email
      id
    }
  }
`;
export type SignupMutationMutationFn = ReactApollo.MutationFn<
  SignupMutationMutation,
  SignupMutationMutationVariables
>;
export type SignupMutationComponentProps = Omit<
  ReactApollo.MutationProps<
    SignupMutationMutation,
    SignupMutationMutationVariables
  >,
  "mutation"
>;

export const SignupMutationComponent = (
  props: SignupMutationComponentProps
) => (
  <ReactApollo.Mutation<SignupMutationMutation, SignupMutationMutationVariables>
    mutation={SignupMutationDocument}
    {...props}
  />
);

export type SignupMutationProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    SignupMutationMutation,
    SignupMutationMutationVariables
  >
> &
  TChildProps;
export function withSignupMutation<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    SignupMutationMutation,
    SignupMutationMutationVariables,
    SignupMutationProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    SignupMutationMutation,
    SignupMutationMutationVariables,
    SignupMutationProps<TChildProps>
  >(SignupMutationDocument, {
    alias: "withSignupMutation",
    ...operationOptions
  });
}
export const GetUserQueryDocument = gql`
  query getUserQuery {
    user {
      id
      email
    }
  }
`;
export type GetUserQueryComponentProps = Omit<
  ReactApollo.QueryProps<GetUserQueryQuery, GetUserQueryQueryVariables>,
  "query"
>;

export const GetUserQueryComponent = (props: GetUserQueryComponentProps) => (
  <ReactApollo.Query<GetUserQueryQuery, GetUserQueryQueryVariables>
    query={GetUserQueryDocument}
    {...props}
  />
);

export type GetUserQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetUserQueryQuery, GetUserQueryQueryVariables>
> &
  TChildProps;
export function withGetUserQuery<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GetUserQueryQuery,
    GetUserQueryQueryVariables,
    GetUserQueryProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GetUserQueryQuery,
    GetUserQueryQueryVariables,
    GetUserQueryProps<TChildProps>
  >(GetUserQueryDocument, {
    alias: "withGetUserQuery",
    ...operationOptions
  });
}
