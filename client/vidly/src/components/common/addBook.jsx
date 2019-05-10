import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { update } from "../../services/movieService";
//import { getMovie, saveMovie } from "../services/movieService";
//import { getGenres } from "../services/genreService";
import axios from "axios";
import { addBook } from "./../../services/movieService";

class AddBook extends Form {
  state = {
    data: {
      title: "",
      isbn: "",
      authors: "",
      in_stock: "",
      rating: "",
      image: "",
      lang: "",
      price: "",
      publication_year: ""
    },
    genres: [],
    errors: {},
    item: this.props.location.state
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    isbn: Joi.number()
      .required()
      .max(999999999)
      .label("Isbn"),
    authors: Joi.string().label("Authors"),
    in_stock: Joi.number()
      .required()

      .max(1000)
      .label("In_stock"),
    rating: Joi.number()
      .required()

      .max(5)
      .label("Rating"),
    image: Joi.string()
      .required()
      .label("Image"),
    lang: Joi.string()
      .required()
      .label("Lang"),
    price: Joi.number()
      .required()
      .max(1000)
      .label("Price"),
    publication_year: Joi.date().required()
  };
  doSubmit = async () => {
    let { data } = this.state;
    const token = localStorage.getItem("tokenKey");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const res = await addBook("products", data);
    window.location = "/";
  };

  render() {
    const product = this.props.location.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text")}
          {this.renderInput("isbn", "Isbn", "text")}
          {this.renderInput("in_stock", "In_stock", "number")}
          {this.renderInput("authors", "Authors", "text")}
          {/* {this.renderInput(
            "publication_year",
            "Publication_year",
            "date",
          
          )} */}
          {this.renderInput("publication_year", "publication_year", "date")}
          {this.renderInput("lang", "Lang", "text")}
          {this.renderInput("rating", "Rating", "number")}
          {this.renderInput("image", "Image", "text")}
          {this.renderInput("price", "Price", "number")}
          {this.renderButton("submit")}
        </form>
      </div>
    );
  }
}

export default AddBook;
