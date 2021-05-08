import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder, deleteOrder } from "../actions/tableActions";
import { fetchProducts } from "../actions/productActions";
import { DataGrid } from "@material-ui/data-grid";
import Modal from "react-modal";

class TableOrder extends Component {
  state = {
    products: null,
  };
  componentDidMount() {
    this.props.fetchOrder();
    this.props.fetchProducts();
  }
  render() {
    let columns = [
      { field: "number", headerName: "STT", flex: 1 },
      { field: "name", headerName: "Tên khách hàng", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "phone", headerName: "SĐT", flex: 1 },
      { field: "address", headerName: "Địa chỉ", flex: 1 },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        renderCell: (params) => (
          <div>
            <button
              onClick={() => {
                this.setState({ products: params.row.products });
              }}
            >
              DS sản phẩm
            </button>
            <button
              onClick={() => {
                console.log(params.row);
                this.props.deleteOrder(params.row.id);
              }}
            >
              Delete
            </button>
          </div>
        ),
      },
    ];
    let rows = [];
    let productsRows = [];
    if (this.props.data)
      this.props.data.forEach((item, index) => {
        let row = Object.assign({}, item);
        delete row._id;
        row.id = item._id;
        row.number = index + 1;
        row.products = item.products;
        rows.push(row);
      });
    if (this.props.products)
      this.props.products.forEach((item, index) => {
        let row = Object.assign({}, item);
        delete row._id;
        row.id = item._id;
        row.number = index + 1;
        productsRows.push(row);
      });
    return (
      <div>
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
        {this.state.products && (
          <Modal isOpen="true">
            <button
              className="close-modal"
              onClick={() => {
                this.setState({ products: null });
              }}
            >
              x
            </button>
            <div style={{ width: "90%" }}>
              <DataGrid
                className="table"
                rows={productsRows
                  .filter((item) => this.state.products.indexOf(item.id) >= 0)
                  .map((item, index) => {
                    item.number = index + 1;
                    return item;
                  })}
                columns={[
                  { field: "number", headerName: "STT", flex: 0.4 },
                  {
                    field: "code",
                    headerName: "Mã Sản phẩm",
                    flex: 1,
                    renderCell: (params) => (
                      <a href={"#" + params.row.id}>{params.row.id}</a>
                    ),
                  },
                  { field: "title", headerName: "Sản phẩm", flex: 1 },
                  { field: "price", headerName: "Giá", flex: 0.5 },
                ]}
                autoHeight
                pageSize={10}
              />
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
    fetchProducts,
    fetchOrder,
    deleteOrder,
  }
)(TableOrder);
