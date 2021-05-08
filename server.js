const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

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
    res.send(account);
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/account", async (req, res) => {
  const newAccount = new User(req.body);
  await newAccount.save();
  const account = await User.find({});
  res.send(account);
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
    return res.status(400).json({ msg: "No Image uploaded" });
  }

  Object.keys(req.files).forEach((item) => {
    let ex = req.files[item].name.split(".").pop();
    req.files[item].mv(
      `${__dirname}/public/images/${req.body.title}-${item}.${ex}`,
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
  const products = await Product.find({});
  res.send(products);
});

app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  const products = await Product.find({});
  res.send(products);
});

app.delete("/api/products/", async (req, res) => {
  const deleteProduct = await Product.deleteMany({});
  res.send(deleteProduct);
});

app.post("/api/products/update", async (req, res) => {
  if (req.files) {
    Object.keys(req.files).forEach((item) => {
      let ex = req.files[item].name.split(".").pop();
      req.files[item].mv(
        `${__dirname}/public/images/${req.body.title}-${item}.${ex}`,
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
        }
      );
    });
  }
  await Product.findByIdAndUpdate(req.body.id, req.body);
  const products = await Product.find({});
  res.send(products);
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
  const newMark = new Mark(req.body);
  await newMark.save();
  const mark = await Mark.find({});
  res.send(mark);
});

app.post("/api/mark/update", async (req, res) => {
  await Mark.findByIdAndUpdate(req.body.id, req.body);
  const mark = await Mark.find({});
  res.send(mark);
});

app.delete("/api/mark/:id", async (req, res) => {
  await Mark.findByIdAndDelete(req.params.id);
  const mark = await Mark.find({});
  res.send(mark);
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
  const newColor = new Color(req.body);
  await newColor.save();
  const color = await Color.find({});
  res.send(color);
});

app.post("/api/color/update", async (req, res) => {
  await Color.findByIdAndUpdate(req.body.id, req.body);
  const color = await Color.find({});
  res.send(color);
});

app.delete("/api/color/:id", async (req, res) => {
  await Color.findByIdAndDelete(req.params.id);
  const color = await Color.find({});
  res.send(color);
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
  const newType = new Type(req.body);
  await newType.save();
  const type = await Type.find({});
  res.send(type);
});

app.post("/api/type/update", async (req, res) => {
  await Type.findByIdAndUpdate(req.body.id, req.body);
  const type = await Type.find({});
  res.send(type);
});

app.delete("/api/type/:id", async (req, res) => {
  await Type.findByIdAndDelete(req.params.id);
  const type = await Type.find({});
  res.send(type);
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

const port = process.env.port || 5000;
app.listen(port, () => console.log("server listen on http://localhost:5000"));
