import React, { Component } from "react";
import { connect } from "react-redux";
import { removeVietnameseTones } from "../utils";
import { fetchMark, fetchColor, fetchType } from "../actions/tableActions";
import { fetchProducts } from "../actions/productActions";
import { Select, MenuItem, TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

class FormProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productTitle: this.props.row ? this.props.row.title : "",
      productType: this.props.row ? this.props.row.type : "",
      productMark: this.props.row ? this.props.row.mark : "",
      productImage: this.props.row ? this.props.row.image : [],
      productDesc: this.props.row ? this.props.row.description : "",
      productColor: this.props.row ? this.props.row.colors : [],
      productPrice: this.props.row ? this.props.row.price : "0",
      files: [],
      res: false,
      alert: null,
    };
  }

  componentDidMount() {
    this.props.fetchMark();
    this.props.fetchColor();
    this.props.fetchType();
  }

  addProducts = async (data) => {
    var formData = new FormData();
    data.files.forEach((item) => {
      formData.append(Object.keys(item)[0], item[Object.keys(item)[0]]);
    });
    formData.append("title", data.productTitle);
    formData.append("type", data.productType);
    data.productImage.forEach((i) => {
      formData.append("image", i);
    });
    formData.append("mark", data.productMark);
    formData.append("description", data.productDesc);
    data.productColor.forEach((i) => {
      formData.append("colors", i);
    });
    formData.append("price", data.productPrice);

    try {
      const res = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.type === "success") this.props.fetchProducts();
      this.setState({ alert: res.data });
      setTimeout(() => {
        this.setState({ alert: null });
      }, 1000);
    } catch (err) {}
  };

  editProducts = async (data) => {
    var formData = new FormData();
    formData.append("id", data.id);
    data.files.forEach((item) => {
      formData.append(Object.keys(item)[0], item[Object.keys(item)[0]]);
    });
    formData.append("title", data.productTitle);
    formData.append("type", data.productType);
    data.productImage.forEach((i) => {
      formData.append("image", i);
    });
    formData.append("mark", data.productMark);
    formData.append("description", data.productDesc);
    data.productColor.forEach((i) => {
      formData.append("colors", i);
    });
    formData.append("price", data.productPrice);

    try {
      const res = await axios.post("/api/products/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.type === "success") this.props.fetchProducts();
      this.setState({ alert: res.data });
      setTimeout(() => {
        this.setState({ alert: null });
      }, 1000);
    } catch (err) {}
  };

  handleFile = (e) => {
    let files = [...this.state.files];
    let images = [...this.state.productImage];
    let ex = e.target.files[0].name.split(".").pop();

    files.push({ [e.target.name]: e.target.files[0] });

    if (
      !images.includes(
        `/images/${removeVietnameseTones(this.state.productTitle)
          .split(" ")
          .join("-")}-${e.target.name}.${ex}`
      )
    )
      images.push(
        `/images/${removeVietnameseTones(this.state.productTitle)
          .split(" ")
          .join("-")}-${e.target.name}.${ex}`
      );

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
    await this.addProducts(data);
    this.clearForm();
  };

  clearForm = () => {
    document.querySelector(".form-product").reset();
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
    await this.editProducts(data);
  };

  render() {
    switch (this.props.type) {
      case "add":
        return (
          <div className="form-wrap">
            <h1>Thêm sản phẩm</h1>
            <form
              className="form-product"
              onSubmit={async (e) => {
                e.preventDefault();
                this.addSubmit();
              }}
            >
              {this.props.productType && (
                <Select
                  name="productType"
                  onChange={this.handleInput}
                  displayEmpty
                  value={this.state.productType}
                >
                  <MenuItem value="" disabled>
                    Danh mục
                  </MenuItem>
                  {this.props.productType.map((item, index) => (
                    <MenuItem key={index} value={item.title}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              )}
              {this.props.mark && (
                <Select
                  name="productMark"
                  onChange={this.handleInput}
                  displayEmpty
                  value={this.state.productMark}
                >
                  <MenuItem value="" disabled>
                    Thương hiệu
                  </MenuItem>
                  {this.props.mark
                    .filter((item) => item.type === this.state.productType)
                    .map((item, index) => (
                      <MenuItem key={index} value={item.title}>
                        {item.title}
                      </MenuItem>
                    ))}
                </Select>
              )}
              <TextField
                label="Tên sản phẩm"
                id="productTitle"
                name="productTitle"
                value={this.state.productTitle}
                onChange={this.handleInput}
              />
              <textarea
                rows={5}
                placeholder="Mô tả"
                className="form-control"
                name="productDesc"
                id="productDesc"
                onChange={this.handleInput}
                value={this.state.productDesc}
              ></textarea>
              {this.props.color && (
                <div className="input-color">
                  {this.props.color.map((item, index) => (
                    <div>
                      <input
                        className="checkbox"
                        type="checkbox"
                        name="productColor"
                        key={index}
                        id={item.title.split(" ").join("-")}
                        value={item.title}
                        onClick={this.handleInput}
                      ></input>
                      <label for={item.title}>{item.title}</label>

                      <input
                        className="productImage"
                        id={`${item.title.split(" ").join("-")}-image`}
                        style={{ display: "none" }}
                        name={item.value.split(" ").join("-")}
                        type="file"
                        accept="image/*"
                        onChange={this.handleFile}
                      ></input>
                    </div>
                  ))}
                </div>
              )}
              Giá:
              <input
                className="form-control"
                type="number"
                name="productPrice"
                id="productPrice"
                value={this.state.productPrice}
                step="1000"
                onChange={this.handleInput}
              ></input>
              <Button variant="outlined" color="primary" type="submit">
                Thêm sản phẩm
              </Button>
            </form>
            {this.state.alert && (
              <Alert severity={this.state.alert.type}>
                {this.state.alert.msg}
              </Alert>
            )}
          </div>
        );
      case "edit":
        return (
          <div className="form-wrap">
            <h1>Sửa sản phẩm</h1>
            <form
              className="form-product"
              onSubmit={async (e) => {
                e.preventDefault();
                this.editSubmit();
              }}
            >
              {this.props.productType && (
                <Select
                  name="productType"
                  onChange={this.handleInput}
                  displayEmpty
                  value={this.state.productType}
                >
                  <MenuItem value="" disabled>
                    Danh mục
                  </MenuItem>
                  {this.props.productType.map((item, index) => (
                    <MenuItem key={index} value={item.title}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              )}
              {this.props.mark && (
                <Select
                  name="productMark"
                  onChange={this.handleInput}
                  displayEmpty
                  value={this.state.productMark}
                >
                  <MenuItem value="" disabled>
                    Thương hiệu
                  </MenuItem>
                  {this.props.mark
                    .filter((item) => item.type === this.state.productType)
                    .map((item, index) => (
                      <MenuItem key={index} value={item.title}>
                        {item.title}
                      </MenuItem>
                    ))}
                </Select>
              )}
              <TextField
                label="Tên sản phẩm"
                id="productTitle"
                name="productTitle"
                value={this.state.productTitle}
                onChange={this.handleInput}
              />
              <textarea
                rows={5}
                placeholder="Mô tả"
                className="form-control"
                name="productDesc"
                id="productDesc"
                onChange={this.handleInput}
                value={this.state.productDesc}
              ></textarea>
              {this.props.color && (
                <div className="input-color">
                  {this.props.color.map((item, index) => (
                    <div>
                      <input
                        className="checkbox"
                        type="checkbox"
                        name="productColor"
                        key={index}
                        id={item.title.split(" ").join("-")}
                        value={item.title}
                        onClick={this.handleInput}
                        checked={this.state.productColor.includes(item.title)}
                      ></input>
                      <label for={item.title}>{item.title}</label>

                      <input
                        className="productImage"
                        id={`${item.title.split(" ").join("-")}-image`}
                        style={{ display: "none" }}
                        name={item.value.split(" ").join("-")}
                        type="file"
                        accept="image/*"
                        onChange={this.handleFile}
                      ></input>
                    </div>
                  ))}
                </div>
              )}
              Giá:
              <input
                className="form-control"
                type="number"
                name="productPrice"
                id="productPrice"
                value={this.state.productPrice}
                step="1000"
                onChange={this.handleInput}
              ></input>
              <Button variant="outlined" color="primary" type="submit">
                Sửa sản phẩm
              </Button>
            </form>
            {this.state.alert && (
              <Alert severity={this.state.alert.type}>
                {this.state.alert.msg}
              </Alert>
            )}
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
    fetchType,
    fetchProducts,
  }
)(FormProduct);
