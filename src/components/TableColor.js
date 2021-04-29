import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { addColor, fetchColor, deleteColor } from "../actions/tableActions";
import FormColor from "./FormColor";

class TableColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      row: null,
    };
  }
  componentDidMount() {
    this.props.fetchColor();
  }
  render() {
    let columns = [
      { field: "number", headerName: "STT", flex: 1 },
      { field: "title", headerName: "Màu", flex: 1 },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        renderCell: (params) => (
          <div>
            <button
              onClick={() => {
                this.setState({ row: params.value[2], type: "edit" });
              }}
            >
              {params.value[0]}
            </button>
            <button
              onClick={() => {
                this.props.deleteColor(params.value[2].id);
              }}
            >
              {params.value[1]}
            </button>
          </div>
        ),
      },
    ];
    let rows = [];
    if (this.props.data)
      this.props.data.forEach((item, index) => {
        let row = Object.assign({}, item);
        delete row._id;
        row.id = item._id;
        row.number = index + 1;
        row.action = ["Edit", "Delete", row];
        rows.push(row);
      });

    return (
      <div>
        <div className="table-header">
          <h1>Màu</h1>
          <div
            className="tbl-btn-add"
            onClick={() => this.setState({ type: "add" })}
          >
            <span>Thêm màu</span>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <DataGrid
            className="table"
            rows={rows}
            columns={columns}
            pageSize={7}
            autoHeight
          />
        </div>
        {this.state.type === "add" && (
          <Modal isOpen="true">
            <Zoom>
              <button
                className="close-modal"
                onClick={() => {
                  this.setState({ type: "", row: null });
                }}
              >
                x
              </button>
              <FormColor type="add" row={this.state.row}></FormColor>
            </Zoom>
          </Modal>
        )}
        {this.state.type === "edit" && (
          <Modal isOpen="true">
            <Zoom>
              <button
                className="close-modal"
                onClick={() => {
                  this.setState({ type: "", row: null });
                }}
              >
                x
              </button>
              <FormColor type="edit" row={this.state.row}></FormColor>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect((state) => ({ data: state.table.color }), {
  addColor,
  fetchColor,
  deleteColor,
})(TableColor);
