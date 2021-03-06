"use strict";

import Rule from "../rule";
import PartNode from "../node/part";
import RuleNameDefinition from "../definition/ruleName";
import TerminalPartRuleDefinition from "../definition/partRule/terminal";
import NonTerminalPartRuleDefinition from "../definition/partRule/nonTerminal";

import { PartRuleName, NoWhitespacePartRuleName } from "../ruleNames";

export default class PartRule extends Rule {
  constructor() {
    const name = PartRuleName,
          terminalPartRuleDefinition = new TerminalPartRuleDefinition(),
          nonTerminalPartRuleDefinition = new NonTerminalPartRuleDefinition(),
          noWhitespacePartRuleNameDefinition = new RuleNameDefinition(NoWhitespacePartRuleName),
          definitions = [
            nonTerminalPartRuleDefinition,
            terminalPartRuleDefinition,
            noWhitespacePartRuleNameDefinition
          ],
          Node = PartNode;
    
    super(name, definitions, Node)
  }
}
