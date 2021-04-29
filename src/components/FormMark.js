import React, { Component } from "react";
import { connect } from "react-redux";
import { addMark, editMark } from "../actions/tableActions";

class FormMark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markTitle: this.props.row ? this.props.row.title : "",
      res: false,
    };
  }
  handleInput = (e) => {
    this.setState({
      markTitle: e.target.value,
    });
  };
  render() {
    switch (this.props.type) {
      case "add":
        return (
          <div>
            <h1>Thêm Thương Hiệu</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await this.props.addMark({ title: this.state.markTitle });
                this.setState({ markTitle: "", res: true });
              }}
            >
              <label for="markTitle">
                Tên thương hiệu:
                <input
                  type="text"
                  name="markTitle"
                  id="markTitle"
                  value={this.state.markTitle}
                  onChange={this.handleInput}
                ></input>
              </label>
              <button type="submit">Thêm thương hiệu</button>
            </form>
            {this.state.res && <p>SUCCESS</p>}
          </div>
        );
      case "edit":
        return (
          <div>
            <h1>Sửa Thương Hiệu</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await this.props.editMark({
                  id: this.props.row.id,
                  title: this.state.markTitle,
                });
                this.setState({ markTitle: "", res: true });
              }}
            >
              <label for="markTitle">
                Tên thương hiệu:
                <input
                  type="text"
                  name="markTitle"
                  id="markTitle"
                  value={this.state.markTitle}
                  onChange={this.handleInput}
                ></input>
              </label>
              <button type="submit">Sửa thương hiệu</button>
            </form>
            {this.state.res && <p>SUCCESS</p>}
          </div>
        );
      default:
        return <div></div>;
    }
  }
}

export default connect(() => ({}), {
  addMark,
  editMark,
})(FormMark);
