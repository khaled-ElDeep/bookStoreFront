import React, { Component } from "react";
import cart from "../images/cart.png";
import { NavLink, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

class NavBar extends Component {
  state = { user: {} };
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("tokenKey");

      this.setState({ user: jwtDecode(jwt) });
    } catch (ex) {
      return null;
    }
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <nav
          className="fixed-top navbar navbar-expand-lg "
          style={{ height: 70, background: "#fff" }}
        >
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand scroll" to="/Home">
                <img
                  src={
                    "http://www.jemome.com/cdn/2012/05/bookstore-logo_303603.png"
                  }
                  alt="logo"
                  className="brand_logo"
                  style={{ width: 150, height: 80 }}
                />
              </Link>
            </div>

            <div
              className="collapse navbar-collapse"
              id="mobile-navbar-collapse"
            >
              <ul className="navbar-nav ml-auto text-center">
                {!user && (
                  <React.Fragment>
                    <li className="">
                      <NavLink className="nav-item nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li className="">
                      <NavLink className="nav-item nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}
                {user.role === "admin" && (
                  <React.Fragment>
                    <li className="">
                      <NavLink className="nav-item nav-link" to="/create">
                        Add-Book
                      </NavLink>
                    </li>
                    <li className="">
                      <NavLink
                        className="nav-item nav-link"
                        to={{ pathname: "/user", state: { user: user } }}
                      >
                        {user.username}
                      </NavLink>
                    </li>
                    <li className="">
                      <NavLink
                        className="nav-item nav-link"
                        onClick={() => localStorage.setItem("tokenKey", "")}
                        to="/login"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}
                {user.role === "user" && (
                  <React.Fragment>
                    <li className="">
                      <NavLink
                        className="nav-item nav-link"
                        to={{ pathname: "/user", state: { user: user } }}
                      >
                        {user.username}
                      </NavLink>
                    </li>
                    <li className="">
                      <NavLink className="nav-item nav-link" to="/login">
                        Logout
                      </NavLink>
                    </li>

                    <li className="">
                      <Link
                        className="nav-item nav-link"
                        to={{
                          pathname: "/cart"
                          // state: { hi: this.props.count, data: this.props.data }
                        }}
                      >
                        <img
                          src={cart}
                          alt="logo"
                          style={{ width: 50, height: 50 }}
                        />
                        {this.props.count}
                      </Link>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
