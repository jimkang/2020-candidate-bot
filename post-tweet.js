/* global process */

var config = require('./config');
var Twit = require('twit');
var getCandidatePromo = require('./get-candidate-promo');
var sb = require('standard-bail')();
var callNextTick = require('call-next-tick');

var dryRun = false;
if (process.argv.length > 2) {
  dryRun = process.argv[2].toLowerCase() == '--dry';
}

var tryLimit = 10;
var tries = 0;

var twit = new Twit(config.twitter);

function run() {
  tries += 1;

  getCandidatePromo(sb(postTweet, wrapUp));
}

function postTweet(text, done) {
  if (dryRun) {
    console.log('Would have tweeted:', text);
    callNextTick(done);
  } else {
    var body = {
      status: text
    };
    twit.post('statuses/update', body, done);
  }
}

function wrapUp(error, data) {
  if (error) {
    console.log(error, error.stack);

    if (data) {
      console.log('data:', data);
    }
    if (tries < tryLimit) {
      // Try again.
      callNextTick(run);
    }
  } else {
    console.log('Completed.');
  }
}

run();
