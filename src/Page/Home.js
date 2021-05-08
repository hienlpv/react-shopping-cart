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
          <div className="header-account">
            <img
              class="profile-icon"
              src="https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd910ba50954c702e.png"
              alt=""
            />
            <span class="header-account-dropdown">
              <span>Đăng Nhập / Đăng Ký</span>
              <span class="account-label">
                <span>Tài khoản</span>
                <img
                  class="arrowIcon"
                  src="https://salt.tikicdn.com/ts/upload/d7/d4/a8/34939af2da1ceeeae9f95b7485784233.png"
                  alt=""
                ></img>
              </span>
            </span>
            <div className="header-account-dropdown-content">
              <button>Đăng nhập</button>
              <button>Tạo tài khoản</button>
            </div>
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
