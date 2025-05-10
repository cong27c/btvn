require("module-alias/register");
const express = require("express");
const cors = require("cors");
const router = require("./src/routes");
const notFoundHandler = require("./src/middlewares/notFoundHandler");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
