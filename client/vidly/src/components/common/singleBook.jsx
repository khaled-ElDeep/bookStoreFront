import React, { Component } from "react";
class SingleBook extends Component {
  state = { product: this.props.location.state.data };

  render() {
    const { product } = this.state;
    console.log(product);

    return (
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
              <h2 className="card-title">{product.title}</h2>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBook;
