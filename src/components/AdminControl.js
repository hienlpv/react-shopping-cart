import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
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
              this.props.chooseTable("Product");
              this.setState({ selectedIndex: 0 });
            }}
          >
            <ListItemText primary="Sản phẩm" />
          </ListItem>
          <ListItem
            button
            divider
            selected={this.state.selectedIndex === 1}
            onClick={() => {
              this.props.chooseTable("Type");
              this.setState({ selectedIndex: 1 });
            }}
          >
            <ListItemText primary="Danh mục" />
          </ListItem>
          <ListItem
            button
            divider
            selected={this.state.selectedIndex === 2}
            onClick={() => {
              this.props.chooseTable("Mark");
              this.setState({ selectedIndex: 2 });
            }}
          >
            <ListItemText primary="Thương hiệu" />
          </ListItem>
          <ListItem
            button
            divider
            selected={this.state.selectedIndex === 3}
            onClick={() => {
              this.props.chooseTable("Color");
              this.setState({ selectedIndex: 3 });
            }}
          >
            <ListItemText primary="Màu" />
          </ListItem>
          <ListItem
            button
            divider
            selected={this.state.selectedIndex === 4}
            onClick={() => {
              this.props.chooseTable("Order");
              this.setState({ selectedIndex: 4 });
            }}
          >
            <ListItemText primary="Đơn hàng" />
          </ListItem>
          <ListItem
            button
            selected={this.state.selectedIndex === 5}
            onClick={() => {
              this.props.chooseTable("Account");
              this.setState({ selectedIndex: 5 });
            }}
          >
            <ListItemText primary="Tài khoản" />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default connect(() => ({}), {
  chooseTable,
})(AdminControl);
