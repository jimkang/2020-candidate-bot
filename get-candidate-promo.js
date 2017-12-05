var getRandomWikiTopic = require('get-random-wiki-topic');
var sb = require('standard-bail')();
var splitToWords = require('split-to-words');
var probable = require('probable');

var isCool = require('iscool')();

var underscoreRegex = /_/g;

function getCandidatePromo(getCandidatePromoDone) {
  var wikiOpts = {
    language: 'en'
  };

  if (probable.roll(10) === 0) {
    wikiOpts.wikipediaProtocol = 'http';
    wikiOpts.wikipediaDomain = 'bulbapedia.bulbagarden.net';
  }

  getRandomWikiTopic(wikiOpts, sb(useTopic, getCandidatePromoDone));

  function useTopic(topic) {
    if (splitToWords(topic).every(isCool)) {
      var promo =
        'VOTE ' + topic.replace(underscoreRegex, ' ').toUpperCase() + ' 2020';
      getCandidatePromoDone(null, promo);
    } else {
      // Try again.
      console.log('Rejecting topic:', topic);
      getRandomWikiTopic(wikiOpts, sb(useTopic, getCandidatePromoDone));
    }
  }
}

module.exports = getCandidatePromo;
