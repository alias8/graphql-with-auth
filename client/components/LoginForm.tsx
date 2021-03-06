import React, { FormEvent } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import {
  GetUserQueryProps,
  LoginMutationProps,
  withGetUserQuery,
  withLoginMutation,
  withLogoutMutation
} from "../../server/generated/types";
import AuthForm from "./AuthForm";

type IProps = LoginMutationProps & GetUserQueryProps & RouteComponentProps;

interface IState {
  errors: string[];
}

class LoginForm extends React.Component<IProps, IState> {
  public state = {
    errors: []
  };

  public componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ) {
    // user now signed in when they weren't before
    if (this.props.data!.user && !prevProps.data!.user) {
      // redirect to dashboard
      this.props.history.push("/dashboard");
    }
  }

  public render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm onSubmit={this.onSubmit} errors={this.state.errors} />
      </div>
    );
  }

  private onSubmit = (email: string, password: string) => {
    this.props.mutate!({
      variables: {
        email,
        password
      }
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
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({
          errors
        });
      });
  };
}

export default withLoginMutation()(withGetUserQuery()(withRouter(LoginForm)));
