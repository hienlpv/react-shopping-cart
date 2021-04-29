import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { editProduct, deleteProduct } from "../actions/tableActions";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import FormProduct from "./FormProduct";

class TableProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      row: null,
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    let columns = [
      { field: "number", headerName: "STT", flex: 0.4 },
      { field: "type", headerName: "Danh mục", flex: 0.6 },
      { field: "title", headerName: "Sản phẩm", flex: 1 },
      // { field: "image", headerName: "image", flex: 3 },
      { field: "mark", headerName: "Thương hiệu", flex: 1 },
      // { field: "description", headerName: "description", flex: 1 },
      // { field: "colors", headerName: "colors", flex: 1 },
      { field: "price", headerName: "Giá", flex: 0.5 },
      {
        field: "action",
        headerName: "Chỉnh sửa",
        flex: 1,
        renderCell: (params) => (
          <div>
            <button
              onClick={() => {
                this.setState({ row: params.value[3], type: "edit" });
              }}
            >
              {params.value[0]}
            </button>
            <button
              onClick={() => {
                this.props.deleteProduct(params.value[3].id);
              }}
            >
              {params.value[1]}
            </button>
            <button
              onClick={() => {
                this.setState({ row: params.value[3], type: "view" });
              }}
            >
              {params.value[2]}
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
        row.action = ["Edit", "Delete", "View", row];
        rows.push(row);
      });
    return (
      <div>
        <div className="table-header">
          <h1>Sản Phẩm</h1>
          <div
            className="tbl-btn-add"
            onClick={() => this.setState({ type: "add" })}
          >
            <span>Thêm sản phẩm</span>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <DataGrid
            className="table"
            rows={rows}
            columns={columns}
            pageSize={4}
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
              <FormProduct type="add" row={this.state.row}></FormProduct>
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
              <FormProduct type="edit" row={this.state.row}></FormProduct>
            </Zoom>
          </Modal>
        )}
        {this.state.type === "view" && (
          <Modal isOpen="true">
            <Zoom></Zoom>
            <button
              className="close-modal"
              onClick={() => {
                this.setState({ type: "", row: null });
              }}
            >
              x
            </button>
            <div style={{ width: "90%" }}>
              <DataGrid
                className="table"
                rows={[this.state.row]}
                columns={[
                  { field: "title", headerName: "Sản phẩm", flex: 1 },
                  { field: "image", headerName: "Hình ảnh", flex: 1 },
                  { field: "mark", headerName: "Thương hiệu", flex: 0.5 },
                  {
                    field: "description",
                    headerName: "Mô tả",
                    flex: 1,
                    renderCell: (params) => (
                      <textarea style={{ width: "100%", height: "100%" }}>
                        {params.value}
                      </textarea>
                    ),
                  },
                  { field: "price", headerName: "Giá", flex: 0.5 },
                ]}
                autoHeight
                pageSize={1}
                rowHeight={100}
              />
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({
    data: state.products.items,
  }),
  { fetchProducts, editProduct, deleteProduct }
)(TableProducts);
