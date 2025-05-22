const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');
const newsController = require('../controllers/newsController');
const registerController = require('../controllers/registerController');
const userController = require('../controllers/userController');

router.get('/list/user', userController.list);
router.get('/list/profile', profileController.list);
router.post('/profile/add', profileController.save);
router.post('/profile/update/:id', profileController.update);
router.get('/list/news', newsController.list);
router.post('/news/add', newsController.save);
router.post('/news/update/:id', newsController.update);
router.get('/list/register', registerController.list);
router.post('/register/add', registerController.save);
router.post('/register/update/:id', registerController.update);

module.exports = router;