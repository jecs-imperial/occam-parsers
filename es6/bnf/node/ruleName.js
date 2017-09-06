'use strict';

const arrayUtilities = require('../../utilities/array'),
      NonTerminalNode = require('../../common/node/nonTerminal'),
      RuleNamePart = require('../part/nonTerminal/ruleName');

const { first } = arrayUtilities;

class RuleNameNode extends NonTerminalNode {
  generatePart(noWhitespace) {
    const ruleName = this.getRuleName(),
          ruleNamePart = new RuleNamePart(ruleName, noWhitespace);

    return ruleNamePart;
  }

  getRuleName() {
    const childNodes = this.getChildNodes(),
          firstChildNode = first(childNodes),
          terminalNode = firstChildNode,  ///
          terminalNodeContent = terminalNode.getContent(),
          ruleName = terminalNodeContent; ///
    
    return ruleName;
  }
  
  static fromNodesAndRuleName(nodes, ruleName) { return NonTerminalNode.fromNodesAndRuleName(RuleNameNode, nodes, ruleName); }
}

module.exports = RuleNameNode;
