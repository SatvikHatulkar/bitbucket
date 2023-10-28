const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const bodyParser = require('body-parser');
const routes = require("./routes/authRoutes");
const repo = require("./routes/repoRoutes");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '50mb' })); // Set the limit to handle larger payloads
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware
app.use(cors());
app.use(express.json());

try {
  mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connected...");
} catch (error) {
  console.log(error);
}

app.use("/api", routes);
app.use("/user", repo);

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));