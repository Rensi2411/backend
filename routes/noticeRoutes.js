const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.verifyToken);


router.post('/create', noticeController.createNotice);


router.get('/all', noticeController.getAllNotices);

module.exports = router;
