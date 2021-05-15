const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
const bcrypt = require("bcrypt");

const app = express();
app.use(bodyParser.json());
app.use(fileUpload());

mongoose.connect(
  "mongodb+srv://hienlpv:hienlpv@cluster0.ja1zg.mongodb.net/react-shopping-cart?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

// --------------------------------ACCOUNT--------------------------------
const User = mongoose.model(
  "user",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    username: String,
    password: String,
    name: String,
    email: String,
    phone: String,
  })
);

app.get("/api/account", async (reg, res) => {
  try {
    const account = await User.find({});
    res.send(account);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/account/:username", async (req, res) => {
  try {
    const account = await User.find({ username: req.params.username });
    if (account.length !== 0) {
      res.json({ type: "warning", msg: "username đã tồn tại" });
    } else {
      res.json({ type: "noti", msg: "username chưa tồn tại" });
    }
  } catch (err) {}
});

app.post("/api/account", async (req, res) => {
  let data = Object.assign(req.body);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(data.password, salt, async (err, salt) => {
      data.password = salt;
      try {
        const newAccount = new User(data);
        await newAccount.save();
        res.json({
          type: "success",
          msg: "Đăng ký tài khoản thành công",
        });
      } catch (err) {
        res.json({ type: "err", msg: err });
      }
    });
  });
});

app.post("/api/account/update", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.id, req.body);
    res.json({ type: "success", msg: "Cập nhật thành công" });
  } catch (err) {
    res.json({ type: "err", msg: err });
  }
});

app.delete("/api/account/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ type: "success", msg: "Xoá thành công" });
  } catch (err) {
    res.json({ type: "err", msg: err });
  }
});

// --------------------------------PRODUCTS--------------------------------

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    image: [String],
    type: String,
    title: String,
    mark: String,
    description: String,
    colors: [String],
    price: Number,
  })
);

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/products", async (req, res) => {
  if (req.files == null) {
    return res.json({ type: "error", msg: "Sản phẩm phải có hình ảnh" });
  }
  try {
    Object.keys(req.files).forEach((item) => {
      let ex = req.files[item].name.split(".").pop();
      let name = removeVietnameseTones(req.body.title).split(" ").join("-");
      req.files[item].mv(
        `${__dirname}/public/images/${name}-${item}.${ex}`,
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
        }
      );
    });
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({
      type: "success",
      msg: "Thêm sản phảm thành công!",
    });
  } catch (err) {
    res.json({
      type: "error",
      msg: err,
    });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ type: "success", msg: `Đã xoá sản phẩm ${req.params.id}` });
  } catch (err) {
    res.json({ type: "error", msg: err });
  }
});

app.delete("/api/products/", async (req, res) => {
  const deleteProduct = await Product.deleteMany({});
  res.send(deleteProduct);
});

app.post("/api/products/update", async (req, res) => {
  if (req.files) {
    Object.keys(req.files).forEach((item) => {
      let ex = req.files[item].name.split(".").pop();
      let name = removeVietnameseTones(req.body.title).split(" ").join("-");
      req.files[item].mv(
        `${__dirname}/public/images/${name}-${item}.${ex}`,
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
        }
      );
    });
  }
  try {
    await Product.findByIdAndUpdate(req.body.id, req.body);
    res.json({ type: "success", msg: "Cập nhật thành công!" });
  } catch (err) {
    res.json({ type: "error", msg: err });
  }
});
// --------------------------------MARK--------------------------------
const Mark = mongoose.model(
  "mark",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
  })
);

