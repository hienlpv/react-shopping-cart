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
      alert: null,
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
            alert: res,
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
              this.props.fetchAccount();
              this.setState({ alert: res });
              setTimeout(() => {
                this.setState({ alert: null });
                document.querySelector(".form-sign-up").reset();
              }, 1000);
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
            alert: res,
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
              this.props.fetchAccount();
              this.setState({ alert: res });
              setTimeout(() => {
                this.setState({ alert: null });
              }, 1000);
            });
        }
      });
  };
  render() {
    switch (this.props.type) {
      case "add":
        return (
          <div className="form-wrap">
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
            </form>
            {this.state.alert && (
              <Alert severity={this.state.alert.type}>
                {this.state.alert.msg}
              </Alert>
            )}
          </div>
        );
      case "edit":
        return (
          <div className="form-wrap">
            <h1>Sửa tài khoản</h1>
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
                defaultValue={this.state.dataSignup.name}
              />
              <TextField
                required
                label="UserName"
                name="username"
                onChange={this.handleInputSignup}
                defaultValue={this.state.dataSignup.username}
              />
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={this.handleInputSignup}
                defaultValue={this.state.dataSignup.password}
              />
              <TextField
                required
                label="Email"
                name="email"
                type="email"
                defaultValue={this.state.dataSignup.email}
                onChange={this.handleInputSignup}
              />
              <TextField
                required
                label="Số điện thoại"
                name="phone"
                defaultValue={this.state.dataSignup.phone}
                onChange={this.handleInputSignup}
              />
              <Button type="submit" color="primary" variant="outlined">
                Sửa tài khoản
              </Button>
            </form>
            {this.state.alert && (
              <Alert severity={this.state.alert.type}>
                {this.state.alert.msg}
              </Alert>
            )}
          </div>
        );
      default:
        return <div></div>;
    }
  }
}

export default connect(() => ({}), { fetchAccount })(FormAccount);
