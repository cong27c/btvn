require("module-alias/register");
const express = require("express");
const cors = require("cors");
const router = require("./src/routes/api/index");
const adminRouter = require("./src/routes/admin/index");
const notFoundHandler = require("./src/middlewares/notFoundHandler");
const errorHandler = require("./src/middlewares/errorHandler");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(expressLayouts);
app.set("layout", "./admin/layouts/default");

app.use("/api/v1", router);
app.use("/admin", adminRouter);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
