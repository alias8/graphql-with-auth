import React, { FormEvent } from "react";

interface IProps {
  onSubmit: (email: string, password: string) => void;
}

interface IState {
  email: string;
  password: string;
}

class AuthForm extends React.Component<IProps, IState> {
  public state = {
    email: "",
    password: ""
  };

  public render() {
    const { email, password } = this.state;
    return (
      <div className={"row"}>
        <form className={"col s6"} onSubmit={this.onSubmit}>
          <div className={"input-field"}>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>

          <div className={"input-field"}>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>

          <button className={"btn"}>Submit</button>
        </form>
      </div>
    );
  }

  private onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.onSubmit(email, password);
  };
}

export default AuthForm;
