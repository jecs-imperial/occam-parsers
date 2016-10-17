'use strict';

var easyui = require('easyui'),
    lexers = require('occam-lexers'),
    Input = easyui.Input,
    BNFLexer = lexers.BNFLexer,
    BasicLexer = lexers.BasicLexer;

var Example = require('./example'),
    Parser = require ('../../es6/parser'),
    BNFParser = require ('../../es6/bnfParser');

var lexer = undefined,
    parser = undefined,
    terminalSymbolsRegExpPatternInputSelector = 'input#terminalSymbolsRegExpPattern',
    terminalSymbolsRegExpPatternInput = new Input(terminalSymbolsRegExpPatternInputSelector);

class BasicExample extends Example {
  static run() {
    updateLexer();

    if (lexer !== null) {
      updateParser();
    }

    terminalSymbolsRegExpPatternInput.onChange(function() {
      updateLexer();

      if (lexer !== null) {
        updateParser();

        Example.updateParseTree(lexer, parser);
      }
    });

    Example.grammarTextArea.onChange(function() {
      if (lexer !== null) {
        updateParser();

        Example.updateParseTree(lexer, parser);
      }
    });

    Example.contentTextArea.onChange(function() {
      if (lexer !== null) {
        Example.updateParseTree(lexer, parser);
      }
    });
  }
}

module.exports = BasicExample;

function updateLexer() {
  try {
    var terminalSymbolsRegExpPatternInputValue = terminalSymbolsRegExpPatternInput.getValue(),
        terminalSymbolsRegExpPattern = terminalSymbolsRegExpPatternInputValue, ///
        terminalSymbolsRegExp = new RegExp('^(' + terminalSymbolsRegExpPattern + ')'),
        grammar = [
          { terminal : terminalSymbolsRegExp }
        ];

    lexer = BasicLexer.fromGrammar(grammar);

    terminalSymbolsRegExpPatternInput.removeClass('error');
  }
  catch(error) {
    terminalSymbolsRegExpPatternInput.addClass('error');

    Example.clearParseTree();

    lexer = null;
  }
}

function updateParser() {
  var grammarTextAreaValue = Example.grammarTextArea.getValue(),
      terminalSymbolsRegExpPatternInputValue = terminalSymbolsRegExpPatternInput.getValue(),
      grammar = grammarTextAreaValue, ///
      lines = BNFLexer.linesFromGrammar(grammar),
      terminalSymbolsRegExpPattern = terminalSymbolsRegExpPatternInputValue, ///
      mappings = {},
      productions = BNFParser.parse(lines, terminalSymbolsRegExpPattern, mappings);

  parser = new Parser(productions);
}
