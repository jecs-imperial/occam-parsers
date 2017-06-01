'use strict';

const Rule = require('../../rule'),
      SignificantTokenTypePart = require('../../part/significantTokenType');

class StringSignificantTokenTypeRule extends Rule {
  constructor() {
    const noWhitespace = false,
          stringSignificantTokenType = 'string',
          stringSignificantTokenTypePart = new SignificantTokenTypePart(stringSignificantTokenType, noWhitespace),
          parts = [
            stringSignificantTokenTypePart
          ];

    super(parts)
  }
}

module.exports = StringSignificantTokenTypeRule;