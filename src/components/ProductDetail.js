import React, { Component } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { Button, IconButton } from "@material-ui/core";
import { addProductToCart } from "../actions/cartActions";
import { Alert } from "@material-ui/lab";

class ProductDetail extends Component {
  state = {
    count: 1,
    imgIndex: 0,
    alert: null,
  };

  HandleColorBox = (index) => {
    let ColorBoxs = document.querySelectorAll(".color-box");
    ColorBoxs.forEach((item) => item.classList.remove("active"));
    ColorBoxs[index].classList.add("active");
    this.setState({
      imgIndex: index,
    });
  };

  componentDidMount() {
    let ColorBoxs = document.querySelectorAll(".color-box");
    ColorBoxs[this.state.imgIndex].classList.add("active");
  }

  render() {
    const product = this.props.product;

    return (
      <div>
        {this.props.type === "home" && (
          <div className="product-detail">
            <div className="main-img">
              <img src={product.image[this.state.imgIndex]} alt="" />
            </div>
            <div className="detail">
              <div className="detail-mark">
                <h6>
                  Thương hiệu: <span>{product.mark}</span>
                </h6>
              </div>
              <div className="detail-title">
                <h1>{product.title}</h1>
              </div>
              <div className="detail-price">
                {product.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
              <div className="detail-colors">
                {product.colors.map((color, index) => (
                  <div
                    className="color-box"
                    onClick={() => this.HandleColorBox(index)}
                  >
                    <img disabled src={product.image[index]} alt=""></img>
                    <span disabled>{color}</span>
                  </div>
                ))}
              </div>
              <div className="detail-pay">
                <div className="pay-count">
                  <span>Số lượng: </span>
                  <div className="group-count">
                    {this.state.count === 1 ? (
                      <IconButton disabled color="primary">
                        <RemoveIcon></RemoveIcon>
                      </IconButton>
                    ) : (
                      <IconButton
                        color="primary"
                        onClick={() => {
                          this.setState({ count: this.state.count - 1 });
                        }}
                      >
                        <RemoveIcon></RemoveIcon>
                      </IconButton>
                    )}
                    {this.state.count}
                    <IconButton
                      color="primary"
                      onClick={() =>
                        this.setState({ count: this.state.count + 1 })
                      }
                    >
                      <AddIcon></AddIcon>
                    </IconButton>
                  </div>
                </div>
                <div clasName="pay-btn">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={async () => {
                      await this.props.addProductToCart(this.props.cartItems, {
                        ...product,
                        imgIndex: this.state.imgIndex,
                        count: this.state.count,
                      });
                      this.setState({
                        alert: {
                          type: "success",
                          msg: "Thêm vào giỏ hàng thành công",
                        },
                      });
                      setTimeout(() => {
                        this.setState({ alert: null });
                      }, 1000);
                    }}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              </div>
              {this.state.alert && (
                <Alert severity={this.state.alert.type}>
                  {this.state.alert.msg}
                </Alert>
              )}
            </div>
          </div>
        )}
        {this.props.type === "admin" && (
          <div className="product-detail">
            <div className="main-img">
              <img src={product.image[this.state.imgIndex]} alt="" />
            </div>
            <div className="detail">
              <div className="detail-mark">
                <h6>
                  Thương hiệu: <span>{product.mark}</span>
                </h6>
              </div>
              <div className="detail-title">
                <h1>{product.title}</h1>
              </div>
              <div className="detail-price">
                {product.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
              <div className="detail-colors">
                {product.colors.map((color, index) => (
                  <div
                    className="color-box"
                    onClick={() => this.HandleColorBox(index)}
                  >
                    <img disabled src={product.image[index]} alt=""></img>
                    <span disabled>{color}</span>
                  </div>
                ))}
              </div>
              {this.state.alert && (
                <Alert severity={this.state.alert.type}>
                  {this.state.alert.msg}
                </Alert>
              )}
            </div>
          </div>
        )}

        <div className="product-description">
          <h1>Mô tả sản phẩm</h1>
          <ul>
            {product.description
              .split("\n")
              .filter((i) => i !== "")
              .map((item) => (
                <li>
                  <ul>
                    {item.split("\t").map((item) => (
                      <li>{item.replace(",", "\n")}</li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  {
    addProductToCart,
  }
)(ProductDetail);
