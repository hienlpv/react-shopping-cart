import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { fetchType } from "../actions/tableActions";

class FormType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeTitle: this.props.row ? this.props.row.title : "",
      alert: null,
    };
  }

  handleInput = (e) => {
    this.setState({
      typeTitle: e.target.value,
    });
  };

  addType = async (data) => {
    fetch("/api/type", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.fetchType();
        this.setState({ alert: res });
        setTimeout(() => {
          this.setState({ alert: null });
        }, 1000);
      });
  };

  editType = async (data) => {
    fetch("/api/type/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.fetchType();
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
            <h1>Thêm Danh mục</h1>
            <form
              className="form-type"
              onSubmit={async (e) => {
                e.preventDefault();
                await this.addType({ title: this.state.typeTitle });
                this.setState({ typeTitle: "" });
              }}
            >
              <TextField
                label="Tên danh mục"
                id="typeTitle"
                name="typeTitle"
                value={this.state.typeTitle}
                onChange={this.handleInput}
              />
              <Button variant="outlined" color="primary" type="submit">
                Thêm danh mục
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
            <h1>Sửa Danh mục</h1>
            <form
              className="form-type"
              onSubmit={async (e) => {
                e.preventDefault();
                await this.editType({
                  id: this.props.row.id,
                  title: this.state.typeTitle,
                });
              }}
            >
              <TextField
                label="Tên danh mục"
                id="typeTitle"
                name="typeTitle"
                value={this.state.typeTitle}
                onChange={this.handleInput}
              />
              <Button variant="outlined" color="primary" type="submit">
                Sửa danh mục
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

export default connect(() => ({}), { fetchType })(FormType);
