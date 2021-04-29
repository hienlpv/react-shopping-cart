import React, { Component } from "react";
import { connect } from "react-redux";
import { addColor, editColor } from "../actions/tableActions";
import { removeVietnameseTones } from "../utils";

class FormColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorTitle: this.props.row ? this.props.row.title : "",
      res: false,
    };
  }
  handleInput = (e) => {
    this.setState({
      colorTitle: e.target.value,
    });
  };
  render() {
    switch (this.props.type) {
      case "add":
        return (
          <div>
            <h1>Thêm Màu</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await this.props.addColor({
                  title: this.state.colorTitle,
                  value: removeVietnameseTones(this.state.colorTitle),
                });
                this.setState({ colorTitle: "", res: true });
              }}
            >
              <label for="colorTitle">
                Màu:
                <input
                  type="text"
                  name="colorTitle"
                  id="colorTitle"
                  value={this.state.colorTitle}
                  onChange={this.handleInput}
                ></input>
              </label>
              <button type="submit">Thêm màu</button>
            </form>
            {this.state.res && <p>SUCCESS</p>}
          </div>
        );
      case "edit":
        return (
          <div>
            <h1>Sửa Màu</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await this.props.editColor({
                  id: this.props.row.id,
                  title: this.state.colorTitle,
                });
                this.setState({ colorTitle: "", res: true });
              }}
            >
              <label for="colorTitle">
                Màu:
                <input
                  type="text"
                  name="colorTitle"
                  id="colorTitle"
                  value={this.state.colorTitle}
                  onChange={this.handleInput}
                ></input>
              </label>
              <button type="submit">Sửa màu</button>
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
  addColor,
  editColor,
})(FormColor);
