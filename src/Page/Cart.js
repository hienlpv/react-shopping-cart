import React, { Component } from "react";
import formatCurrency from "../utils";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { addProductToCart } from "../actions/productActions";
import { removeProductFromCart } from "../actions/cartActions";
import { addOrder } from "../actions/tableActions";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      name: "",
      email: "",
      phone: "",
      address: "",
    };
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = (e) => {
    let products = [];
    this.props.cartItems.forEach((item) => {
      products.push(item._id);
    });
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      products: products,
    };
    this.props.addOrder(order);
  };
  render() {
    // localStorage.setItem("cartItems", []);
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image[0]} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={async () => {
                          await this.props.removeProductFromCart(
                            cartItems,
                            item
                          );
                          if (this.props.cartItems.length === 0)
                            this.setState({ showCheckout: false });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div className="cart">
            <div className="total">
              <div>
                Total{" "}
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button
                onClick={() => {
                  this.setState({ showCheckout: true });
                }}
                className="button primary"
              >
                Proceed
              </button>
            </div>
          </div>
        )}
        {this.state.showCheckout && (
          <Fade right cascade>
            <div className="cart">
              <form onSubmit={this.createOrder}>
                <ul className="form-container">
                  <li>
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      onChange={this.handleInput}
                      required
                    ></input>
                  </li>
                  <li>
                    <label>Name</label>
                    <input
                      name="name"
                      type="text"
                      onChange={this.handleInput}
                      required
                    ></input>
                  </li>
                  <li>
                    <label>Phone</label>
                    <input
                      name="phone"
                      type="text"
                      onChange={this.handleInput}
                      required
                    ></input>
                  </li>
                  <li>
                    <label>Address</label>
                    <input
                      name="address"
                      type="text"
                      onChange={this.handleInput}
                      required
                    ></input>
                  </li>
                  <li>
                    <button className="button primary" type="submit">
                      Checkout
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          </Fade>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { addProductToCart, removeProductFromCart, addOrder }
)(Cart);
