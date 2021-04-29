import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { connect } from "react-redux";
import { chooseTable } from "../actions/adminControlActions";

class AdminControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }
  render() {
    return (
      <div className="admin-control">
        <List component="nav" aria-label="main mailbox folders">
          <ListItem
            button
            selected={this.state.selectedIndex === 0}
            onClick={() => {
              this.props.chooseTable("Product");
              this.setState({ selectedIndex: 0 });
            }}
          >
            <p>Sản phẩm</p>
          </ListItem>
          <hr></hr>
          <ListItem
            button
            selected={this.state.selectedIndex === 1}
            onClick={() => {
              this.props.chooseTable("Type");
              this.setState({ selectedIndex: 1 });
            }}
          >
            <p>Danh mục</p>
          </ListItem>
          <hr></hr>
          <ListItem
            button
            selected={this.state.selectedIndex === 2}
            onClick={() => {
              this.props.chooseTable("Mark");
              this.setState({ selectedIndex: 2 });
            }}
          >
            <p>Thương hiệu</p>
          </ListItem>
          <hr></hr>
          <ListItem
            button
            selected={this.state.selectedIndex === 3}
            onClick={() => {
              this.props.chooseTable("Color");
              this.setState({ selectedIndex: 3 });
            }}
          >
            <p>Màu</p>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default connect(() => ({}), {
  chooseTable,
})(AdminControl);