import React, { Component } from "react";
import { connect } from "react-redux";
import { removeVietnameseTones } from "../utils";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { fetchColor } from "../actions/tableActions";

class FormColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorTitle: this.props.row ? this.props.row.title : "",
      alert: null,
    };
  }
  handleInput = (e) => {
    this.setState({
      colorTitle: e.target.value,
    });
  };

  addColor = async (data) => {
    fetch("/api/color", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.fetchColor();
        this.setState({ alert: res });
        setTimeout(() => {
          this.setState({ alert: null });
        }, 1000);
      });
  };

  editColor = async (data) => {
    fetch("/api/color/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.fetchColor();
        this.setState({ alert: res });
        setTimeout(() => {
          this.setState({ alert: null });
        }, 1000);
      });
  };

  render() {
    switch (this.props.type) {
      case "add":
        return (
          <div className="form-wrap">
            <h1>Thêm Màu</h1>
            <form
              className="form-color"
              onSubmit={async (e) => {
                e.preventDefault();
                await this.addColor({
                  title: this.state.colorTitle,
                  value: removeVietnameseTones(this.state.colorTitle)
                    .split(" ")
                    .join("-"),
                });
                this.setState({ colorTitle: "", res: true });
              }}
            >
              <TextField
                label="Tên danh mục"
                id="colorTitle"
                name="colorTitle"
                value={this.state.colorTitle}
                onChange={this.handleInput}
              />
              <Button variant="outlined" color="primary" type="submit">
                Thêm màu
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
            <h1>Sửa Màu</h1>
            <form
              className="form-color"
              onSubmit={async (e) => {
                e.preventDefault();
                await this.editColor({
                  id: this.props.row.id,
                  title: this.state.colorTitle,
                  value: removeVietnameseTones(this.state.colorTitle)
                    .split(" ")
                    .join("-"),
                });
                this.setState({ colorTitle: "", res: true });
              }}
            >
              <TextField
                label="Tên danh mục"
                id="colorTitle"
                name="colorTitle"
                value={this.state.colorTitle}
                onChange={this.handleInput}
              />
              <Button variant="outlined" color="primary" type="submit">
                Sửa màu
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

export default connect(() => ({}), {
  fetchColor,
})(FormColor);
