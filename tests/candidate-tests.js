var getCandidatePromo = require('../get-candidate-promo');
var assertNoError = require('assert-no-error');
var test = require('tape');

test('Get candidate', candidateTest);

function candidateTest(t) {
  getCandidatePromo(candidateCheck);

  function candidateCheck(error, promo) {
    assertNoError(t.ok, error, 'No error while getting promo.');
    console.log(promo);
    t.ok(
      promo.length > 0,
      'Promo is not empty. (Look at promo to make sure it is OK.)'
    );
    t.end();
  }
}
