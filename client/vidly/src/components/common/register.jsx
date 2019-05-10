import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { getToken } from "./../../services/movieService";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", username: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(8)
      .label("Password"),
    username: Joi.string()
      .required()
      .label("Username")
  };

  doSubmit = async () => {
    // Call the server
    const { data } = this.state;
    // const token = await getToken("users", data);

    try {
      const token = await getToken("users", data);
      if (token) window.location = "/login";
      console.log(this.state.data, token);
    } catch (ex) {
      //   if (ex.response && ex.response.status === 400) {
      //     const errors = { ...this.state.errors };
      //     errors.username = ex.response.data;
      //     this.setState({ errors });
      //   }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ paddingTop: "150px", background: "#212529" }}>
          <h1
            style={{
              fontFamily: "Just Another Hand,cursive",
              textAlign: "center",
              padding: "30px",
              color: "#fff"
            }}
          >
            Register
          </h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email", "mail", "E-mail")}
            {this.renderInput("password", "Password", "password", "Password")}
            {this.renderInput("username", "Username", "text", "Username")}
            {this.renderButton("Register")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
