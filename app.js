const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://Max:E9nHoWeEe2SFvmtf@cluster0-uytiv.mongodb.net/diehard?retryWrites=true&w=majority", { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => {
        console.log('connected to database');
    })
    .catch(e => {
        console.log(e);
    })

// mongodb password: E9nHoWeEe2SFvmtf

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    next();
})

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    post.save().then(createdPost => {
        console.log(createdPost);
        res.status(201).json({
            message: "Post added",
            postId: createdPost._id
        });
    });

    
});

app.get('/api/posts', (req, res, next) => {
    Post.find()
    .then(documents => {
        console.log(documents);

        res.status(200).json({
            message: 'Posts fetched!',
            posts: documents
        });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params}).then(res => {
        console.log(res);
        res.status(200).json({message: 'Post deleted.'})
    })
    
})

module.exports = app;