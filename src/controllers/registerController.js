const res = require("express/lib/response");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM register', (err, registers) => {
            if (err) {
                res.json(err);
            }

            res.status(200).json({
                message: 'Success',
                response: 200,
                result: {
                    data: registers
                }
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO register set ?', [data], (err, register) => {
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

controller.update = (req, res) => {
    const { id } = req.params;
    const newregister = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE register set ? WHERE id = ?', [newregister, id], (err, rows) => {
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