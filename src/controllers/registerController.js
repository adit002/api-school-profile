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
    if (err) {
      return res.status(500).json({ message: 'Database connection error', error: err });
    }
    conn.query('INSERT INTO register SET ?', [data], (err, result) => {
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
    const { id, ...newregister } = req.body;
    
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