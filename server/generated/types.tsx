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
export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & {
  logout: Maybe<{ __typename?: "UserType" } & Pick<UserType, "id" | "email">>;
};

export type GetUserQueryVariables = {};

export type GetUserQuery = { __typename?: "RootQueryType" } & {
  user: Maybe<{ __typename?: "UserType" } & Pick<UserType, "id" | "email">>;
};

export const LogoutDocument = gql`
  mutation logout {
    logout {
      id
      email
    }
  }
`;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutMutationVariables
>;
export type LogoutComponentProps = Omit<
  ReactApollo.MutationProps<LogoutMutation, LogoutMutationVariables>,
  "mutation"
>;

export const LogoutComponent = (props: LogoutComponentProps) => (
  <ReactApollo.Mutation<LogoutMutation, LogoutMutationVariables>
    mutation={LogoutDocument}
    {...props}
  />
);

export type LogoutProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutMutationVariables>
> &
  TChildProps;
export function withLogout<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, {
    alias: "withLogout",
    ...operationOptions
  });
}
export const GetUserDocument = gql`
  query getUser {
    user {
      id
      email
    }
  }
`;
export type GetUserComponentProps = Omit<
  ReactApollo.QueryProps<GetUserQuery, GetUserQueryVariables>,
  "query"
>;

export const GetUserComponent = (props: GetUserComponentProps) => (
  <ReactApollo.Query<GetUserQuery, GetUserQueryVariables>
    query={GetUserDocument}
    {...props}
  />
);

export type GetUserProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetUserQuery, GetUserQueryVariables>
> &
  TChildProps;
export function withGetUser<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GetUserQuery,
    GetUserQueryVariables,
    GetUserProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GetUserQuery,
    GetUserQueryVariables,
    GetUserProps<TChildProps>
  >(GetUserDocument, {
    alias: "withGetUser",
    ...operationOptions
  });
}
