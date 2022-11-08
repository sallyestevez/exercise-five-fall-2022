const express = require('express');
// Import the functions you need from the SDKs you need
const firebase = require("firebase/app");
// initiate express
const app = express();
// setting port - dynamically with heroku
const port = process.env.PORT || 4000;


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBems9PqRe21Pp7YFk5VUl1KtdAogecWwk",
  authDomain: "exercise-five-91012.firebaseapp.com",
  projectId: "exercise-five-91012",
  storageBucket: "exercise-five-91012.appspot.com",
  messagingSenderId: "1095081824585",
  appId: "1:1095081824585:web:ee2479492ad4433d274a98"
};
firebase.initializeApp(firebaseConfig);

// routes for directing user to correct place
const indexRoute = require('./routes/index');
const singlePostRoute = require('./routes/singlePost');

// tell express to use routes
app.use('/', indexRoute);
app.use('/post', singlePostRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});