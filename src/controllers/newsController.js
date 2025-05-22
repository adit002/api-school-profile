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
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO news set ?', [data], (err, news) => {
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
    const newnews = req.body;
    
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