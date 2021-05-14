import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { fetchMark } from "../actions/tableActions";
class FormMark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markTitle: this.props.row ? this.props.row.title : "",
      alert: null,
    };
  }
  handleInput = (e) => {
    this.setState({
      markTitle: e.target.value,
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
                await this.addMark({ title: this.state.markTitle });
                this.setState({ markTitle: "" });
              }}
            >
              <TextField
                label="Tên danh mục"
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
                });
              }}
            >
              <TextField
                label="Tên danh mục"
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

export default connect(() => ({}), {
  fetchMark,
})(FormMark);
