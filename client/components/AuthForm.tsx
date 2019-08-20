import React from "react";

interface IState {
  email: string;
  password: string;
}

class AuthForm extends React.Component<{}, IState> {
  public state = {
    email: "",
    password: ""
  };

  public render() {
    const { email, password } = this.state;
    return (
      <div className={"row"}>
        <form className={"col s6"}>
          <div className={"input-field"}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>

          <div className={"input-field"}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>

          <button className={"btn"} >Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
