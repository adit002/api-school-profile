const res = require("express/lib/response");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM news', (err, newss) => {
            if (err) {
                res.json(err);
            }

            res.json({
                data: newss
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO news set ?', [data], (err, news) => {
            if (err) {
                res.json(err);
            }

            res.redirect('/');
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newnews = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE news set ? WHERE id = ?', [newnews, id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            
            res.redirect('/');
        });
    });
};

module.exports = controller;