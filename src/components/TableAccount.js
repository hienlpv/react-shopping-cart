import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { fetchAccount } from "../actions/tableActions";
import FormAccount from "./FormAccount";

class TableAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      row: null,
    };
  }
  componentDidMount() {
    this.props.fetchAccount();
  }
  render() {
    let columns = [
      { field: "number", headerName: "STT", flex: 1 },
      { field: "username", headerName: "Username", flex: 1 },
      { field: "password", headerName: "Password", flex: 1 },
      { field: "name", headerName: "Tên", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "phone", headerName: "SĐT", flex: 1 },
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
                fetch(`/api/account/${params.value[2].id}`, {
                  method: "DELETE",
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.type === "success") this.props.fetchAccount();
                  });
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
          <h1>Tài khoản</h1>
          <div
            className="tbl-btn-add"
            onClick={() => this.setState({ type: "add" })}
          >
            <span>Thêm tài khoản</span>
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
          <Modal isOpen="true" portalClassName="modal-signup">
            <Zoom>
              <button
                className="close-modal"
                onClick={() => {
                  this.setState({ type: "", row: null });
                }}
              >
                x
              </button>
              <FormAccount type="add"></FormAccount>
            </Zoom>
          </Modal>
        )}
        {this.state.type === "edit" && (
          <Modal isOpen="true" portalClassName="modal-signup">
            <Zoom>
              <button
                className="close-modal"
                onClick={() => {
                  this.setState({ type: "", row: null });
                }}
              >
                x
              </button>
              <FormAccount type="edit" row={this.state.row}></FormAccount>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect((state) => ({ data: state.table.account }), {
  fetchAccount,
})(TableAccount);
