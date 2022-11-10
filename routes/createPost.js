const express = require('express');
const router = express.Router();
// initialize firestore - cloud database
const firestore = require("firebase/firestore");
// Initialize Cloud Firestore and get a reference to the service
const db = firestore.getFirestore();

// action will be URL
const createPostForm = `
<h1>Create Post</h1>
<form action="/create/submit">
    <div style="display: flex; flex-direction: column; max-width: 400px;">
        <label for="title">Title</label>
        <input type="text" name="postTitle" placeholder="Title" />
        <label for="text">Text</label>
        <input type="text" name="postText" placeholder="Text" />
        <label for="author">Author</label>
        <input type="text" name="postAuthor" placeholder="Author" />
        <button type="submit">Submit</button>
    </div>
</form>
`;

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

router.get("/", (req, res) => {
    res.send(createPostForm);
});

router.get("/submit", (req, res) => {
    const queryParams = req.query; // query params from URL
    const title = queryParams.postTitle;
    const text = queryParams.postText;
    const author = queryParams.postAuthor;

    // create ID from title - using regex to replace characters
    // allows it to work as URL
    // replacing all spaces with dashes sand making text lowercase
    const idFromTitle = title.replace(/\s+/g, "-").toLowerCase();

    // submit post to Firebase
    const setBlogPost = firestore.setDoc(
        firestore.doc(db, "posts", idFromTitle),
        {
            title: title,
            text: text,
            author: author,
        }
    );

    setBlogPost
        .then((response) => {
            // if successful send correct message
            res.send(`
                <h1>Submission Successful!</h1>
                <p><a href="/create">Add another post</a></p>
                <p><a href="/">Go Home</a></p>
            `);
        })
        .catch((error) => {
            //if failure send error message
            console.warn(error);
            res.send(`Error Submitting: ${error.toString()}`);
        });
});

module.exports = router;