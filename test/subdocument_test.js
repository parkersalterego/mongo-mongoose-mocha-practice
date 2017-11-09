const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create a sub document', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{title: 'PostTitle'}],
        });

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.posts[0].title === 'PostTitle');
                done();
            });
    });

    it('can add sub documents to an existing record', () => {
        const joe = new User ({
            name: 'Joe',
            posts: []
        });

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                user.posts.push({title: 'New post'});
                return user.save();
            })
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
            });
    });

    it('can remove sub documents from an existing record', () => {
        const joe = new User ({
            name: 'Joe',
            posts: [{title: 'New Post'}]
        });

        joe.save()
        .then(()=> User.findOne({name: 'Joe'}))
        .then((user) => {
            user.posts[0].remove();
            return user.save();
        })
        .then(() => user.findOne({name: 'Joe'}))
        .then((user) => {
            assert(user.posts[0].title === null);
        });
    });
});