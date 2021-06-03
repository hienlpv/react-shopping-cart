import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import Modal from "react-modal";
import FormProduct from "./FormProduct";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import ProductDetail from "./ProductDetail";

class TableProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      row: null,
      alert: null,
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }

  deleteProduct = (id) => {
    fetch("/api/products/" + id + "", {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.fetchProducts();
        this.setState({ alert: res });
        setTimeout(() => {
          this.setState({ alert: null });
        }, 1000);
      });
  };

  render() {
    let columns = [
      { field: "number", headerName: "STT", flex: 0.4 },
      { field: "type", headerName: "Danh mục", flex: 0.6 },
      { field: "title", headerName: "Sản phẩm", flex: 1 },
      { field: "mark", headerName: "Thương hiệu", flex: 0.7 },
      {
        field: "price",
        headerName: "Giá",
        flex: 0.8,
        renderCell: (params) =>
          params.value.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          }),
      },
      {
        field: "action",
        headerName: "Chỉnh sửa",
        flex: 1,
        renderCell: (params) => (
          <div ClassName="tbl-btn-control">
            <IconButton
              color="primary"
              onClick={() => {
                this.setState({ row: params.value[3], type: "edit" });
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => {
                this.deleteProduct(params.value[3].id);
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
          <h1>Sản Phẩm</h1>
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
          <Modal isOpen="true" portalClassName="modal modal-product">
            <IconButton
              onClick={() => {
                this.setState({ type: "", row: null });
              }}
            >
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>
            <FormProduct type="add" row={this.state.row}></FormProduct>
          </Modal>
        )}
        {this.state.type === "edit" && (
          <Modal isOpen="true" portalClassName="modal modal-product">
            <IconButton
              onClick={() => {
                this.setState({ type: "", row: null });
              }}
            >
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>
            <FormProduct type="edit" row={this.state.row}></FormProduct>
          </Modal>
        )}
        {this.state.type === "view" && (
          <Modal isOpen="true" portalClassName="modal">
            <IconButton
              onClick={() => {
                this.setState({ type: "", row: null });
              }}
            >
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>
            <ProductDetail
              product={this.state.row}
              type="admin"
            ></ProductDetail>
          </Modal>
        )}
        {this.state.alert && (
          <Alert severity={this.state.alert.type}>{this.state.alert.msg}</Alert>
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({
    data: state.products.items,
    productNoti: state.products.productNoti,
  }),
  { fetchProducts }
)(TableProducts);
