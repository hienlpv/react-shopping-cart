import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { fetchMark, fetchType } from "../actions/tableActions";

class FormMark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markTitle: this.props.row ? this.props.row.title : "",
      productType: this.props.row ? this.props.row.type : "",
      alert: null,
    };
  }
  componentDidMount() {
    this.props.fetchType();
  }
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addMark = async (data) => {
    fetch("/api/mark", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.fetchMark();
        this.setState({ alert: res });
        setTimeout(() => {
          this.setState({ alert: null });
        }, 1000);
      });
  };

  editMark = async (data) => {
    fetch("/api/mark/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.fetchMark();
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
            <h1>Thêm Thương Hiệu</h1>
            <form
              className="form-mark"
              onSubmit={async (e) => {
                e.preventDefault();
                await this.addMark({
                  title: this.state.markTitle,
                  type: this.state.productType,
                });
                this.setState({ markTitle: "" });
              }}
            >
              <Select
                name="productType"
                onChange={this.handleInput}
                displayEmpty
                value={this.state.productType}
              >
                <MenuItem value="" disabled>
                  Danh mục
                </MenuItem>
                {this.props.productType &&
                  this.props.productType.map((item, index) => (
                    <MenuItem key={index} value={item.title}>
                      {item.title}
                    </MenuItem>
                  ))}
              </Select>
              <TextField
                label="Tên thương hiệu"
                id="markTitle"
                name="markTitle"
                value={this.state.markTitle}
                onChange={this.handleInput}
              />
              <Button variant="outlined" color="primary" type="submit">
                Thêm thương hiệu
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
            <h1>Sửa Thương Hiệu</h1>
            <form
              className="form-mark"
              onSubmit={async (e) => {
                e.preventDefault();
                await this.editMark({
                  id: this.props.row.id,
                  title: this.state.markTitle,
                  type: this.state.productType,
                });
              }}
            >
              <Select
                name="productType"
                onChange={this.handleInput}
                displayEmpty
                value={this.state.productType}
              >
                <MenuItem value="" disabled>
                  Danh mục
                </MenuItem>
                {this.props.productType &&
                  this.props.productType.map((item, index) => (
                    <MenuItem key={index} value={item.title}>
                      {item.title}
                    </MenuItem>
                  ))}
              </Select>
              <TextField
                label="Tên thương hiệu"
                id="markTitle"
                name="markTitle"
                value={this.state.markTitle}
                onChange={this.handleInput}
              />
              <Button variant="outlined" color="primary" type="submit">
                Sửa thương hiệu
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

export default connect((state) => ({ productType: state.table.type }), {
  fetchMark,
  fetchType,
})(FormMark);
