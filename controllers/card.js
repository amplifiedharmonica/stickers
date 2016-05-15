/**
 * Created by antoremin on 5/5/16.
 */
// Load required packages
var Card = require('../models/card');
var express = require('express')
var busboy = require('connect-busboy');
var fs = require('fs-extra');
var guidGenerator = require('../utils/utils');

function bind(func, context) {
    return function() { // (*)
        return func.apply(context, arguments);
    };
}

// Create endpoint /api/cards for POSTS
exports.postCards = function(req, res) {
    // Create a new instance of the Card model
    var card = new Card();
    var fstream;

    // Set the card properties that came from the POST data
    // card.title = req.body.title;
    // card.text = req.body.text;
    // card.cardid = req.body.cardid;

    console.log(req.body);
    req.pipe(req.busboy);

    req.busboy.on('field', function(fieldname, val) {
        this[fieldname] = val;
        console.log(this);
    }.bind(card));

    req.busboy.on('file', function (fieldname, file, filename) {

        var card = this;
        console.log("Uploading: " + filename);
        var extension = filename.substring(filename.lastIndexOf('.'));

        filename = guidGenerator() + extension;
        fstream = fs.createWriteStream('./media/' + filename);
        file.pipe(fstream);

        card.image = '/media/' + filename;

        console.log(card);

    }.bind(card));

    req.busboy.on('finish', function() {
        card = this;
        // Save the card and check for errors
        card.save(function(err) {
            if (err)
                res.send(err);

            res.redirect('/api/cards/' + card.cardid)
            //json({ message: 'Card added to the archive!', data: card });
        });
        console.log(this);


    }.bind(card))
};

// Create endpoint /api/cards for GET
exports.getCards = function(req, res) {
    // Use the Card model to find all cards
    Card.find(function(err, cards) {
        if (err)
            res.send(err);

        res.json(card);
    });
};

// Create endpoint /api/cards/:card_id for GET
exports.getCard = function(req, res) {
    // Use the Card model to find a specific card
    Card.findOne({cardid:req.params.card_id}, function(err, card) {
        if (err)
            res.send(err);
        if (card.cardid == null)
            res.render('index', {title: 'Sorry, no such card yet'})
        else {
            res.render('index', {title: card.title, body: card.text, image: card.image});

        }
    });
};

// Create endpoint /api/cards/:card_id for PUT
exports.putCard = function(req, res) {
    // Use the Card model to find a specific card
    Card.findById(req.params.card_id, function(err, card) {
        if (err)
            res.send(err);

        // Update the existing card text
        card.text = req.body.text;

        // Save the card and check for errors
        card.save(function(err) {
            if (err)
                res.send(err);

            res.render('index', {cards: json(card)})
        });
    });
};

// Create endpoint /api/cards/:card_id for DELETE
exports.deleteCard = function(req, res) {
    // Use the Card model to find a specific card and remove it
    Card.findByIdAndRemove(req.params.card_id, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Card removed from the archive!' });
    });
};