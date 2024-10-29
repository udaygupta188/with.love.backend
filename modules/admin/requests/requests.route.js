const express = require('express');
const router = express.Router();
const requestsController = require('./requests.controller');

router.get('/view-requests',requestsController.getRequests )
router.put('/update-request',requestsController.updateRequestStatus )

module.exports = router