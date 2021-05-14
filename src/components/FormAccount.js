import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { fetchAccount } from "../actions/tableActions";

class FormAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupNoti: {},
      dataSignup: this.props.row
        ? this.props.row
        : {
            name: "",
            username: "",
            password: "",
            email: "",
            phone: "",
          },
    };
  }
  handleInputSignup = (e) => {
    let dataSignup = Object.assign(this.state.dataSignup);
    dataSignup[e.target.name] = e.target.value;
    this.setState({ dataSignup });
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
              this.setState({ signupNoti: res });
              this.props.fetchAccount();
            });
        }
      });
  };
  updateAccount = (e) => {
    e.preventDefault();
    fetch(`/api/account/${this.state.dataSignup.username}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.type === "warning") {
          this.setState({
            signupNoti: res,
          });
        } else {
          fetch("/api/account/update", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: this.state.dataSignup.id,
              name: this.state.dataSignup.name,
              username: this.state.dataSignup.username,
              password: this.state.dataSignup.password,
              email: this.state.dataSignup.email,
              phone: this.state.dataSignup.phone,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              this.setState({ signupNoti: res });
              this.props.fetchAccount();
            });
        }
      });
  };
  render() {
    const defaultData = this.state.dataSignup;
    switch (this.props.type) {
      case "add":
        return (
          <div>
            <h1>Thêm tài khoản</h1>
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
                Thêm tài khoản
              </Button>
              {this.state.signupNoti.type === "success" && (
                <Alert severity="success">{this.state.signupNoti.msg}</Alert>
              )}
              {this.state.signupNoti.type === "err" && (
                <Alert severity="error">{this.state.signupNoti.msg}</Alert>
              )}
              {this.state.signupNoti.type === "warning" && (
                <Alert severity="warning">{this.state.signupNoti.msg}</Alert>
              )}
            </form>
          </div>
        );
      case "edit":
        return (
          <div>
            <h1>Sửa Tài khoản</h1>
            <form
              className="form-sign-up"
              Validate
              onSubmit={this.updateAccount}
            >
              <TextField
                required
                label="Họ và tên"
                name="name"
                onChange={this.handleInputSignup}
                defaultValue={defaultData.name}
              />
              <TextField
                required
                label="UserName"
                name="username"
                onChange={this.handleInputSignup}
                defaultValue={defaultData.username}
              />
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={this.handleInputSignup}
                defaultValue={defaultData.password}
              />
              <TextField
                required
                label="Email"
                name="email"
                type="email"
                onChange={this.handleInputSignup}
                defaultValue={defaultData.email}
              />
              <TextField
                required
                label="Số điện thoại"
                name="phone"
                onChange={this.handleInputSignup}
                defaultValue={defaultData.phone}
              />
              <Button type="submit" color="primary" variant="outlined">
                Sửa tài khoản
              </Button>
              {this.state.signupNoti.type === "success" && (
                <Alert severity="success">{this.state.signupNoti.msg}</Alert>
              )}
              {this.state.signupNoti.type === "err" && (
                <Alert severity="error">{this.state.signupNoti.msg}</Alert>
              )}
              {this.state.signupNoti.type === "warning" && (
                <Alert severity="warning">{this.state.signupNoti.msg}</Alert>
              )}
            </form>
          </div>
        );
      default:
        return <div></div>;
    }
  }
}

export default connect(() => ({}), { fetchAccount })(FormAccount);
