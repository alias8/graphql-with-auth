import React from "react";
import { Route, RouteComponentProps, withRouter } from "react-router";
import {
  GetUserQueryProps,
  SignupMutationProps,
  withGetUserQuery,
  withSignupMutation
} from "../../server/generated/types";
import AuthForm from "./AuthForm";

export default <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  type IProps = GetUserQueryProps & RouteComponentProps;

  class RequireAuth extends React.Component<IProps> {
    public componentDidMount() {
      if (!this.props.data!.user && !this.props.data!.loading) {
        this.props.history.push("/login");
      }
    }
    public render() {
      const { ...props } = this.props;
      return <WrappedComponent {...(props as P)} />;
    }
  }
  return withGetUserQuery()(withRouter(RequireAuth));
};
