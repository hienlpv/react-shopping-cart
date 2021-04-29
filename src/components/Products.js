import React, { Component } from "react";
import formatCurrency from "../utils";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addProductToCart } from "../actions/productActions";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    const { product } = this.state;
    const { cartItems } = this.props;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>...Loading</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a
                      href={"#" + product._id}
                      onClick={() => {
                        this.setState({ product });
                      }}
                    >
                      <img src={product.image} alt={product.title}></img>
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div className="price">
                        {formatCurrency(product.price)}
                      </div>
                      <button
                        onClick={() =>
                          this.props.addProductToCart(cartItems, product)
                        }
                        className="button primary"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
        {product && (
          <Modal isOpen="true">
            <Zoom>
              <button
                className="close-modal"
                onClick={() => {
                  this.setState({ product: null });
                }}
              >
                x
              </button>
              <div className="product-detail">
                <img src={product.image} alt={product.title}></img>
                <div className="product-detail-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    AvailableSizes:{" "}
                    {product.availableSizes.map((size) => (
                      <span>
                        {" "}
                        <button>{size}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addProductToCart(cartItems, product);
                        this.setState({ product: null });
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
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
    addProductToCart,
  }
)(Products);
