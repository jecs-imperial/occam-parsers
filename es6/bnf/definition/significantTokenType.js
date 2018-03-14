'use strict';

const Definition = require('../definition'),
      SignificantTokenTypePart = require('../part/terminal/significantTokenType');

class SignificantTokenTypeDefinition extends Definition {
  constructor(significantTokenType) {
    const noWhitespace = false,
          significantTokenTypePart = new SignificantTokenTypePart(significantTokenType, noWhitespace),
          parts = [
            significantTokenTypePart
          ];
    
    super(parts)
  }
}

module.exports = SignificantTokenTypeDefinition;
