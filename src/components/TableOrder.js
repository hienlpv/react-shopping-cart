import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../actions/tableActions";
import { DataGrid } from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Alert } from "@material-ui/lab";
import Modal from "react-modal";
import CloseIcon from "@material-ui/icons/Close";

class TableOrder extends Component {
  state = {
    products: null,
    alert: null,
    type: "",
    row: null,
  };
  componentDidMount() {
    this.props.fetchOrder();
  }

  deleteOrder = async (id) => {
    fetch("/api/order/" + id + "", {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.type === "success") {
          this.props.fetchOrder();
          this.setState({ alert: res });
          setTimeout(() => {
            this.setState({ alert: null });
          }, 1000);
        }
      });
  };

  render() {
    let columns = [
      { field: "number", headerName: "STT", flex: 0.5 },
      { field: "id", headerName: "Mã đơn hàng", flex: 1 },
      { field: "username", headerName: "Khách hàng", flex: 1 },
      { field: "address", headerName: "Địa chỉ", flex: 2 },
      {
        field: "total",
        headerName: "Tổng tiền",
        flex: 1,
        renderCell: (params) =>
          params.value.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          }),
      },
      {
        field: "action",
        headerName: "Action",
        flex: 1.2,
        renderCell: (params) => (
          <div>
            <IconButton
              color="primary"
              onClick={() => {
                this.deleteOrder(params.value[3].id);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => {
                this.setState({ row: params.value[3], type: "view" });
              }}
            >
              <VisibilityIcon />
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
        row.action = ["Edit", "Delete", "View", row];
        rows.push(row);
      });
    return (
      <div className="table">
        <div className="table-header">
          <h1>Đơn hàng</h1>
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
        {this.state.alert && (
          <Alert severity={this.state.alert.type}>{this.state.alert.msg}</Alert>
        )}
        {this.state.type === "view" && (
          <Modal isOpen="true" portalClassName="modal modal-product view">
            <IconButton
              onClick={() => {
                this.setState({ type: "", row: null });
              }}
            >
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>
            <div className="order-detail">
              <h1 style={{ color: "#3f51b5", padding: "10px" }}>
                Danh sách sản phẩm
              </h1>
              {this.state.row.products.map((item, index) => (
                <div className="cart-item-box">
                  <img src={item.image[item.imgIndex]} alt="" />
                  <h5 className="item-title">{item.title}</h5>
                  <div className="item-price">
                    {item.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                    x {item.count}
                  </div>
                </div>
              ))}
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({ data: state.table.order, products: state.products.items }),
  {
    fetchOrder,
  }
)(TableOrder);
