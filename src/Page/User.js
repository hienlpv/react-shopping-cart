import React, { Component } from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import "../index.css";
import TableUserOrder from "../components/TableUserOrder";

class User extends Component {
  state = {
    userName: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "",
    selectedIndex: 0,
    alert: null,
    dataUpdate: {
      ...JSON.parse(localStorage.getItem("user")),
      oldpassword: "",
      newpassword: "",
    },
  };

  componentDidMount() {
    if (this.state.userName === "") this.props.history.push("/home");
  }

  handleInputUpdate = (e) => {
    let dataUpdate = Object.assign(this.state.dataUpdate);
    dataUpdate[e.target.name] = e.target.value;
    this.setState({ dataUpdate });
  };

  updateAccount = (e) => {
    e.preventDefault();
    console.log(this.state.dataUpdate);
    fetch("/api/account/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.userName._id,
        name: this.state.dataUpdate.name,
        username: this.state.userName.username,
        newpassword: this.state.dataUpdate.newpassword,
        oldpassword: this.state.dataUpdate.oldpassword,
        email: this.state.dataUpdate.email,
        phone: this.state.dataUpdate.phone,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ alert: res, userName: res.user });
        localStorage.setItem("user", JSON.stringify(res.user));
        setTimeout(() => {
          this.setState({
            alert: null,
            dataUpdate: {
              ...JSON.parse(localStorage.getItem("user")),
              oldpassword: "",
              newpassword: "",
            },
          });
        }, 1000);
      });
  };

  render() {
    return (
      <div className="adminPage">
        <div className="grid-container">
          <header>
            <h1 className="title" href="/">
              {this.state.userName.name}
            </h1>
          </header>
          <div className="content">
            <div className="sidebar">
              <List
                component="nav"
                aria-label="main mailbox folders"
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    color="primary"
                    style={{
                      background: "rgba(1, 127, 255,0.2)",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      zIndex: "0",
                    }}
                  >
                    MENU LIST
                  </ListSubheader>
                }
              >
                <ListItem
                  button
                  divider
                  selected={this.state.selectedIndex === 0}
                  onClick={() => {
                    this.setState({ selectedIndex: 0 });
                  }}
                >
                  <ListItemText primary="Thông tin cá nhân" />
                </ListItem>
                <ListItem
                  button
                  divider
                  selected={this.state.selectedIndex === 1}
                  onClick={() => {
                    this.setState({ selectedIndex: 1 });
                  }}
                >
                  <ListItemText primary="Quản lý đơn hàng" />
                </ListItem>
              </List>
            </div>
            {this.state.selectedIndex === 0 && (
              <div className="table user-info">
                <div className="form-wrap">
                  <h1>THÔNG TIN CÁ NHÂN</h1>
                  <form
                    className="form-user"
                    Validate
                    onSubmit={this.updateAccount}
                  >
                    <TextField
                      label="Họ và tên"
                      name="name"
                      onChange={this.handleInputUpdate}
                      defaultValue={this.state.userName.name}
                    />

                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      defaultValue={this.state.userName.email}
                      onChange={this.handleInputUpdate}
                    />
                    <TextField
                      label="Số điện thoại"
                      name="phone"
                      defaultValue={this.state.userName.phone}
                      onChange={this.handleInputUpdate}
                    />
                    <TextField
                      label="Mật khẩu cũ"
                      name="oldpassword"
                      type="password"
                      value={this.state.dataUpdate.oldpassword}
                      onChange={this.handleInputUpdate}
                    />
                    <TextField
                      label="Mật khẩu mới"
                      name="newpassword"
                      type="password"
                      value={this.state.dataUpdate.newpassword}
                      onChange={this.handleInputUpdate}
                    />
                    <Button type="submit" color="primary" variant="outlined">
                      Cập nhật
                    </Button>
                  </form>
                  {this.state.alert && (
                    <Alert severity={this.state.alert.type}>
                      {this.state.alert.msg}
                    </Alert>
                  )}
                </div>
              </div>
            )}
            {this.state.selectedIndex === 1 && (
              <TableUserOrder user={this.state.userName}></TableUserOrder>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), {})(User);
