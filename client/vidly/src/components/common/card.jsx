import React, { Component } from "react";
import Cart from "./cart";
import jwtDecode from "jwt-decode";
import Edit from "./edit";
import { Link } from "react-router-dom";

class BookCard extends Component {
  state = { user: {}, editItem: {} };
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("tokenKey");
      this.setState({ user: jwtDecode(jwt) });
    } catch (ex) {
      return null;
    }
  }
  getPagedData = () => {
    const { books } = this.props;

    let filtered = books;
    if (this.props.search)
      filtered = books.filter(m =>
        m.title.toLowerCase().startsWith(this.props.search.toLowerCase())
      );
    console.log(filtered, "filterd");
    return { filtered };
  };
  handleEdit = book => {
    window.location = "/editproduct";
    this.setState({ editItem: book });
    console.log(book, "handelEdit");
  };

  render() {
    const { user, editItem } = this.state;
    console.log(user.role, "User");
    console.log(this.state.Book, "Boooooks", this.props.books);
    let Book = this.props.books;
    let { filtered: Books } = this.getPagedData();

    if (Books.length === 0) return <p>There are no Books in the database.</p>;
    return (
      <div
        className="container-fluid "

        // width={"5"}
        // style={{ width: "100vw" }}
      >
        <div className="row">
          {Books.map((item, index) => (
            <div
              key={item._id}
              className="card col-3"
              // width={"10%"}
              style={{
                width: 10,
                marginTop: 10,
                marginLeft: 70,
                marginRight: 10,
                marginBottom: 5,
                // paddingBottom: 1,
                background: "#dadada"
              }}
            >
              <Link
                className="nav-item nav-link"
                to={{
                  pathname: "/editproduct",
                  state: { data: item }
                }}
              >
                <img
                  className="card-img-top"
                  src={item.image}
                  alt="Card image cap"
                  width={150}
                  height={200}
                />
              </Link>
              <div className="card-body" style={{ fontFamily: "Segoe UI " }}>
                <li
                  style={{ listStyleType: "none" }}
                  className=" d-flex justify-content-between align-items-center"
                >
                  <h5>{item.title}</h5>
                  <span className="badge badge-primary badge-pill">
                    {item.price} $
                  </span>
                </li>

                <div className="card-text">
                  <li style={{ listStyleType: "none" }}>
                    <h6>{item.authors}</h6>
                  </li>

                  <li className="d-flex justify-content-between align-items-center">
                    <p>
                      <span className="badge badge-primary">
                        {item.in_stock}
                      </span>
                      <span style={{ color: "red" }}>
                        {"  "}available in Store
                      </span>
                    </p>
                  </li>
                </div>
                {user.role === "user" && (
                  <React.Fragment>
                    <button
                      href="#"
                      className="btn btn-primary mr-4 ml-4"
                      onClick={() => this.props.onAdd(item)}
                    >
                      Add
                    </button>
                    <button
                      href="#"
                      className="btn btn-danger"
                      onClick={() => this.props.onRemove(item)}
                    >
                      Remove
                    </button>
                  </React.Fragment>
                )}
                {user.role == "admin" && (
                  <React.Fragment>
                    <Link
                      to={{
                        pathname: "/editproduct",
                        state: { data: item }
                      }}
                    >
                      <button
                        href="#"
                        className="btn btn-primary mr-4 ml-4"
                        // onClick={() => this.handleEdit(item)}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      href="#"
                      className="btn btn-danger"
                      onClick={() => this.props.onDelete(item)}
                    >
                      Delete
                    </button>
                  </React.Fragment>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default BookCard;
