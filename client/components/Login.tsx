import React from "react";

class Login extends React.Component {
  public render() {
    return (
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Login;
