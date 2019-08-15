/* tslint:disable */
import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApollo from 'react-apollo';
export type Maybe<T> = T | null;
export type MaybePromise<T> = Promise<T> | T;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Mutation = {
  __typename?: 'Mutation',
  signup?: Maybe<UserType>,
  logout?: Maybe<UserType>,
  login?: Maybe<UserType>,
};


export type MutationSignupArgs = {
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>
};


export type MutationLoginArgs = {
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>
};

export type RootQueryType = {
  __typename?: 'RootQueryType',
  user?: Maybe<UserType>,
};

export type UserType = {
  __typename?: 'UserType',
  id?: Maybe<Scalars['ID']>,
  email?: Maybe<Scalars['String']>,
};
export type GetUserQueryVariables = {};


export type GetUserQuery = ({ __typename?: 'RootQueryType' } & { user: Maybe<({ __typename?: 'UserType' } & Pick<UserType, 'id' | 'email'>)> });

export const GetUserDocument = gql`
    query getUser {
  user {
    id
    email
  }
}
    `;
export type GetUserComponentProps = Omit<ReactApollo.QueryProps<GetUserQuery, GetUserQueryVariables>, 'query'>;

    export const GetUserComponent = (props: GetUserComponentProps) => (
      <ReactApollo.Query<GetUserQuery, GetUserQueryVariables> query={GetUserDocument} {...props} />
    );
    
export type GetUserProps<TChildProps = {}> = Partial<ReactApollo.DataProps<GetUserQuery, GetUserQueryVariables>> & TChildProps;
export function withGetUser<TProps, TChildProps = {}>(operationOptions?: ReactApollo.OperationOption<
  TProps,
  GetUserQuery,
  GetUserQueryVariables,
  GetUserProps<TChildProps>>) {
    return ReactApollo.withQuery<TProps, GetUserQuery, GetUserQueryVariables, GetUserProps<TChildProps>>(GetUserDocument, {
      alias: 'withGetUser',
      ...operationOptions
    });
};