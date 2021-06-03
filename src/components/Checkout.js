import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { cleanCart } from "../actions/cartActions";
import Alert from "@material-ui/lab/Alert";

class Checkout extends Component {
  state = {
    address: "",
    alert: null,
  };

  HandleAddress = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addOrder = async () => {
    let priceTotal = this.props.cartItems.reduce((total, item) => {
      total += item.count * item.price;
      return total;
    }, 0);
    let data = {
      username: this.props.userName.username,
      address: this.state.address,
      total: priceTotal,
      products: this.props.cartItems,
    };
    console.log(data);
    fetch("/api/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.type === "success") {
          this.props.cleanCart();
        }

        this.setState({ alert: res });
        setTimeout(() => {
          this.setState({ alert: null, address: "" });
        }, 1000);
      });
  };

  render() {
    let priceTotal = this.props.cartItems.reduce((total, item) => {
      total += item.count * item.price;
      return total;
    }, 0);
    return (
      <div className="checkout">
        {this.props.isLogin && (
          <ul className="user-detail">
            <li>Thông tin khách hàng</li>
            <li>
              Tên: <span>{this.props.userName.name}</span>
            </li>
            <li>
              Email: <span>{this.props.userName.email}</span>
            </li>
            <li>
              SĐT: <span>{this.props.userName.phone}</span>
            </li>
            <li>
              Địa chỉ:{" "}
              <textarea
                name="address"
                value={this.state.address}
                onChange={this.HandleAddress}
              ></textarea>
            </li>
          </ul>
        )}
        <div className="price-total">
          <span>Tổng Cộng:</span>
          <p>
            {priceTotal.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
        <Button variant="outlined" color="primary" onClick={this.addOrder}>
          Thanh Toán
        </Button>
        {this.state.alert && (
          <Alert severity={this.state.alert.type}>{this.state.alert.msg}</Alert>
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { cleanCart }
)(Checkout);
