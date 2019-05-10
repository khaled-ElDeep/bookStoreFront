import React, { Component } from "react";
import Axios from "axios";
import StarRatingComponent from "react-star-rating-component";
import Pagination from "./paginate";
import paginate from "./paginate";
import Paginations from "./paginates";

class Productlist extends Component {
  state = {
    products: [],
    activePage: 1,
    currentPage: 1,
    pageSize: 4
  };

  getProducts() {
    Axios.get("http://test-api.edfa3ly.io/product").then(prod => {
      this.setState({
        products: prod.data.slice(0, 20)
      });
    });
  }

  componentDidMount() {
    this.getProducts();
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  getPagedData = () => {
    const { pageSize, currentPage, products } = this.state;

    const movies = paginate(products, currentPage, pageSize);

    return { movies };
  };
  render() {
    const { movies: products } = this.getPagedData();

    const productList = products.length ? (
      products.map(product => (
        <div className="product-container" key={product.id}>
          <div className="card product-card ">
            <img src={product.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">
                {product.price} <span>{product.currency}</span>
              </p>
              <p>{product.releaseDate}</p>
              <StarRatingComponent
                name="star"
                editing={false}
                renderStarIcon={() => <span>★</span>}
                starCount={5}
                value={product.rating}
                starColor="#ffb400"
                emptyStarColor="#dfdfdf"
              />
              <p>{product.color}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div />
    );

    return (
      <div className="row">
        {productList}
        <Paginations
          itemsCount={this.state.products.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Productlist;
