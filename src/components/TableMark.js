import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import FormMark from "./FormMark";
import { connect } from "react-redux";
import { addMark, fetchMark, deleteMark } from "../actions/tableActions";

class TableMark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      row: null,
    };
  }
  componentDidMount() {
    this.props.fetchMark();
  }
  render() {
    let columns = [
      { field: "number", headerName: "STT", flex: 1 },
      { field: "title", headerName: "Tên thương hiệu", flex: 1 },
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
                this.props.deleteMark(params.value[2].id);
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
          <h1>Thương Hiệu</h1>
          <div
            className="tbl-btn-add"
            onClick={() => this.setState({ type: "add" })}
          >
            <span>Thêm thương hiệu</span>
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
              <FormMark type="add" row={this.state.row}></FormMark>
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
              <FormMark type="edit" row={this.state.row}></FormMark>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect((state) => ({ data: state.table.mark }), {
  addMark,
  fetchMark,
  deleteMark,
})(TableMark);
