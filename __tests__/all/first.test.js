var assert = require('chai').assert;

// import {assert} from chai;

describe('github', function() {
  it('My first test with hermione', function() {
    return this.browser
      .url('https://github.com/gemini-testing/hermione')
      .getText('.markdown-body h1')
      .then(function(title) {
        assert.equal(title, 'Hermione');
      });
  });
});
