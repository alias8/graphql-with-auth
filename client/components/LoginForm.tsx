import React, { FormEvent } from "react";
import {
  GetUserQueryProps,
  LoginMutationProps,
  withGetUserQuery,
  withLoginMutation, withLogoutMutation
} from "../../server/generated/types";
import AuthForm from "./AuthForm";

type IProps = LoginMutationProps & GetUserQueryProps;

class LoginForm extends React.Component<IProps> {
  public render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm onSubmit={this.onSubmit} />
      </div>
    );
  }

  private onSubmit = (email: string, password: string) => {
    this.props.mutate!({
      variables: {
        email,
        password
      },
    })
      .then(() => {
        /*
         * We can use refetch() here because we want to call the getUser
         * query again, and this component knows what that is.
         * */
        return this.props.data!.refetch();
        /*
        * after this query runs, we get the logged in user, and that is
        * sent to every component that uses getUserQuery (the Header)
        * */
      });
  };
}

export default withLoginMutation()(withGetUserQuery()(LoginForm));
