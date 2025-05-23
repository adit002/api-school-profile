const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM news', (err, news) => {
            if (err) {
                res.json(err);
            }

            res.status(200).json({
                message: 'Success',
                response: 200,
                result: {
                    data: news
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
    conn.query('INSERT INTO news SET ?', [data], (err, result) => {
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
    const { id, ...newnews } = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE news set ? WHERE id = ?', [newnews, id], (err, rows) => {
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