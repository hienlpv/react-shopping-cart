import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import Modal from "react-modal";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ProductDetail from "./ProductDetail";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      noti: false,
      typeSort: "",
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  productClick = (product) => {
    this.setState({
      product: product,
    });
  };
  handleSortClick = (e) => {
    let typeSort = document.querySelectorAll(".product-wrap ul li");
    typeSort.forEach((i) => (i.style.fontWeight = "300"));
    e.target.style.fontWeight = "500";
    this.setState({ typeSort: e.target.id });
    console.log(this.state);
  };
  sortProducts = () => {
    let newProducts = this.props.products.slice();
    switch (this.state.typeSort) {
      case "new":
        return newProducts.reverse();
      case "low":
        return newProducts.sort((a, b) => a.price - b.price);
      case "hight":
        return newProducts.sort((a, b) => b.price - a.price);
      default:
        return newProducts;
    }
  };

  render() {
    return (
      <div className="product-wrap">
        <nav>
          <ul>
            <li id="new" onClick={this.handleSortClick}>
              Mới nhất
            </li>
            <li id="hight" onClick={this.handleSortClick}>
              Giá cao
            </li>
            <li id="low" onClick={this.handleSortClick}>
              Giá thấp
            </li>
          </ul>
        </nav>
        <div className="product">
          {this.props.products &&
            this.sortProducts().map((item) => (
              <div
                className="product-box"
                onClick={() => {
                  this.productClick(item);
                }}
              >
                <div className="product-img">
                  <img src={item.image[0]} alt=""></img>
                </div>
                <div className="product-title">{item.title}</div>
                <div className="product-price">
                  {item.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            ))}
          {this.state.product && (
            <Modal isOpen="true" portalClassName="modal">
              <IconButton
                onClick={() => {
                  this.setState({ product: null });
                }}
              >
                <CloseIcon color="primary"></CloseIcon>
              </IconButton>
              <ProductDetail
                product={this.state.product}
                type="home"
              ></ProductDetail>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    products: state.products.filteredItems,
    cartItems: state.cart.cartItems,
  }),
  {
    fetchProducts,
  }
)(Products);
