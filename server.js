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
      let name = req.body.title.split(" ").join("-");
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
      let name = req.body.title.split(" ").join("-");
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

const port = process.env.HEROKU_PRIVATE_IP || '0.0.0.0';
app.listen(port, () => console.log("server listen on http://localhost:5000"));
