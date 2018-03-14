'use strict';

const Definition = require('../definition'),
      ruleNames = require('../ruleNames'),
      RuleNamePart = require('../part/nonTerminal/ruleName'),
      OneOrMorePartsPart = require('../part/nonTerminal/oneOrMoreParts');

const { PartRuleName } = ruleNames;

class DefinitionDefinition extends Definition {
  constructor() {
    const noWhitespace = false,
          partRuleName = PartRuleName,
          partRuleNamePart = new RuleNamePart(partRuleName, noWhitespace),
          oneOrMoreRuleNamePartsPart = new OneOrMorePartsPart(partRuleNamePart),
          parts = [
            oneOrMoreRuleNamePartsPart
          ];

    super(parts)
  }
}

module.exports = DefinitionDefinition;
