const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

module.exports = async function (db) {
  const sqlPath = path.join(__dirname, "../database/db.sql");
  const sql = fs.readFileSync(sqlPath, "utf-8");

  db.query(sql, async (err) => {
    if (err) {
      console.error("Error executing db.sql:", err);
      return;
    }

    console.log("✅ Tables initialized successfully.");

    db.query("SELECT COUNT(*) AS count FROM user", async (err, result) => {
      if (err) {
        console.error("Failed to query user table:", err);
        return;
      }

      if (result[0].count === 0) {
        const plainPassword = "admin123";
        const hashedPassword = await bcrypt.hash(plainPassword, 10); 

        const defaultUser = {
          username: "admin",
          password: hashedPassword,
        };

        db.query("INSERT INTO user SET ?", defaultUser, (err) => {
          if (err) {
            console.error("Failed to insert default user:", err);
          } else {
            console.log("✅ Default admin user created with encrypted password.");
          }

          db.end();
        });
      } else {
        console.log("ℹ️ Default user already exists.");
        db.end();
      }
    });
  });
};
