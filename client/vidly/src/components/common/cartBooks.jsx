import React, { Component } from "react";
import Cart from "./cart";
import Input from "./input";
import { getCart } from "../../services/movieService";
import jwtDecode from "jwt-decode";
import { addCart } from "./../../services/movieService";
import Select from "./select";

class CartBook extends Component {
  constructor() {
    super();
    this.state = {
      cart: { items: [], total: 0 },
      userId: "",
      total: 0
    };
  }

  async componentDidMount() {
    const jwt = localStorage.getItem("tokenKey");
    // console.log(jwt);
    const { userId } = jwtDecode(jwt);
    const { data } = await getCart("cart/" + userId);
    this.setState({ cart: data, userId: userId });
  }

  onRemove = async item => {
    // const token = localStorage.getItem("tokenKey");
    const { userId } = this.state;
    // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const { data } = await addCart("cart/delete/" + userId, {
      productId: item.productId
    });
    // console.log(data, "dat a");
    this.setState({ cart: data });

    //this.setState({ Books:Deleted });
    // console.log(data);
  };
  handlePrice = async ({ currentTarget: input }, item) => {
    const { userId } = this.state;

    const { data } = await addCart("cart/add/" + userId, {
      quantity: input.value,
      productId: item.productId
    });
    this.setState({ cart: data });
  };

  render() {
    const { cart, total } = this.state;
    // const data = getCart();
    // console.log("cart", data);

    if (cart.items.length === 0)
      return <p>There are no carts in the database.</p>;
    // console.log(cart, "carts");
    return (
      <div className="container" style={{ width: "100%" }}>
        <div className="row" style={{ width: "100%" }}>
          {cart.items.map((item, index) => (
            <div
              key={index}
              className="card col-3 "
              style={{ width: "10%", marginRight: 5, marginBottom: 10 }}
            >
              <img
                className="card-img-top"
                src={item.product.image}
                alt="Card image cap"
                width={150}
                height={200}
              />
              <div className="card-body">
                <h5 className="card-title">{item.product.title}</h5>
                <p className="card-text">
                  {item.product.price}
                  {item.product.authors}
                </p>
                {/* <input
                  type={"number"}
                  name={"name"}
                  min={1}
                  max={item.product.in_stock}
                  placeholder={item.quantity}
                /> */}
                <Select
                  name={"select"}
                  label={"quantity"}
                  options={[
                    { _id: "1", name: "1" },
                    { _id: "2", name: "2" },
                    { _id: "3", name: "3" }
                  ]}
                  onChange={e => this.handlePrice(e, item)}
                />
                <h6>{item.product.price * item.quantity}</h6>
                <button
                  href="#"
                  className="btn btn-danger m-4"
                  onClick={() => this.onRemove(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      // <h1>55</h1>
    );
  }
}

export default CartBook;
