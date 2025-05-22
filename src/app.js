const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql2");
const myConnection = require("express-myconnection");
const path = require("path");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

const app = express();
const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB_PORT = process.env.DATABASE_PORT || 3306;
const APP_PORT = process.env.PORT || 3000;

const indexController = require("./routes/index");
const initData = require("./initData");

app.set("port", APP_PORT);

app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: DB_PASSWORD,
      port: DB_PORT,
      database: "api_school_profile",
    },
    "single"
  )
);
app.use(cors());
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.static(path.join(__dirname, "public")));
app.use('/', indexController);
app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);

  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: DB_PASSWORD,
    port: DB_PORT,
    multipleStatements: true,
  });

  db.connect((err) => {
    if (err) {
      console.error("Failed to connect for data initialization:", err);
      return;
    }

    console.log("Database connection established for initData.");
    initData(db);
  });
});