app.get("/api/mark", async (reg, res) => {
  try {
    const mark = await Mark.find({});
    res.send(mark);
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/mark", async (req, res) => {
  try {
    const newMark = new Mark(req.body);
    await newMark.save();
    res.json({ type: "success", msg: "Thêm thương hiệu thành công" });
  } catch (err) {
    res.json({ type: "error", msg: err });
  }
});

app.post("/api/mark/update", async (req, res) => {
  try {
    await Mark.findByIdAndUpdate(req.body.id, req.body);
    res.json({ type: "success", msg: "Cập nhật thương hiệu thành công" });
  } catch (err) {
    res.json({ type: "error", msg: err });
  }
});

app.delete("/api/mark/:id", async (req, res) => {
  try {
    await Mark.findByIdAndDelete(req.params.id);
    res.json({ type: "success", msg: `Đã xoá thương hiệu ${req.params.id}` });
  } catch (err) {
    res.json({ type: "error", msg: err });
  }
});

app.delete("/api/mark/", async (req, res) => {
  const deleteMark = await Mark.deleteMany({});
  res.send(deleteMark);
});

// --------------------------------COLOR--------------------------------
const Color = mongoose.model(
  "color",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    value: String,
  })
);

app.get("/api/color", async (reg, res) => {
  try {
    const color = await Color.find({});
    res.send(color);
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/color", async (req, res) => {
  try {
    const newColor = new Color(req.body);
    await newColor.save();
    res.json({ type: "success", msg: "Thêm màu thành công!" });
  } catch (err) {
    res.json({ type: "error", msg: err });
  }
});

app.post("/api/color/update", async (req, res) => {
  try {
    await Color.findByIdAndUpdate(req.body.id, req.body);
    res.json({ type: "success", msg: "Cập nhật màu thành công!" });
  } catch (err) {
    res.json({ type: "error", msg: err });
  }
});

app.delete("/api/color/:id", async (req, res) => {
  try {
    await Color.findByIdAndDelete(req.params.id);
    res.json({ type: "success", msg: `Đã xoá màu ${req.params.id}` });
  } catch (err) {
    res.json({ type: "error", msg: err });
  }
});

app.delete("/api/color/", async (req, res) => {
  const deleteColor = await Color.deleteMany({});
  res.send(deleteColor);
});

// --------------------------------TYPE--------------------------------
const Type = mongoose.model(
  "type",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
  })
);

app.get("/api/type", async (reg, res) => {
  try {
    const type = await Type.find({});
    res.send(type);
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/type", async (req, res) => {
  try {
    const newType = new Type(req.body);
    await newType.save();
    res.json({ type: "success", msg: "Thêm danh mục thành công!" });
  } catch (err) {
    res.json({ type: "error", msg: err });
  }
});

app.post("/api/type/update", async (req, res) => {
  try {
    await Type.findByIdAndUpdate(req.body.id, req.body);
    res.json({ type: "success", msg: "Cập nhật danh mục thành công!" });
  } catch (err) {
    res.json({ type: "error", msg: err });
  }
});

app.delete("/api/type/:id", async (req, res) => {
  try {
    await Type.findByIdAndDelete(req.params.id);
    res.json({ type: "success", msg: "Đã xoá danh mục " + req.params.id + "" });
  } catch (err) {
    res.json({ type: "error", msg: err });
  }
});

app.delete("/api/type/", async (req, res) => {
  const deleteType = await Type.deleteMany({});
  res.send(deleteType);
});

// --------------------------------ORDER--------------------------------
const Order = mongoose.model(
  "order",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    name: String,
    email: String,
    phone: String,
    address: String,
    products: [String],
  })
);

app.get("/api/order", async (reg, res) => {
  try {
    const order = await Order.find({});
    res.send(order);
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/order", async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();
  const order = await Order.find({});
  res.send(order);
});

app.post("/api/order/update", async (req, res) => {
  await Order.findByIdAndUpdate(req.body.id, req.body);
  const order = await Order.find({});
  res.send(order);
});

app.delete("/api/order/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  const order = await Order.find({});
  res.send(order);
});

app.delete("/api/type/", async (req, res) => {
  const deleteType = await Type.deleteMany({});
  res.send(deleteType);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server listen on port " + port + ""));

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\\=|\\<|\\>|\?|\/|,|\.|\\:|\\;|\\'|\\"|\\&|\\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}
