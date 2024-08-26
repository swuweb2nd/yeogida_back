const express = require("express");
const router = express.Router();

router.post('/account', (req, res) => {
    const { password } = req.body;
});

module.exports = router;


