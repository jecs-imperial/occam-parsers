'use strict';

const VerticalBranchParseTree = require('./verticalBranch');

class ProductionNameParseTree extends VerticalBranchParseTree {
  static fromNonTerminalNode(nonTerminalNode, lines) {
    const productionName = nonTerminalNode.getProductionName(),
          firstLine = nonTerminalNode.getFirstLine(),
          lastLine = nonTerminalNode.getLastLine();

    let string;

    if ((firstLine === null) && (lastLine === null)) {
      string = productionName;  ///
    } else {
      const firstLineIndex = lines.indexOf(firstLine),
            lastLineIndex = lines.indexOf(lastLine),
            firstLineNumber = firstLineIndex + 1,
            lastLineNumber = lastLineIndex + 1;

      string = `${productionName} (${firstLineNumber}-${lastLineNumber})`;
    }

    const stringLength = string.length,
          verticalBranchParseTreeWidth = stringLength, ///
          verticalBranchParseTree = VerticalBranchParseTree.fromWidth(verticalBranchParseTreeWidth),
          verticalBranchPosition = verticalBranchParseTree.getVerticalBranchPosition(),
          productionNameParseTree = VerticalBranchParseTree.fromString(string, ProductionNameParseTree, verticalBranchPosition);

    productionNameParseTree.appendToTop(verticalBranchParseTree);

    return productionNameParseTree;
  }
}

module.exports = ProductionNameParseTree;
