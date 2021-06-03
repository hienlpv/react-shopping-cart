import React, { Component } from "react";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import {
  addProductToCart,
  removeProductFromCart,
  decreaseProductFromCart,
  increaseProductFromCart,
} from "../actions/cartActions";
class CartProducts extends Component {
  render() {
    const cartItems = this.props.cartItems;
    let count = cartItems.reduce((a, item, index) => {
      a.push(item.count);
      return a;
    }, []);
    return (
      <div className="cart-products">
        {cartItems.map((item, index) => (
          <div className="cart-item-box">
            <img src={item.image[item.imgIndex]} alt="" />
            <h5 className="item-title">{item.title}</h5>
            <div className="item-price">
              {item.price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </div>
            <div className="item-group-count">
              {count[index] === 1 ? (
                <IconButton disabled color="primary">
                  <RemoveIcon></RemoveIcon>
                </IconButton>
              ) : (
                <IconButton
                  color="primary"
                  onClick={() => {
                    this.props.decreaseProductFromCart(cartItems, item);
                  }}
                >
                  <RemoveIcon></RemoveIcon>
                </IconButton>
              )}
              {count[index]}
              <IconButton
                color="primary"
                onClick={() => {
                  this.props.increaseProductFromCart(cartItems, item);
                }}
              >
                <AddIcon></AddIcon>
              </IconButton>
            </div>
            <div className="item-control">
              <IconButton
                color="primary"
                onClick={() =>
                  this.props.removeProductFromCart(this.props.cartItems, item)
                }
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default connect((state) => ({ cartItems: state.cart.cartItems }), {
  addProductToCart,
  removeProductFromCart,
  decreaseProductFromCart,
  increaseProductFromCart,
})(CartProducts);
