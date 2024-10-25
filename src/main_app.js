import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import todoRoute from "./routes/todos.js";

const app = express();
dotenv.config();

const username = encodeURIComponent(process.env.CLUSTOR_USER);
const password = encodeURIComponent(process.env.CLUSTOR_PWD);
const clustor_url = process.env.CLUSTOR_URL;

const CONN_URL = `mongodb+srv://${username}:${password}@${clustor_url}/?retryWrites=true&w=majority&appName=todo-api-clustor`;

app.set("trust proxy", true);

app.use(cors());
// app.use(bodyParser.json({ limit: '1mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use("/todos", todoRoute);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

const PORT = process.env.TODO_APP_PORT || 3000;

// mongoose.set("strictQuery", false);
// mongoose
//   .connect(CONN_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => app.listen(PORT, () => console.log(`Server running: ${PORT}`)))
//   .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);

  // Then connect to MongoDB
  mongoose.set("strictQuery", false);
  mongoose
    .connect(CONN_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Failed to connect to MongoDB:", error));
});

export default app;
