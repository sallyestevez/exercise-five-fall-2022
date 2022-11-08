const express = require('express');
const router = express.Router();
// initialize firestore - cloud database
const firestore = require("firebase/firestore");
// Initialize Cloud Firestore and get a reference to the service
const db = firestore.getFirestore();

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
});

// define the index page route
router.get('/', (req, res) => {
    const postsQuery = firestore.getDocs(firestore.collection(db, "posts"));
    const postsArray = [];

    postsQuery
        .then((response) => {
            response.forEach((post) => {
                console.log(post.data());
                // spread operator: spreads arrays out inside other array - spreads return value
                postsArray.push({ id: post.id, ...post.data() });
            });
            res.send(postsArray);
        })
        .catch((error) => {
            console.log(error);
            return res.send(error);
        });
    });

module.exports = router;