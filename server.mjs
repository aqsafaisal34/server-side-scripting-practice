import express from "express";
import cors from "cors";
import path from "path";
import e from "express";
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

// app.get("/abc", (req, res) => {
//   console.log("request ip:", req.ip);
//   res.send("Hello World!" + new Date().toString());
// });
let products = [];
// To create or add new product

app.post("/product", (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body.name || !body.price || !body.description) {
    res.status(400).send({
      message: "please fill all the fields",
    });
    return;
  }
  console.log(body.name);
  console.log(body.price);
  console.log(body.description);

  products.push({
    id: new Date().getTime(),
    name: body.name,
    price: body.price,
    description: body.description,
  });
  res.send({
    message: "product added successfully",
  });
});

// To get all Products
app.get("/products", (req, res) => {
  res.send({
    data: products,
    message: "all products",
  });
});

// To get single Product
app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((p) => p.id == id);
  if (!product) {
    res.status(404).send({
      message: "product not found",
    });
    return;
  }
  res.send({
    message: "product found",
  });
  console.log(product);
});
// To delete single product
app.delete("/product/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((p) => p.id == id);
  if (!product) {
    res.status(404).send({
      message: "product not found",
    });
    return;
  }
  products.splice(product, 1);
  res.send({
    message: "product deleted successfully",
  });
});

app.put("/product/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((p) => p.id == id);
  if (!product) {
    res.send({
      message: "product not found",
    });
  } else {
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    res.send({
      message: "product updated",
    });
  }
});

const __dirname = path.resolve();
app.use("/", express.static(path.join(__dirname, "./web/build")));
app.use("*", express.static(path.join(__dirname, "./web/build")));

// app.get("/home", (req, res) => {
//   res.send("I am home page!");
// });
// app.get("/profile", (req, res) => {
//   res.send("I am profile page!");
// });
// app.get("/weather", (req, res) => {
//   res.send({
//     weather: "sunny",
//     temperature: "20",
//     city: "London",
//   });
// });
// let users = [];
// app.post("/user", (req, res) => {
//   console.log(req.body);
//   users.push(req.body);
//   res.send("user is created");
// });
// app.get("/user", (req, res) => {
//   res.send(users);
// });
// app.put("/user", (req, res) => {
//   res.send("user is modified");
// });

// app.delete("/user", (req, res) => {
//   res.send("user is deleted");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
