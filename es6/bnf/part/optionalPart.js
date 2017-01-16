'use strict';

var SequenceOfPartsPart = require('./sequenceOfParts');

class OptionalPartPart extends SequenceOfPartsPart {
  parse(context, productions, noWhitespace) {
    noWhitespace = this.getNoWhitespace();  ///

    var nodes = [],
        terminalPartOrProduction = this.terminalPartOrProduction(productions);
    
    if (terminalPartOrProduction !== null) {
      var terminalPartOrProductionNodes = terminalPartOrProduction.parse(context, productions, noWhitespace),
          terminalPartOrProductionParsed = (terminalPartOrProductionNodes !== null);

      if (terminalPartOrProductionParsed) {
        nodes = terminalPartOrProductionNodes;
      }
    }

    return nodes;
  }
  
  static fromSymbol(symbol, terminalSymbolsRegExp, significantTokenTypes, noWhitespace) {
    var regExp = /([^*]+)\?$/,
        Class = OptionalPartPart,
        optionalPartPart = super.fromSymbol(symbol, terminalSymbolsRegExp, significantTokenTypes, noWhitespace, regExp, Class);

    return optionalPartPart;
  }
}

module.exports = OptionalPartPart;
