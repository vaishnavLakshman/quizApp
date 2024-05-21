const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use("/login", (req, res) => {
  res.send({
    token: "quizToken_007",
  });
});

app.listen(8081, () => {
  console.log("API running on localhost:8081/login");
});
