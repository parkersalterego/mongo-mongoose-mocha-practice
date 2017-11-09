const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {

    let joe, blogpost, comment;

    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'Js is great!', content: 'Yeah it is!'});
        comment = new Comment({ content: 'Awesome post' });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([
            joe.save(),
            blogPost.save(),
            comment.save(),
        ])
            .then(() => done());
    });

    it('saves a relation between user and blog post', (done) => {
        User.findOne({name: 'Joe'})
        .populate('blogPosts')
        .then((user) => {
            assert(user.blogPosts[0].title === 'Js is great!');
            done();
        });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({name: 'Joe'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'Js is great!');
                assert(user.blogPosts.comments[0].content === 'Awesome Post');
                assert(user.blogPosts.comments[0].user.name === 'Joe');
            });
            done();
    });

});