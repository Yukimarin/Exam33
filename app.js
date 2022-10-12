// Ex 1:
const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require("body-parser");
var morgan = require("morgan");
const { json } = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`Example app listening on port http://127.0.0.1:3000/`);
});

// Ex2:
app.get("/api/v1/todos", (req, res) => {
  fs.readFile("./ask-community-project/todos.json", (err, data) => {
    if (err) {
      throw err;
    } else {
      let api = JSON.parse(data);
      console.log(api);
    }
  });
});

// Ex2.2:
app.get("/api/v1/todos/:id", (req, res) => {
  //   console.log(req.params);
  fs.readFile("./ask-community-project/todos.json", (err, data) => {
    if (err) {
      throw err;
    } else {
      let api = JSON.parse(data);
      //   console.log(api);
      let findID = api.find((e) => {
        return e.id == req.params.id;
      });
      if (findID) {
        res.status(200).send(findID);
        // res.status(200).json({ message: "Tìm kiếm thành công" });
      } else {
        res.status(200).json({ message: "ID không tồn tại" });
      }
    }
  });
});

// Ex 2.3:
app.post("/api/v1/todos", (req, res) => {
  console.log(req.body);
  fs.readFile("./ask-community-project/todos.json", (err, data) => {
    if (err) {
      throw err;
    } else {
      let titles = JSON.parse(data);
      //   console.log(titles);
      let title = titles.find((e) => {
        return e.title == req.body.title;
      });
      if (!title) {
        let newTodo = {
          ...req.body,
          userId: Number(req.body.userId),
          id: Number(req.body.id),
          title: req.body.title,
          completed: Boolean(req.body.completed),
        };
        titles.push(newTodo);
        fs.writeFile(
          "./ask-community-project/todos.json",
          JSON.stringify(titles),
          (err, data) => {
            if (err) {
              throw err;
            } else {
              res.status(200).json({ message: "Create successfully" });
            }
          }
        );
      } else {
        res.status(200).json({ message: "Todo already exists" });
      }
    }
  });
});

// Ex 2.4
app.put("/api/v1/todos/:id", (req, res) => {
  let id = Number(req.params.id);
  fs.readFile("./ask-community-project/todos.json", (err, data) => {
    if (err) {
      throw err;
    } else {
      let todos = JSON.parse(data);
      let findIndex = todos.findIndex((e) => {
        return e.id == id;
      });
      console.log(findIndex);
      if (findIndex == "-1") {
        res.status(code).json({ message: "Todo not found" });
      } else if (findIndex >= 0) {
        let updateTodo = {
          ...req.body,
          userId: Number(req.body.userId),
          id: Number(req.body.id),
          title: req.body.title,
          completed: Boolean(req.body.completed),
        };
        todos.splice(findIndex, 1, updateTodo);
        fs.writeFile(
          "./ask-community-project/todos.json",
          JSON.stringify(todos),
          (err, data) => {
            if (err) {
              throw err;
            } else {
              res.status(200).json({ message: "Updated Successfully" });
            }
          }
        );
      }
    }
  });
});

// Ex 2.5
app.delete("/api/v1/todos/:id", (req, res) => {
  let id = Number(req.params.id);
  fs.readFile("./ask-community-project/todos.json", (err, data) => {
    if (err) {
      throw err;
    } else {
      let todos = JSON.parse(data);
      let findIndex = todos.findIndex((e) => {
        return e.id == id;
      });
      //   console.log(findIndex);
      if (findIndex == "-1") {
        res.status(200).json("Todo not found");
      } else if (findIndex >= 0) {
        todos.splice(findIndex, 1);
        fs.writeFile(
          "./ask-community-project/todos.json",
          JSON.stringify(todos),
          (err, data) => {
            if (err) {
              throw err;
            } else {
              res.status(200).json("Delete successfully");
            }
          }
        );
      }
    }
  });
});


// Ex 3: Bài 3 bỏ thôi thầy ơi 

// Ex 4: 