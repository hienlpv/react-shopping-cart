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
      noti: false,
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
        {this.state.noti && (
          <div className="cart-noti">
            <button
              onClick={() => {
                this.setState({ noti: false });
              }}
            >
              x
            </button>
            <p class="status">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
              </svg>
              Thêm vào giỏ hàng thành công!
            </p>
          </div>
        )}
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
                        onClick={async () => {
                          await this.props.addProductToCart(cartItems, product);
                          this.setState({ noti: true });
                        }}
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
