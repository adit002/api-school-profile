const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql2");
const myConnection = require("express-myconnection");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// ✅ Load environment variables
const DB_HOST = process.env.DB_HOST || "mysql";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_PORT = process.env.DB_PORT || 3306;
const DB_NAME = process.env.DB_NAME || "api_school_profile";
const APP_PORT = process.env.PORT || 3000;

const indexController = require("./routes/index");
const initData = require("./initData");

// ✅ Basic middleware setup (excluding DB middleware for now)
app.set("port", APP_PORT);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ✅ Start server
app.listen(app.get("port"), () => {
  console.log(`✅ Server running on port ${app.get("port")}`);
  waitForMySQLConnection();
});

// ✅ Retry logic + DB creation + delayed middleware setup
function waitForMySQLConnection(retries = 10, delay = 3000) {
  const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  db.connect((err) => {
    if (err) {
      console.error(`❌ MySQL connection failed (${retries} retries left):`, err.message);
      if (retries <= 0) return process.exit(1);
      return setTimeout(() => waitForMySQLConnection(retries - 1, delay), delay);
    }

    db.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``, (err) => {
      if (err) {
        console.error("❌ Failed to create DB:", err.message);
        return process.exit(1);
      }

      console.log("✅ Database ensured.");

      const appDb = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
        database: DB_NAME,
        multipleStatements: true,
      });

      appDb.connect((err) => {
        if (err) {
          console.error("❌ Error connecting to ensured DB:", err.message);
          return process.exit(1);
        }

        console.log("✅ Connected to MySQL DB. Running initData...");
        initData(appDb);

        // ✅ Register DB middleware only after DB is ready
        app.use(
          myConnection(
            mysql,
            {
              host: DB_HOST,
              user: DB_USER,
              password: DB_PASSWORD,
              port: DB_PORT,
              database: DB_NAME,
            },
            "single"
          )
        );

        // ✅ Route registration also goes here, after DB is ready
        app.use("/", indexController);
      });
    });
  });
}
