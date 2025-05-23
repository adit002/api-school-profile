const res = require("express/lib/response");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const controller = {};

controller.login = (req, res) => {
    const { username, password } = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({
                message: 'Database connection error',
                response: 500,
                result: null
            });
        }

        conn.query('SELECT * FROM user WHERE username = ?', [username], (err, users) => {
            if (err) {
                return res.status(500).json({
                    message: 'Query error',
                    response: 500,
                    result: null
                });
            }

            if (users.length === 0) {
                return res.status(401).json({
                    message: 'User not found',
                    response: 401,
                    result: { result: 'Failed' }
                });
            }

            const user = users[0];
            const passwordMatch = bcrypt.compareSync(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({
                    message: 'Invalid password',
                    response: 401,
                    result: { result: 'Failed' }
                });
            }

            const token = jwt.sign(
                { id: user.id, username: user.username },'your-secret-key',
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Success',
                response: 200,
                result: {
                    token: token
                }
            });
        });
    });
};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM user', (err, users) => {
            if (err) {
                res.json(err);
            }
            res.status(200).json({
                message: 'Success',
                response: 200,
                result: {
                    data: users
                }
            });
        });
    });
};

controller.save = (req, res) => {
  const { id, ...data } = req.body;

  req.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({ message: 'Database connection error', error: err });
    }
    conn.query('INSERT INTO user SET ?', [data], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Insert failed', error: err });
      }

      return res.status(200).json({
        message: 'Success',
        response: 200,
        insertId: result.insertId, 
      });
    });
  });
};

controller.update = (req, res) => {
    const { id, ...newuser } = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE user set ? WHERE id = ?', [newuser, id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.status(200).json({
                message: 'Success',
                response: 200,
            });
        });
    });
};

module.exports = controller;