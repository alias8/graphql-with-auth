import React, { FormEvent } from "react";
import styles from "../styles/styles.scss";

interface IProps {
  onSubmit: (email: string, password: string) => void;
  errors: string[];
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
          <div className={styles.errors}>
            {this.props.errors.map(error => {
              return <div key={error}>{error}</div>;
            })}
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
