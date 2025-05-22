const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const profileController = require('../controllers/profileController');
const newsController = require('../controllers/newsController');
const registerController = require('../controllers/registerController');
const userController = require('../controllers/userController');

router.post('/public/user/login', userController.login);
router.get('/public/user/list/profile', profileController.list);
router.get('/public/user/list/news', newsController.list);
router.post('/public/user/register/add', registerController.save);

router.get('/private/user/list/user', verifyToken, userController.list);
router.post('/private/user/profile/add',verifyToken, profileController.save);
router.post('/private/user/profile/update', verifyToken, profileController.update);
router.post('/private/user/news/add', verifyToken, newsController.save);
router.post('/private/user/news/update', verifyToken, newsController.update);
router.get('/private/user/list/register', verifyToken, registerController.list);
router.post('/private/user/register/update', verifyToken, registerController.update);

module.exports = router;