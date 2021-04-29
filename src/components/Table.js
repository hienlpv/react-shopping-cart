import React, { Component } from "react";
import { connect } from "react-redux";
import TableColor from "./TableColor";
import TableMark from "./TableMark";
import TableProducts from "./TableProducts";
import TableType from "./TableType";

class Table extends Component {
  render() {
    switch (this.props.table) {
      case "Product":
        return <TableProducts></TableProducts>;
      case "Mark":
        return <TableMark></TableMark>;
      case "Color":
        return <TableColor></TableColor>;
      case "Type":
        return <TableType></TableType>;
      default:
        return <TableProducts></TableProducts>;
    }
  }
}

export default connect(
  (state) => ({
    table: state.table.table,
  }),
  {}
)(Table);
