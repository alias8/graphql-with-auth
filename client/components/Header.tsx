import React from "react";
import { Link } from "react-router-dom";
import {
  GetUserQueryProps,
  LogoutMutationProps,
  withGetUserQuery,
  withLogoutMutation
} from "../../server/generated/types";

type IProps = GetUserQueryProps & LogoutMutationProps;

class Header extends React.Component<IProps> {
  public render() {
    return (
      <nav>
        <div className={"nav-wrapper"}>
          <Link to="/" className={"brand-logo left"}>
            Home
          </Link>
          <ul className={"right"}>{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }

  private onLogoutClick = () => {
    this.props.mutate!({}).then(() => {
      /*
       * We can use refetch() here because we want to call the getUser
       * query again, and this component knows what that is.
       * */
      return this.props.data!.refetch();
    });
  };

  private renderButtons = () => {
    const user = this.props.data && this.props.data.user;
    const loading = this.props.data && this.props.data.loading;
    if (loading) {
      return <div />;
    }
    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to={"/signup"}>Signup</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </div>
      );
    }
  };
}

export default withLogoutMutation()(withGetUserQuery()(Header));
