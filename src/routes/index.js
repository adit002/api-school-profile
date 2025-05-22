const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const profileController = require('../controllers/profileController');
const newsController = require('../controllers/newsController');
const registerController = require('../controllers/registerController');
const userController = require('../controllers/userController');

router.post('/public/user/login', userController.login);

router.get('/private/user/list/user', verifyToken, userController.list);
router.get('/private/user/list/profile', verifyToken, profileController.list);
router.post('/private/user/profile/add',verifyToken, profileController.save);
router.post('/private/user/profile/update/:id', verifyToken, profileController.update);
router.get('/private/user/list/news', verifyToken, newsController.list);
router.post('/private/user/news/add', verifyToken, newsController.save);
router.post('/private/user/news/update/:id', verifyToken, newsController.update);
router.get('/private/user/list/register', verifyToken, registerController.list);
router.post('/private/user/register/add', verifyToken, registerController.save);
router.post('/private/user/register/update/:id', verifyToken, registerController.update);

module.exports = router;