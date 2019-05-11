import React, { Component } from "react";
import NavBar from "./navBar";
import axios from "axios";

class SingleBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.location.state.data,
      reviews: [],
      msg: ""
    };
  }

  async componentDidMount() {
    const { product } = this.state;
    const res = await axios.get(
      "http://localhost:5000/api/reviews/products/" + product._id
    );

    if (res.data.message) {
      this.setState({ msg: res.data.message });
    } else {
      console.log("reviews", res.data.data);
      this.setState({ reviews: res.data.data });
    }
    this.setState({ product: this.props.location.state.data });
  }

  render() {
    const { product, reviews, msg } = this.state;

    return (
      <React.Fragment>
        <NavBar />
        <div className="card mb-3">
          <div
            className="row no-gutters"
            style={{ width: "100%", height: "100%" }}
          >
            <div className="col-md-4">
              <img
                src={product.image}
                className="card-img"
                alt="..."
                style={{ width: "40%", marginLeft: 150, marginTop: 100 }}
              />
            </div>
            <div className="col-md-8">
              <div
                className="card-body"
                style={{ marginLeft: 10, marginTop: 100 }}
              >
                <h1 className="card-title">{product.title}</h1>
                <h3 className="card-text">{product.authors}</h3>
                <br />
                <h5>Book Details</h5>
                <p className="card-text">
                  In Stock{" "}
                  <small className="text-muted">{product.in_stock}</small>
                  <br />
                  Lang <small className="text-muted">{product.lang}</small>
                  <br />
                  Price <small className="text-muted">{product.price}</small>
                  <br />
                  Isbn <small className="text-muted">{product.isbn}</small>
                  <br />
                  Publication_year{" "}
                  <small className="text-muted">
                    {product.publication_year}
                  </small>
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <h2>User Reviews</h2>
          {!msg ? (
            <div className="border container">
              <div className="row">
                {reviews.map((item, index) => {
                  return (
                    <div className="col-md-12" key={index}>
                      <div className="card card-inverse card-info">
                        <div className="card-block">
                          <div className="card-text">{item.username}</div>
                          <div className="card-text">{item.review}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <h1>{msg}</h1>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default SingleBook;
