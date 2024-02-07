const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/todo");
const app = express();
const port = 3000;

// const addData = document.getElementById("add").onclick(() => add());
// const deleteData = document.getElementById("delete").onclick(() => remove());
// const findData = document.getElementById("find").onclick(() => find());
// const showData = document.getElementById("show").onclick(() => show());

app.use(express.json());
app.set("view engine", "ejs");

const listSchema = mongoose.Schema({
  name: String,
  task: String,
});

const listModel = mongoose.model("tasks", listSchema);

const show = () => {
  app.get("/", async (req, res) => {
    let data = await listModel.find({});
    res.send(data);
  });
};

const add = () => {
  app.post("/", async (req, res) => {
    let data = new listModel(req.body);
    let result = await data.save();
    res.send(result);
  });
};
const remove = () => {
  app.delete("/", async (req, res) => {
    let data = await listModel.deleteOne(req.body);
    res.send(data);
  });
};

const find = () => {
  app.get("/:key", async (req, res) => {
    const data = await listModel.find({
      $or: [
        { name: { $regex: req.params.key } },
        { task: { $regex: req.params.key } },
      ],
    });
    res.send(data);
  });
};

app.get("/show", (req, res) => {
  res.render("index", {});
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
