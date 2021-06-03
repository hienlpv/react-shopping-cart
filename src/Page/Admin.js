import React, { Component } from "react";
import { connect } from "react-redux";
import AdminControl from "../components/AdminControl";
import "../index.css";
import Table from "../components/Table";
import TextField from "@material-ui/core/TextField";
import Modal from "react-modal";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

class Admin extends Component {
  state = {
    isLogin: localStorage.getItem("isLogin") ? true : false,
    username: "",
    password: "",
    alert: null,
  };
  handleInputLogin = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitLogin = (e) => {
    e.preventDefault();
    if (this.state.username === "admin" && this.state.password === "admin") {
      this.setState({ isLogin: true });
      localStorage.setItem("isLogin", "Admin");
    } else if (this.state.username !== "admin") {
      this.setState({ alert: { type: "warning", msg: "Sai tên tài khoản" } });
    } else if (this.state.password !== "admin") {
      this.setState({ alert: { type: "warning", msg: "Sai mật khẩu" } });
    }
  };
  render() {
    return (
      <div className="adminPage">
        {!this.state.isLogin && (
          <Modal isOpen="true" portalClassName="modal modal-login">
            <div className="form-wrap">
              <h1>Đăng nhập</h1>
              <form className="form-login" Validate onSubmit={this.submitLogin}>
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
        {this.state.isLogin && (
          <div className="grid-container">
            <header>
              <h1 className="title" href="/">
                HELLO! ADMIN
              </h1>
            </header>
            <div className="content">
              <AdminControl></AdminControl>
              <Table></Table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(() => ({}), {})(Admin);
