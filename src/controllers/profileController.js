const res = require("express/lib/response");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM profile', (err, profiles) => {
            if (err) {
                res.json(err);
            }

            res.json({
                data: profiles
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO profile set ?', [data], (err, profile) => {
            if (err) {
                res.json(err);
            }

            res.redirect('/');
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newprofile = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE profile set ? WHERE id = ?', [newprofile, id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/');
        });
    });
};

module.exports = controller;