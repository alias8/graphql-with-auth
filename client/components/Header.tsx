import React from "react";
import { GetUserProps, withGetUser } from "../../server/generated/types";
import {Link} from "react-router-dom";

type IProps = GetUserProps;

class Header extends React.Component<IProps> {
  public render() {

    return (
        <nav>
          <div className={"nav-wrapper"}>
            <Link to="/" className={"brand-logo left"}>
            Home
            </Link>
            <ul className={"right"}>
              {this.renderButtons()}
            </ul>
          </div>
        </nav>
    )
  }

  private renderButtons = () => {
    const user = this.props.data && this.props.data.user;
    const loading = this.props.data && this.props.data.loading;
    if (loading) {
      return (
          <div/>
      );
    }
    if (user) {
      return (
          <div>Logout</div>
      );
    } else {
      return (
          <div>You're not signed in</div>
      );
    }
  }


}

export default withGetUser<IProps>()(Header);
