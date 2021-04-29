import React, { Component } from "react";
import { connect } from "react-redux";
import { addType, editType } from "../actions/tableActions";

class FormType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeTitle: this.props.row ? this.props.row.title : "",
      res: false,
    };
  }
  handleInput = (e) => {
    this.setState({
      typeTitle: e.target.value,
    });
  };
  render() {
    switch (this.props.type) {
      case "add":
        return (
          <div>
            <h1>Thêm Danh mục</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await this.props.addType({ title: this.state.typeTitle });
                this.setState({ typeTitle: "", res: true });
              }}
            >
              <label for="typeTitle">
                Tên danh mục:
                <input
                  type="text"
                  name="typeTitle"
                  id="typeTitle"
                  value={this.state.typeTitle}
                  onChange={this.handleInput}
                ></input>
              </label>
              <button type="submit">Thêm danh mục</button>
            </form>
            {this.state.res && <p>SUCCESS</p>}
          </div>
        );
      case "edit":
        return (
          <div>
            <h1>Sửa Danh mục</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await this.props.editType({
                  id: this.props.row.id,
                  title: this.state.typeTitle,
                });
                this.setState({ typeTitle: "", res: true });
              }}
            >
              <label for="typeTitle">
                Tên danh mục:
                <input
                  type="text"
                  name="typeTitle"
                  id="typeTitle"
                  value={this.state.typeTitle}
                  onChange={this.handleInput}
                ></input>
              </label>
              <button type="submit">Sửa danh mục</button>
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
  addType,
  editType,
})(FormType);
