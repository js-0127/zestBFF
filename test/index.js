import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello test");
});

app.listen(9001, () => {
  console.log("Example app listening on port 9001!");
});
