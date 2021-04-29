// Test 1
import React from "react";
import { Route, Switch } from "react-router";
import Admin from "./Page/Admin";
import Home from "./Page/Home";
import Cart from "./Page/Cart";

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/" component={Home} exact></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
