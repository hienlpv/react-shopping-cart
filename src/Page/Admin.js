import React, { Component } from "react";
import { connect } from "react-redux";
import AdminControl from "../components/AdminControl";
import "../index.css";
import Table from "../components/Table";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Admin extends Component {
  state = {
    isLogin: true,
    username: "",
    password: "",
  };
  handleInputLogin = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitLogin = (e) => {
    e.preventDefault();
    if (
      this.state.username === "teonv123" &&
      this.state.password === "teonv123"
    ) {
      this.setState({ isLogin: true });
    }
  };
  render() {
    return (
      <div className="adminPage">
        {!this.state.isLogin && (
          <div className="adminLogin">
            <form Validate onSubmit={this.submitLogin}>
              <TextField
                required
                id="standard-required"
                label="UserName"
                name="username"
                onChange={this.handleInputLogin}
              />
              <TextField
                required
                id="standard-password-input"
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={this.handleInputLogin}
              />
              <Button type="submit" color="primary" variant="outlined">
                Login
              </Button>
            </form>
          </div>
        )}
        {this.state.isLogin && (
          <div className="grid-container">
            <header>
              <a href="/">React Shopping Cart</a>
            </header>
            <main>
              <div className="content">
                <AdminControl></AdminControl>
                <Table></Table>
              </div>
            </main>
            <footer>All right is reserved.</footer>
          </div>
        )}
      </div>
    );
  }
}

export default connect(() => ({}), {})(Admin);
