'use strict';

const lexers = require('occam-lexers');

const ruleNames = require('../ruleNames'),
      Definition = require('../definition'),
      RuleNamePart = require('../part/nonTerminal/ruleName'),
      GroupOfPartsPart = require('../part/nonTerminal/groupOfParts'),
      TerminalSymbolPart = require('../part/terminal/terminalSymbol'),
      ZeroOrMorePartsPart = require('../part/nonTerminal/zeroOrMoreParts');

const { BNFLexer } = lexers,
      { specialSymbols } = BNFLexer,
      { verticalBar } = specialSymbols,
      { DefinitionRuleName } = ruleNames;

class DefinitionsDefinition extends Definition {
  constructor() {
    const lookAhead = false,
          noWhitespace = false,
          definitionRuleName = DefinitionRuleName,
          verticalBarTerminalSymbolContent = verticalBar,
          definitionRuleNamePart = new RuleNamePart(definitionRuleName, lookAhead, noWhitespace),
          verticalBarTerminalSymbolPart = new TerminalSymbolPart(verticalBarTerminalSymbolContent, noWhitespace),
          verticalBarTerminalSymbolThenDefinitionRuleNameParts = [
            verticalBarTerminalSymbolPart,
            definitionRuleNamePart
          ],
          groupOfPartsPart = new GroupOfPartsPart(verticalBarTerminalSymbolThenDefinitionRuleNameParts),
          zeroOrMoreGroupOfPartsPart = new ZeroOrMorePartsPart(groupOfPartsPart),
          parts = [
            definitionRuleNamePart,
            zeroOrMoreGroupOfPartsPart
          ];
    
    super(parts)
  }
}

module.exports = DefinitionsDefinition;
