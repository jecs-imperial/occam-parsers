'use strict';

const lexers = require('occam-lexers'),
    specialSymbols = lexers.specialSymbols,
    SignificantToken = lexers.SignificantToken;

const TerminalNode = require('../../common/node/terminal');

class EndOfLinePart {
  constructor(noWhitespace) {
    this.noWhitespace = noWhitespace;
  }

  parse(context, noWhitespace) {
    noWhitespace = noWhitespace || this.noWhitespace; ///

    let terminalNode = null;
    
    const savedIndex = context.savedIndex(),
          nextNonWhitespaceSignificantToken = context.getNextNonWhitespaceSignificantToken(noWhitespace),
          significantToken = nextNonWhitespaceSignificantToken; ///

    if (significantToken !== null) {
      const type = significantToken.getType(),
           found = (type === SignificantToken.types.endOfLine);

      if (found) {
        terminalNode = TerminalNode.fromSignificantToken(significantToken);
      }
    }
    
    if (terminalNode === null) {
      context.backtrack(savedIndex);
    }

    return terminalNode;
  }

  static fromSymbol(symbol, significantTokenTypes, noWhitespace) {
    let endOfLinePart = null;
    
    const found = (symbol === specialSymbols.END_OF_LINE);

    if (found) {
      endOfLinePart = new EndOfLinePart(noWhitespace);
    }

    return endOfLinePart;
  }
}

module.exports = EndOfLinePart;
