'use strict';

const TerminalNodeParseTree = require('../parseTree/terminalNode');

class TerminalNode {
  constructor(significantToken, line) {
    this.significantToken = significantToken;
    this.line = line;
  }

  getSignificantToken() {
    return this.significantToken;
  }

  getLine() {
    return this.line;
  }

  getFirstLine() {
    const firstLine = this.line; ///

    return firstLine;
  }

  getLastLine() {
    const lastLine = this.line;  ///

    return lastLine;
  }

  getFirstSignificantToken() {
    const firstSignificantToken = this.significantToken;  ///

    return firstSignificantToken;
  }

  getLastSignificantToken() {
    const lastSignificantToken = this.significantToken;  ///

    return lastSignificantToken;
  }

  getParseTree() {
    const terminalNode = this,  ///
          terminalNodeParseTree = TerminalNodeParseTree.fromTerminalNode(terminalNode),
          parseTree = terminalNodeParseTree;  ///

    return parseTree;
  }

  static fromSignificantToken(significantToken, Class = TerminalNode) {
    const line = significantToken.getLine(),
          terminalNode = new Class(significantToken, line);

    return terminalNode;
  }
}

module.exports = TerminalNode;
