'use strict';

const lexers = require('occam-lexers');

const ruleUtilities = require('../../../utilities/rule'),
      NonTerminalPart = require('../../part/nonTerminal');

const { BNFLexer } = lexers,
      { specialSymbols } = BNFLexer,
      { findRuleByName } = ruleUtilities,
      { NO_WHITESPACE, exclamationMark } = specialSymbols;

const type = 'RuleName';

class RuleNamePart extends NonTerminalPart {
  constructor(ruleName, lookAhead, noWhitespace) {
    super(type);

    this.ruleName = ruleName;
    this.lookAhead = lookAhead;
    this.noWhitespace = noWhitespace;
  }
  
  getRuleName() {
    return this.ruleName;
  }

  getLookAhead() {
    return this.lookAhead;
  }

  isRuleNamePart() {
    const ruleNamePart = true;

    return ruleNamePart;
  }

  findRule(configuration) {
    const name = this.ruleName, ///
          rules = configuration.getRules(),
          rule = findRuleByName(name, rules);

    return rule;
  }

  parse(configuration, noWhitespace) {
    let node = null;
    
    const rule = this.findRule(configuration);

    if (rule !== null) {
      noWhitespace = noWhitespace || this.noWhitespace; ///

      node = rule.parse(configuration, noWhitespace);
    }

    return node;
  }

  parseWithLookAhead(configuration, noWhitespace, callback) {
    const rule = this.findRule(configuration);

    if (rule !== null) {
      noWhitespace = noWhitespace || this.noWhitespace; ///

      rule.parseWithLookAhead(configuration, noWhitespace, callback);
    }
  }

  asString() {
    const lookAheadString = this.lookAhead ?
                              exclamationMark :
                                '',
          noWhitespaceString = this.noWhitespace ?
                                 NO_WHITESPACE :
                                   '',
          string = `${noWhitespaceString}${this.ruleName}${lookAheadString}`;

    return string;
  }
}

Object.assign(RuleNamePart, {
  type
});

module.exports = RuleNamePart;
