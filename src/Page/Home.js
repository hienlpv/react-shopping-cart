import React from "react";
import { connect } from "react-redux";
import Products from "../components/Products";
import Modal from "react-modal";
import Fade from "react-reveal/Fade";
import TextField from "@material-ui/core/TextField";
import { Button, IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import MenuBar from "../components/MenuBar";
import { cleanCart } from "../actions/cartActions";
import { searchProducts } from "../actions/productActions";

class Home extends React.Component {
  state = {
    isLogin: localStorage.getItem("user") ? true : false,
    showModalSignup: false,
    showModalLogin: false,
    dataSignup: { name: "", username: "", password: "", email: "", phone: "" },
    dataLogin: { username: "", password: "" },
    alert: null,
    usernName: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "",
    search: "",
  };

  submitSignup = (e) => {
    e.preventDefault();
    fetch(`/api/account/${this.state.dataSignup.username}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.type === "warning") {
          this.setState({
            signupNoti: res,
          });
        } else {
          fetch("/api/account", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.dataSignup),
          })
            .then((res) => res.json())
            .then((res) => {
              this.setState({ alert: res });
              setTimeout(() => {
                this.setState({
                  alert: null,
                  showModalSignup: false,
                  showModalLogin: true,
                });
              }, 1000);
            });
        }
      });
  };

  submitLogin = (e) => {
    e.preventDefault();
    fetch("/api/account/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.dataLogin),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.type === "success") {
          this.setState({
            showModalLogin: false,
            isLogin: true,
            usernName: res.msg,
          });
          localStorage.setItem("user", JSON.stringify(res.msg));
        } else {
          this.setState({ alert: res });
          setTimeout(() => {
            this.setState({ alert: null });
          }, 1000);
        }
      });
  };

  handleInputSignup = (e) => {
    let dataSignup = Object.assign(this.state.dataSignup);
    dataSignup[e.target.name] = e.target.value;
    this.setState({ dataSignup });
  };

  handleInputLogin = (e) => {
    let dataLogin = Object.assign(this.state.dataLogin);
    dataLogin[e.target.name] = e.target.value;
    this.setState({ dataLogin });
  };

  Search = (e) => {
    let keyword = e.target.value;
    this.setState({ [e.target.name]: keyword });
    this.props.searchProducts(this.props.Products, keyword);
  };

  render() {
    return (
      <div className="homePage">
        <div className="grid-container">
          <header>
            <a className="title" href="/">
              React Shopping Cart
            </a>
            <div className="header-search">
              <input
                name="search"
                type="text"
                value={this.state.search}
                onChange={this.Search}
              ></input>
              <button>
                <img
                  class="icon-search"
                  src="https://salt.tikicdn.com/ts/upload/ed/5e/b8/8538366274240326978318348ea8af7c.png"
                  alt=""
                ></img>
                Tìm kiếm
              </button>
            </div>
            {this.state.isLogin ? (
              <div className="header-account">
                <img
                  class="profile-icon"
                  src="https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd910ba50954c702e.png"
                  alt=""
                />
                <span class="header-account-dropdown">
                  <span>Tài khoản</span>
                  <span class="account-label">
                    <span>{this.state.usernName.name}</span>
                    <img
                      class="arrowIcon"
                      src="https://salt.tikicdn.com/ts/upload/d7/d4/a8/34939af2da1ceeeae9f95b7485784233.png"
                      alt=""
                    ></img>
                  </span>
                </span>
                <Fade top>
                  <div className="header-account-dropdown-content">
                    <ul>
                      <li
                        onClick={() => {
                          this.props.history.push("/user");
                        }}
                      >
                        Thông tin tài khoản
                      </li>
                      <li
                        onClick={() => {
                          this.setState({
                            isLogin: false,
                            usernName: "",
                          });
                          localStorage.removeItem("user");
                          this.props.cleanCart();
                        }}
                      >
                        Đăng Xuất
                      </li>
                    </ul>
                  </div>
                </Fade>
              </div>
            ) : (
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
                <Fade top>
                  <div className="header-account-dropdown-content">
                    <button
                      onClick={() => {
                        this.setState({ showModalLogin: true });
                      }}
                    >
                      Đăng nhập
                    </button>
                    <button
                      onClick={() => {
                        this.setState({ showModalSignup: true });
                      }}
                    >
                      Tạo tài khoản
                    </button>
                  </div>
                </Fade>
              </div>
            )}

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
          <div className="content">
            <MenuBar></MenuBar>
            <Products></Products>
          </div>
          {this.state.showModalSignup && (
            <Modal isOpen="true" portalClassName="modal modal-signup">
              <IconButton
                onClick={() => {
                  this.setState({ showModalSignup: false });
                }}
              >
                <CloseIcon color="primary"></CloseIcon>
              </IconButton>
              <div className="form-wrap">
                <h1>Đăng ký</h1>
                <form
                  className="form-sign-up"
                  Validate
                  onSubmit={this.submitSignup}
                >
                  <TextField
                    required
                    label="Họ và tên"
                    name="name"
                    onChange={this.handleInputSignup}
                  />
                  <TextField
                    required
                    label="UserName"
                    name="username"
                    onChange={this.handleInputSignup}
                  />
                  <TextField
                    required
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handleInputSignup}
                  />
                  <TextField
                    required
                    label="Email"
                    name="email"
                    type="email"
                    onChange={this.handleInputSignup}
                  />
                  <TextField
                    required
                    label="Số điện thoại"
                    name="phone"
                    onChange={this.handleInputSignup}
                  />
                  <Button type="submit" color="primary" variant="outlined">
                    Sign Up
                  </Button>
                </form>
                {this.state.alert && (
                  <Alert severity={this.state.alert.type}>
                    {this.state.alert.msg}
                  </Alert>
                )}
              </div>
            </Modal>
          )}
          {this.state.showModalLogin && (
            <Modal isOpen="true" portalClassName="modal modal-login">
              <IconButton
                onClick={() => {
                  this.setState({ showModalLogin: false });
                }}
              >
                <CloseIcon color="primary"></CloseIcon>
              </IconButton>
              <div className="form-wrap">
                <h1>Đăng nhập</h1>
                <form
                  className="form-login"
                  Validate
                  onSubmit={this.submitLogin}
                >
                  <TextField
                    required
                    label="UserName"
                    name="username"
                    onChange={this.handleInputLogin}
                  />
                  <TextField
                    required
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handleInputLogin}
                  />
                  <Button type="submit" color="primary" variant="outlined">
                    Log in
                  </Button>
                </form>
                {this.state.alert && (
                  <Alert severity={this.state.alert.type}>
                    {this.state.alert.msg}
                  </Alert>
                )}
              </div>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
    Products: state.products.items,
  }),
  {
    cleanCart,
    searchProducts,
  }
)(Home);
