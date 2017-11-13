const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');

describe('deleting a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name : 'Joe'});
        joe.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        joe.remove()
            .then(() => User.findOne({name : 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method remove', (done) => {
        //remove records with given criteria
        User.remove({name: 'Joe'})
            .then(() => User.findOne({name : 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findOneAndRemove', (done) => {
        User.findOneAndRemove({ name: 'Joe'})
        .then(() => User.findOne({name : 'Joe'}))
        .then((user) => {
            assert(user === null);
            done();
        });
    });

    it('class method findIdAndRemove', (done) => {
        User.findByIdAndRemove( joe._id )
        .then(() => User.findOne({name : 'Joe'}))
        .then((user) => {
            assert(user === null);
            done();
        });
    });
});