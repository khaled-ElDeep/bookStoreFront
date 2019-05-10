import React, { Component } from "react";
import NavBar from "./navBar";
import BookCard from "./card";
import CartBook from "./cartBooks";
class Cart extends Component {
  state = {};
  render() {
    // const { hi, data } = this.props.location.state;
    // let set = new Set(data.map(JSON.stringify));
    // let Book = Array.from(set).map(JSON.parse);

    return (
      <React.Fragment>
        <NavBar />
        <div style={{ marginTop: 100, width: "100%" }}>
          <CartBook />
        </div>
      </React.Fragment>
    );
  }
}

export default Cart;
