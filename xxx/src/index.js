const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

const { sequelize } = require("./lib/sequelize");
sequelize.sync({ alter: true });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Toko buku API</h1>");
});

const { tagRoutes, ProductRoutes } = require("./routes");

app.use("/product-cover", express.static(`${__dirname}/public/product_cover`))

app.use("/tags", tagRoutes);
app.use("/product", ProductRoutes)

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
