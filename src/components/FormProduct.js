import React, { Component } from "react";
import { connect } from "react-redux";
import { removeVietnameseTones } from "../utils";
import {
  fetchMark,
  addProducts,
  fetchColor,
  editProducts,
  fetchType,
} from "../actions/tableActions";

class FormProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productTitle: this.props.row ? this.props.row.title : "",
      productType: this.props.row ? this.props.row.type : "",
      productMark: this.props.row ? this.props.row.mark : "",
      productImage: this.props.row ? this.props.row.image[0].split(",") : [],
      productDesc: this.props.row ? this.props.row.description : "",
      productColor: this.props.row ? this.props.row.colors[0].split(",") : [],
      productPrice: this.props.row ? this.props.row.price : "0",
      files: [],
      res: false,
    };
  }
  componentDidMount() {
    this.props.fetchMark();
    this.props.fetchColor();
    this.props.fetchType();
  }
  handleFile = (e) => {
    let files = [...this.state.files];
    let images = [...this.state.productImage];
    let ex = e.target.files[0].name.split(".").pop();

    files.push({ [e.target.name]: e.target.files[0] });

    if (
      !images.includes(
        `/images/${this.state.productTitle}-${e.target.name}.${ex}`
      )
    )
      images.push(`/images/${this.state.productTitle}-${e.target.name}.${ex}`);

    this.setState({
      files: files,
      productImage: images,
    });
  };
  handleInput = (e) => {
    if (e.target.name === "productColor") {
      let color = [...this.state.productColor];
      let images = [...this.state.productImage];
      let files = [...this.state.files];

      if (e.target.checked) {
        color.push(e.target.value);
        document.querySelector(`#${e.target.id}-image`).style =
          "display: inline-block";
      } else {
        color = color.filter((item) => item !== e.target.value);
        images = images.filter(
          (item) =>
            item.split(".").shift() !==
            `/images/${this.state.productTitle}-${removeVietnameseTones(
              e.target.value
            )}`
        );

        files = files.filter(
          (item) =>
            Object.keys(item)[0] !== removeVietnameseTones(e.target.value)
        );
        console.log(files);
        document.querySelector(`#${e.target.id}-image`).style = "display: none";
      }
      this.setState({
        productColor: color,
        productImage: images,
        files: files,
      });
    } else
      this.setState({
        [e.target.name]: e.target.value,
      });
  };
  addSubmit = async () => {
    let data = {
      productTitle: this.state.productTitle,
      productType: this.state.productType,
      productMark: this.state.productMark,
      productImage: this.state.productImage,
      productDesc: this.state.productDesc,
      productColor: this.state.productColor,
      productPrice: this.state.productPrice,
      files: this.state.files,
    };
    await this.props.addProducts(data);
    this.clearForm();
  };

  clearForm = () => {
    document.getElementById("Product-form").reset();
    document.querySelectorAll(".productImage").forEach((item) => {
      item.style = "display: none";
    });
    this.setState({
      productTitle: this.props.row ? this.props.row.title : "",
      productMark: this.props.row ? this.props.row.mark : "",
      productImage: this.props.row ? this.props.row.image[0].split(",") : [],
      productDesc: this.props.row ? this.props.row.description : "",
      productColor: this.props.row ? this.props.row.colors[0].split(",") : [],
      productPrice: this.props.row ? this.props.row.price : "0",
      files: [],
    });
  };

  editSubmit = async () => {
    let data = {
      id: this.props.row.id,
      productTitle: this.state.productTitle,
      productType: this.state.productType,
      productMark: this.state.productMark,
      productImage: this.state.productImage,
      productDesc: this.state.productDesc,
      productColor: this.state.productColor,
      productPrice: this.state.productPrice,
      files: this.state.files,
    };
    console.log(data);
    await this.props.editProducts(data);
    this.setState({
      res: true,
    });
  };
  render() {
    switch (this.props.type) {
      case "add":
        return (
          <div className="form">
            <h1>Thêm sản phẩm</h1>
            <form
              id="Product-form"
              onSubmit={async (e) => {
                e.preventDefault();
                this.addSubmit();
              }}
            >
              <label for="productType">
                <p>Danh mục:</p>
                {this.props.productType && (
                  <select
                    name="productType"
                    onChange={this.handleInput}
                    className="form-control"
                  >
                    <option defaultChecked value="">
                      Chọn danh mục
                    </option>
                    {this.props.productType.map((item, index) => (
                      <option key={index} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                )}
              </label>
              <label for="productTitle">
                <p>Tên sản phẩm:</p>
                <input
                  className="form-control"
                  type="text"
                  name="productTitle"
                  id="productTitle"
                  value={this.state.productTitle}
                  onChange={this.handleInput}
                ></input>
              </label>
              <label for="productMark">
                <p>Thương hiệu:</p>
                {this.props.mark && (
                  <select
                    className="form-control"
                    name="productMark"
                    onChange={this.handleInput}
                  >
                    <option defaultChecked value="">
                      Chọn thương hiệu
                    </option>
                    {this.props.mark.map((item, index) => (
                      <option key={index} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                )}
              </label>
              <label for="productDesc">
                <p>Mô tả:</p>
                <textarea
                  className="form-control"
                  name="productDesc"
                  id="productDesc"
                  onChange={this.handleInput}
                  value={this.state.productDesc}
                ></textarea>
              </label>
              <label>
                <p>Màu:</p>
                {this.props.color && (
                  <div className="form-control">
                    {this.props.color.map((item, index) => (
                      <div>
                        <input
                          className="checkbox"
                          type="checkbox"
                          name="productColor"
                          key={index}
                          id={item.title}
                          value={item.title}
                          onClick={this.handleInput}
                        ></input>
                        <label for={item.title}>{item.title}</label>

                        <input
                          className="productImage"
                          id={`${item.title}-image`}
                          style={{ display: "none" }}
                          name={item.value}
                          type="file"
                          accept="image/*"
                          onChange={this.handleFile}
                        ></input>
                      </div>
                    ))}
                  </div>
                )}
              </label>

              <label for="productPrice">
                <p>Giá:</p>
                <input
                  className="form-control"
                  type="number"
                  name="productPrice"
                  id="productPrice"
                  value={this.state.productPrice}
                  step="1000"
                  onChange={this.handleInput}
                ></input>
              </label>
              <button type="submit" className="button">
                Thêm sản phẩm
              </button>
            </form>
            {this.state.res && <p>SUCCESS</p>}
          </div>
        );
      case "edit":
        return (
          <div className="form">
            <h1>Sửa sản phẩm</h1>
            <form
              id="Product-form"
              onSubmit={(e) => {
                e.preventDefault();
                this.editSubmit();
              }}
            >
              <label for="productType">
                <p>Danh mục:</p>
                {this.props.productType && (
                  <select
                    name="productType"
                    onChange={this.handleInput}
                    className="form-control"
                    value={this.state.productType}
                  >
                    <option defaultChecked value="">
                      Chọn danh mục
                    </option>
                    {this.props.productType.map((item, index) => (
                      <option key={index} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                )}
              </label>
              <label for="productTitle">
                <p>Tên sản phẩm:</p>
                <input
                  className="form-control"
                  type="text"
                  name="productTitle"
                  id="productTitle"
                  value={this.state.productTitle}
                  onChange={this.handleInput}
                ></input>
              </label>
              <label for="productMark">
                <p>Thương hiệu:</p>
                {this.props.mark && (
                  <select
                    className="form-control"
                    name="productMark"
                    onChange={this.handleInput}
                    value={this.state.productMark}
                  >
                    <option defaultChecked value="">
                      Chọn thương hiệu
                    </option>
                    {this.props.mark.map((item, index) => (
                      <option key={index} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                )}
              </label>
              <label for="productDesc">
                <p>Mô tả:</p>
                <textarea
                  className="form-control"
                  name="productDesc"
                  id="productDesc"
                  onChange={this.handleInput}
                  value={this.state.productDesc}
                ></textarea>
              </label>
              <label>
                <p>Màu:</p>
                {this.props.color && (
                  <div className="form-control">
                    {this.props.color.map((item) => (
                      <div>
                        <input
                          type="checkbox"
                          name="productColor"
                          id={item.title}
                          value={item.title}
                          onClick={this.handleInput}
                          checked={this.state.productColor.includes(item.title)}
                        ></input>
                        <label for={item.title}>{item.title}</label>
                        <input
                          className="productImage"
                          id={`${item.title}-image`}
                          style={{ display: "none" }}
                          name={item.value}
                          type="file"
                          accept="image/*"
                          onChange={this.handleFile}
                        ></input>
                      </div>
                    ))}
                  </div>
                )}
              </label>

              <label for="productPrice">
                <p>Giá:</p>
                <input
                  className="form-control"
                  type="number"
                  name="productPrice"
                  id="productPrice"
                  value={this.state.productPrice}
                  step="1000"
                  onChange={this.handleInput}
                ></input>
              </label>
              <button type="submit" className="button">
                Sửa sản phẩm
              </button>
            </form>
            {this.state.res && <p>SUCCESS</p>}
          </div>
        );
      default:
        return <div></div>;
    }
  }
}

export default connect(
  (state) => ({
    mark: state.table.mark,
    color: state.table.color,
    productType: state.table.type,
  }),
  {
    fetchMark,
    fetchColor,
    addProducts,
    editProducts,
    fetchType,
  }
)(FormProduct);
