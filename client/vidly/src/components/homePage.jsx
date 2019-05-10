import React, { Component } from "react";
import "./style/homeStyle.css";
import NavBar from "./common/navBar";
import BookCard from "./common/card";
import SearchBox from "./common/searchBox";
import { getMovies, deleteBook, addCart } from "../services/movieService";
import axios from "axios";
import jwtDecode from "jwt-decode";

let count = 0;

class HomePage extends Component {
  state = {
    Books: [],
    cartData: [],
    cart: 0,
    searchQuery: ""
  };
  async componentDidMount() {
    const { data } = await getMovies("products");

    this.setState({ Books: data.data });
  }

  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  handleAdd = async book => {
    // console.log(book, "kk");
    // // this.setState({ movies });
    const jwt = localStorage.getItem("tokenKey");
    const { userId } = jwtDecode(jwt);
    const { data } = await addCart("cart/add/" + userId, {
      productId: book._id.toString()
    });

    const cnt = data.items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

    this.setState({ cart: cnt });
    ///deleteMovie(movie._id);
  };
  handleRemove = book => {
    const cartData = this.state.Books.filter(m => m.name === book.name);
    // this.setState({ movies });
    count -= 1;
    this.setState({ cart: count, cartData });
    ///deleteMovie(movie._id);
    console.log(cartData, this.state.cart);
  };

  handleDelete = async book => {
    const token = localStorage.getItem("tokenKey");

    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const { data } = await deleteBook("products", book._id);
    window.location = "/";

    //this.setState({ Books:Deleted });
    console.log(data);
  };
  render() {
    const { searchQuery, Books, cart, cartData } = this.state;
    console.log(Books, "oppo");
    return (
      <React.Fragment>
        <NavBar count={cart} data={cartData} />
        {console.log(cart, "lll")}
        <div
          style={{
            marginTop: 100,
            marginBottom: 20,
            marginLeft: "35%",
            width: 400
          }}
        >
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
        </div>
        <BookCard
          books={Books}
          search={searchQuery}
          onAdd={this.handleAdd}
          onRemove={this.handleRemove}
          onDelete={this.handleDelete}
        />
      </React.Fragment>
    );
  }
}

export default HomePage;
