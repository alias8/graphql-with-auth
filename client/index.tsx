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
import Home from "./components/Home";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";

const client = new ApolloClient({
  /*
   * we need this so that cookies are sent with each graphql request,
   * otherwise we will not be able to check  login status.
   * // todo: why is this not working??
   * */
  // link: new HttpLink(),
  link: createHttpLink({
    uri: "/graphql",
    credentials: "same-origin"
  }),
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
              <Route exact={true} path={"/login"} component={Login} />
              <Route component={NoMatch} />
            </Switch>
          </App>
        </Router>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<Root />, document.querySelector("#root"));
