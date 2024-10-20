const express = require('express');
const router = express.Router();

router.get('/brand', (req, res) => {
    try {
        return res.status(200).json({msg:"working"})
    } catch (error) {
        return res.status(500).json({msg:"Some went wrong"})
    }
 });

module.exports = router