import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Connect from "./components/connect";
import "./App.css";
import Productlist from "./components/try";
import Pro from "./components/try2";
import HomePage from "./components/homePage";
import Cart from "./components/common/cart";
import LoginForm from "./components/common/login";
import RegisterForm from "./components/common/register";
import Edit from "./components/common/edit";
import AddBook from "./components/common/addBook";
import SingleBook from "./components/common/singleBook";
import UserPage from "./components/common/userPage";
import FrontPage from "./components/common/frontPage";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          {/*<Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm} />
    <Route path="/movies" component={Movies} />*/}
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/editproduct" component={Edit} />
          <Route path="/create" component={AddBook} />
          <Route path="/book" component={SingleBook} />
          <Route path="/user" component={UserPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/cart" component={Cart} />
          <Route path="/front" component={FrontPage} />
          <Route path="/not-found" component={HomePage} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
