import React, { Component } from "react";
import NavBar from "./navBar";
import axios from "axios";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      reviews: [],
      msg: ""
    };
  }
  async componentWillMount() {
    const { user } = this.props.location.state;
    // console.log("state", this.props.location.state);
    const res = await axios.get(
      "http://localhost:5000/api/reviews/users/" + user.userId
    );

    if (res.data.message) {
      this.setState({ msg: res.data.message });
    } else {
      this.setState({ reviews: res.data.data });
    }
    this.setState({ user: this.props.location.state.user });
  }

  onEditReview = (item, index) => {
    console.log(item.review, index);
    document.getElementById(index).style = "visibility : visible;";
  };

  onEditSubmit = async (e, item, index) => {
    e.preventDefault();
    const [input] = e.target.children;
    var { reviews } = this.state;
    const targetIdx = reviews.findIndex(rev => rev.review === item.review);

    const res = await axios.patch(
      "http://localhost:5000/api/reviews/" + item._id,
      {
        review: input.value
      }
    );
    if (res) {
      // console.log(res.data);
      reviews[targetIdx] = res.data;
      document.getElementById(index).style = "visibility : hidden;";
      this.setState({ reviews: reviews });
    }
  };

  onEditProfile = async () => {
    const { user } = this.state;
    console.log("edit user profile ", user);
  };
  render() {
    const { reviews, user, msg } = this.state;
    return (
      <React.Fragment>
        <NavBar />
        <div
          className="border"
          style={{
            marginTop: 100,
            marginBottom: 20,
            padding: 35,
            width: "100%"
          }}
        >
          <button
            style={{ float: "right", margin: "0 auto" }}
            onClick={() => this.onEditProfile()}
          >
            Edit Profile
          </button>
          <label>Name : {user.username}</label>
          <p>{"<    ||    >"}</p>
          <label>Email : {user.email}</label>
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
                          <img
                            src={item.image}
                            alt={item.image}
                            width={150}
                            height={150}
                            style={{ float: "right" }}
                          />
                          <div className="card-text">{item.review}</div>
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => this.onEditReview(item, index)}
                          >
                            Edit Review
                          </button>
                          <form
                            onSubmit={e => this.onEditSubmit(e, item, index)}
                          >
                            <input
                              style={{ visibility: "hidden" }}
                              id={index}
                              type="text"
                            />
                          </form>
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

export default UserPage;
