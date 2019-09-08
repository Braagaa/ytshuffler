const express = require('express');
const router = express.Router();

//GET SEARCH
router.get('/', (req, res) => res.json({message: 'hi'}));

module.exports = router;
