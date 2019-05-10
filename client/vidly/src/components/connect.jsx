import React, { Component } from "react";

import axios from "axios";
class Connect extends Component {
  state = { customers: [], customer: [], c: "" };
  async componentDidMount() {
    fetch("/app/customers")
      .then(res => res.json())
      .then(customers =>
        this.setState({ customers }, () => console.log("Customers", customers))
      );
    const { data: customer } = await axios.get("/app/customers");
    console.log(customer, "o");
  }
  handleClick = async () => {
    const obj = { id: 0, fname: "ramy", lName: "mohamed" };
    const { data: c } = await axios.post("/app/customers", obj);
    this.setState({ c });
    console.log(c);
  };
  render() {
    return (
      <div>
        <h1>56565</h1>
        <ul>
          {this.state.customers.map(customer => (
            <li key={customer.id}>
              {customer.fname}

              {customer.lName}
            </li>
          ))}
        </ul>
        <button className="btn btn-primary m-4" onClick={this.handleClick} />
        <h1>{this.state.c}llll</h1>
      </div>
    );
  }
}

export default Connect;
