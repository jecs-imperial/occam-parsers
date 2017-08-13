'use strict';

const lexers = require('occam-lexers');

const parserUtilities = require('../../utilities/parser');

const { BNFLexer } = lexers,
      { specialSymbols } = BNFLexer,
      { NO_WHITESPACE } = specialSymbols;

class RuleNamePart {
  constructor(ruleName, noWhitespace = false) {
    this.ruleName = ruleName;
    this.noWhitespace = noWhitespace;
  }
  
  getRuleName() {
    return this.ruleName;
  }
  
  isLeftRecursive(ruleName) {
    const leftRecursive = (this.ruleName === ruleName);
    
    return leftRecursive;
  }
  
  parse(configuration, noWhitespace) {
    noWhitespace = noWhitespace || this.noWhitespace; ///

    let nodeOrNodes = null;
    
    const name = this.ruleName, ///
          rules = configuration.getRules(),
          rule = parserUtilities.findRuleByName(name, rules);

    if (rule !== null) {
      nodeOrNodes = rule.parse(configuration, noWhitespace);
    }

    return nodeOrNodes;
  }

  toString() {
    const noWhitespaceString = this.noWhitespace ?
                                 NO_WHITESPACE :
                                   '',
          string = `${noWhitespaceString}${this.ruleName}`;

    return string;
  }
}

module.exports = RuleNamePart;
