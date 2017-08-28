'use strict';

const lexers = require('occam-lexers');

const SequenceOfPartsPart = require('./sequenceOfParts');

const { BNFLexer } = lexers,
      { specialSymbols } = BNFLexer,
      { asterisk } = specialSymbols;

class ZeroOrMorePartsPart extends SequenceOfPartsPart {
  constructor(part) {
    const type = ZeroOrMorePartsPart.type;

    super(type, part);
  }

  parse(configuration, noWhitespace) {
    noWhitespace = false; ///
    
    let nodes = [];
    
    const part = this.getPart();

    for(;;) {
      const partNodeOrNodes = part.parse(configuration, noWhitespace),
            partParsed = (partNodeOrNodes !== null);

      if (partParsed) {
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

ZeroOrMorePartsPart.type = 'ZeroOrMoreParts';

module.exports = ZeroOrMorePartsPart;