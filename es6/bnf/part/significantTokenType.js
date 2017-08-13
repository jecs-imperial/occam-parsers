'use strict';

const lexers = require('occam-lexers');

const TerminalNode = require('../../common/node/terminal');

const { BNFLexer } = lexers,
      { specialSymbols } = BNFLexer,
      { NO_WHITESPACE } = specialSymbols;

class SignificantTokenTypePart {
  constructor(significantTokenType, noWhitespace = false) {
    this.significantTokenType = significantTokenType;
    this.noWhitespace = noWhitespace;
  }
  
  parse(configuration, noWhitespace) {
    noWhitespace = noWhitespace || this.noWhitespace; ///
    
    let terminalNode = null;
    
    const savedIndex = configuration.savedIndex(),
          nextNonWhitespaceSignificantToken = configuration.getNextNonWhitespaceSignificantToken(noWhitespace),
          significantToken = nextNonWhitespaceSignificantToken; ///

    if (significantToken !== null) {
      const significantTokenType = significantToken.getType(),
            parsed = (significantTokenType === this.significantTokenType);  ///

      if (parsed) {
        terminalNode = TerminalNode.fromSignificantToken(significantToken);
      }
    }

    if (terminalNode === null) {
      configuration.backtrack(savedIndex);
    }

    return terminalNode;
  }

  toString() {
    const noWhitespaceString = this.noWhitespace ?
                                 NO_WHITESPACE :
                                   '',
          string = `${noWhitespaceString}[${this.significantTokenType}]`;
    
    return string;
  }
}

module.exports = SignificantTokenTypePart;
