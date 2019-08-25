import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { createHttpLink, HttpLink } from "apollo-link-http";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch
} from "react-router-dom";
import App from "./components/App";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import NoMatch from "./components/NoMatch";
import requireAuth from "./components/requireAuth";
import SignupForm from "./components/SignupForm";
import "./styles/styles.scss";

const client = new ApolloClient({
  /*
   * Some guides say we need this so that cookies are sent with each graphql request,
   * otherwise we will not be able to check  login status.
   * */
  // link: createHttpLink({
  //   uri: "/graphql",
  //   credentials: "same-origin"
  // }),

  // However, the cookies seem to be sent anyway without the above?
  link: new HttpLink(),

  cache: new InMemoryCache({
    dataIdFromObject: o => o.id
  })
});

class Root extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <App>
            <Switch>
              <Route exact={true} path={"/"} component={Home} />
              <Route exact={true} path={"/login"} component={LoginForm} />
              <Route exact={true} path={"/signup"} component={SignupForm} />
              <Route
                exact={true}
                path={"/dashboard"}
                component={requireAuth(Dashboard)}
              />
              <Route component={NoMatch} />
            </Switch>
          </App>
        </Router>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<Root />, document.querySelector("#root"));
