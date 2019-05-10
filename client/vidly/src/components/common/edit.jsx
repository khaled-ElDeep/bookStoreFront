import React from "react";
import Joi from "joi-browser";
import EditForm from "./editForm";
import { update } from "../../services/movieService";
//import { getMovie, saveMovie } from "../services/movieService";
//import { getGenres } from "../services/genreService";
import axios from "axios";

class Edit extends EditForm {
  state = {
    data: {
      title: "",
      isbn: "",
      authors: "",
      in_stock: "",
      rating: "",
      image: "",
      lang: "",
      price: ""
    },
    genres: [],
    errors: {},
    item: this.props.location.state
  };

  schema = {
    title: Joi.string().label("Title"),
    isbn: Joi.number()
      .max(999999999)
      .label("Isbn"),
    authors: Joi.string().label("Authors"),
    in_stock: Joi.number()
      .max(1000)
      .label("In_stock"),
    rating: Joi.number()
      .max(5)
      .label("Rating"),
    image: Joi.string().label("Image"),
    lang: Joi.string().label("Lang"),
    price: Joi.number()
      .max(1000)
      .label("Price")
  };
  doSubmit = async () => {
    let { data, item } = this.state;

    // console.log("lol", lol);
    if (Object.values(data).filter(item => item !== "").length !== 0) {
      console.log(item.data._id);
      const token = localStorage.getItem("tokenKey");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      data = Object.entries(data)
        .filter(item => item[1] !== "")
        .reduce((accum, [k, v]) => {
          accum[k] = v;
          return accum;
        }, {});
      const res = await update("products", item.data._id, data);
      if (res) {
        console.log("success");
        window.location = "/";
      } else {
        setTimeout(() => {
          console.log("failed");
        }, 2000);
      }
    }
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

export default Edit;
