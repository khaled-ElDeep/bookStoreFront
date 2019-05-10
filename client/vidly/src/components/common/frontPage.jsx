import React, { Component } from "react";
import "../style/frontPage.css";
//
class FrontPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <a
          className="login-trigger"
          href="#"
          data-target="#login"
          data-toggle="modal"
        >
          Login
        </a>

        <div id="login" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <button data-dismiss="modal" className="close">
                  &times;
                </button>
                <h4>Login</h4>
                <form>
                  <input
                    type="text"
                    name="username"
                    className="username form-control"
                    placeholder="Username"
                  />
                  <input
                    type="password"
                    name="password"
                    className="password form-control"
                    placeholder="password"
                  />
                  <input className="btn login" type="submit" value="Login" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FrontPage;
