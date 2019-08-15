import React from "react";
import { GetUserProps, withGetUser } from "../../server/generated/types";

type IProps = GetUserProps;

class Header extends React.Component<IProps> {
  public render() {
    const loggedIn = this.props.data && this.props.data.user;
    const loading = this.props.data && this.props.data.loading;
    if(loading) {
      return (
        <div/>
      );
    } else {
      if (loggedIn) {
        return (
          <div>
            <div>Logged in as {this.props.data!.user!.email}</div>
            <button>Log out</button>
          </div>
        );
      } else {
        return (
          <div>
            <button>Login</button>
            <button>Signup</button>
          </div>
        );
      }
    }
  }
}

export default withGetUser<IProps>()(Header);
