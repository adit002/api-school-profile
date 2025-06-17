const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key';

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Invalid token format' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.getConnection((connErr, conn) => {
            if (connErr) return res.status(500).json({ message: 'DB error' });

            conn.query(
                'SELECT session_id FROM user_sessions WHERE user_id = ?',
                [decoded.id],
                (queryErr, results) => {
                    if (queryErr) return res.status(500).json({ message: 'Session check error' });

                    const dbSessionId = results[0]?.session_id;
                    if (!dbSessionId || dbSessionId !== decoded.sessionId) {
                        return res.status(401).json({ message: 'Invalid token' });
                    }

                    req.user = decoded;
                    next();
                }
            );
        });
    });
}

module.exports = verifyToken;
