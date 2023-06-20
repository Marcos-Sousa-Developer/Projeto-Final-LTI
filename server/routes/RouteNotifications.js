const express = require('express');
const router = express.Router(); 
const notifications = require('../controllers/NotificationsController')

router.get('/getNotifications', notifications.getNotifications)

router.post('/insertNotificationsByID/:id', notifications.insertNotifications)

router.post('/insertNotifications', notifications.insertNotifications)


router.delete('/deleteNotifications', notifications.deleteNotifications) 

module.exports = router