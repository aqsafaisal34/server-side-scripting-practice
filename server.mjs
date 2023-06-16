import express from "express";
import cors from "cors";
import path from "path";
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/abc", (req, res) => {
  console.log("request ip:", req.ip);
  res.send("Hello World!" + new Date().toString());
});
const __dirname = path.resolve();
app.use("/", express.static( path.join(__dirname, "./web/build") ));


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
