import React from "react";
import { connect } from "react-redux";
import Filter from "../components/Filter";
import Products from "../components/Products";

class Home extends React.Component {
  render() {
    return (
      <div className="grid-container">
        <header>
          <a className="title" href="/">
            React Shopping Cart
          </a>
          <div className="header-search">
            <input type="text"></input>
            <button>
              <img
                class="icon-search"
                src="https://salt.tikicdn.com/ts/upload/ed/5e/b8/8538366274240326978318348ea8af7c.png"
                alt=""
              ></img>
              Tìm kiếm
            </button>
          </div>
          <div className="header-cart">
            <a href="/cart">
              <div className="header-cart-content">
                <div className="cart-wrapper">
                  <img
                    className="cart-icon"
                    src="https://salt.tikicdn.com/ts/upload/40/44/6c/b80ad73e5e84aeb71c08e5d8d438eaa1.png"
                    alt=""
                  ></img>
                  <span>{this.props.cartItems.length}</span>
                </div>
                <span className="cart-text">Giỏ hàng</span>
              </div>
            </a>
            <div className="cart-noti">
              <button>x</button>
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
          </div>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter></Filter>
              <Products></Products>
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default connect(
  (state) => ({ cartItems: state.cart.cartItems }),
  {}
)(Home);
