'use strict';

var lexers = require('occam-lexers'),
    BNFLexer = lexers.BNFLexer,
    FlorenceLexer = lexers.FlorenceLexer;

var grammar = require('./grammar'),
    BNFParser = require('../bnf/parser'),
    CommonParser = require('../common/parser'),
    ErrorNode = require('./node/error'),
    LabelNode = require('./node/label'),
    IncludeDirectiveNode = require('./node/includeDirective'),
    TransparentNode = require('../common/node/transparent'),
    DiscardChildrenNode = require('../common/node/discardChildren'),
    DiscardFirstChildNode = require('../common/node/discardFirstChild'),
    DiscardSecondChildNode = require('../common/node/discardSecondChild'),
    TransparentThenKeepSecondNode = require('../common/node/transparentThenKeepSecond'),
    TransparentThenDiscardFirstNode = require('../common/node/transparentThenDiscardFirst');

class FlorenceParser extends CommonParser {
  static fromNothing() {
    var lines = BNFLexer.linesFromGrammar(grammar),
        significantTokenTypes = FlorenceLexer.getSignificantTokenTypes(),
        mappings = {
          'includeDirective': IncludeDirectiveNode,
          'error': ErrorNode,
          'label': LabelNode,
          'part': TransparentNode,
          'rule': DiscardFirstChildNode,
          'then': DiscardFirstChildNode,
          'hence': DiscardFirstChildNode,
          'proof': DiscardFirstChildNode,
          'lemma': DiscardFirstChildNode,
          'theorem': DiscardFirstChildNode,
          'suppose': DiscardFirstChildNode,
          'premise': TransparentThenKeepSecondNode,
          'premises': TransparentThenDiscardFirstNode,
          'therefore': TransparentThenDiscardFirstNode,
          'directive': TransparentNode,
          'conclusion': DiscardFirstChildNode,
          'endsOfLines': DiscardChildrenNode,
          'statementBody': TransparentNode,
          'commaThenLabel': TransparentThenKeepSecondNode,
          'labelledStatement': DiscardSecondChildNode,
          'parenthesisedLabels': TransparentThenKeepSecondNode,
          '(labelled)Statement': TransparentNode,
          'specialOrUnassigned': TransparentNode,
          'subLemmaOr(labelled)Statement': TransparentNode
        },
        productions = BNFParser.parse(lines, significantTokenTypes, mappings),
        florenceParser = new FlorenceParser(productions);

    return florenceParser;
  }
}

module.exports = FlorenceParser;
