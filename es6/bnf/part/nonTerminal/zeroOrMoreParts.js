'use strict';

const lexers = require('occam-lexers');

const SequenceOfPartsPart = require('./sequenceOfParts');

const { BNFLexer } = lexers,
      { specialSymbols } = BNFLexer,
      { asterisk } = specialSymbols;

const type = 'ZeroOrMoreParts';

class ZeroOrMorePartsPart extends SequenceOfPartsPart {
  constructor(part) {
    super(type, part);
  }

  parse(configuration, noWhitespace) {
    noWhitespace = false; ///
    
    let nodes = [];
    
    const part = this.getPart();

    for(;;) {
      const partNodeOrNodes = part.parse(configuration, noWhitespace),
            parsed = (partNodeOrNodes !== null);

      if (parsed) {
        nodes = nodes.concat(partNodeOrNodes);
      } else {
        break;
      }
    }

    return nodes;
  }

  asString() {
    const operatorString = asterisk,  ///
          string = super.asString(operatorString);

    return string;
  }

  static fromOneOrMorePartsPart(oneOrMorePartsPart) {
    const part = oneOrMorePartsPart.getPart(),
          zeroOrMorePartsPart = new ZeroOrMorePartsPart(part);

    return zeroOrMorePartsPart;
  }
}

Object.assign(ZeroOrMorePartsPart, {
  type
});

module.exports = ZeroOrMorePartsPart;
