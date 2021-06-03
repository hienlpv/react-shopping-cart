import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Modal from "react-modal";
import FormMark from "./FormMark";
import { connect } from "react-redux";
import { fetchMark } from "../actions/tableActions";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Alert } from "@material-ui/lab";

class TableMark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      row: null,
      alert: null,
    };
  }
  componentDidMount() {
    this.props.fetchMark();
  }

  deleteMark = async (id) => {
    fetch("/api/mark/" + id + "", {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.type === "success") this.props.fetchMark();
        this.setState({ alert: res });
        setTimeout(() => {
          this.setState({ alert: null });
        }, 1000);
      });
  };

  render() {
    let columns = [
      { field: "number", headerName: "STT", flex: 1 },
      { field: "type", headerName: "Danh mục", flex: 1 },
      { field: "title", headerName: "Tên thương hiệu", flex: 1 },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        renderCell: (params) => (
          <div>
            <IconButton
              color="primary"
              onClick={() => {
                this.setState({ row: params.value[2], type: "edit" });
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => {
                this.deleteMark(params.value[2].id);
              }}
            >
              <DeleteIcon />
            </IconButton>
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
      <div className="table">
        <div className="table-header">
          <h1>Thương Hiệu</h1>
          <IconButton
            color="primary"
            onClick={() => this.setState({ type: "add" })}
          >
            <AddIcon></AddIcon>
          </IconButton>
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
          <Modal isOpen="true" portalClassName="modal modal-mark">
            <IconButton
              onClick={() => {
                this.setState({ type: "", row: null });
              }}
            >
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>
            <FormMark type="add" row={this.state.row}></FormMark>
          </Modal>
        )}
        {this.state.type === "edit" && (
          <Modal isOpen="true" portalClassName="modal modal-mark">
            <IconButton
              onClick={() => {
                this.setState({ type: "", row: null });
              }}
            >
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>
            <FormMark type="edit" row={this.state.row}></FormMark>
          </Modal>
        )}
        {this.state.alert && (
          <Alert severity={this.state.alert.type}>{this.state.alert.msg}</Alert>
        )}
      </div>
    );
  }
}

export default connect((state) => ({ data: state.table.mark }), {
  fetchMark,
})(TableMark);
