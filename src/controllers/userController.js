const res = require("express/lib/response");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM user', (err, users) => {
            if (err) {
                res.json(err);
            }

            res.json({
                data: users
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO user set ?', [data], (err, user) => {
            if (err) {
                res.json(err);
            }

            res.redirect('/');
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newuser = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE user set ? WHERE id = ?', [newuser, id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/');
        });
    });
};

module.exports = controller;