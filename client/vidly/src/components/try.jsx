import React, { Component } from "react";
//import Axios from "axios";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";

class Productlist extends Component {
  getProducts = async () => {
    const { data: products } = await axios.get(
      "http://test-api.edfa3ly.io/product"
    );
    console.log(products);
    {
      /*}    axios.get("http://test-api.edfa3ly.io/product").then(prod => {
      this.setState({
        products: prod.data.slice(0, 20)
      });
    });*/
    }
  };

  render() {
    return (
      <div className="row">
        <button className="btn btn-primary m-4" onClick={this.getProducts} />

        <h1>Hi</h1>
      </div>
    );
  }
}

export default Productlist;
