const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
});

// define the index page route
router.get('/', (req, res) => {
    res.send([
        {
            "id": "hey",
            "messasge": "hi",
        }
    ])
});

module.exports = router;