'use strict';

const lexers = require('occam-lexers'),
      easyLayout = require('easy-layout');

const ExampleView = require('../../example/view'),
      FlorenceParser = require('../../florence/parser'),
      BNFTextarea = require('../common/textarea/bnf'),
      ContentTextarea = require('../common/textarea/content'),
      ParseTreeTextarea = require('../common/textarea/parseTree'),
      LexicalEntriesTextarea = require('../common/textarea/lexicalEntries'),
      MainVerticalSplitter = require('../common/verticalSplitter/main');

const { FlorenceLexer } = lexers,
      { SizeableElement } = easyLayout;

class FlorenceExampleView extends ExampleView {
  getLexer() {
    const Lexer = FlorenceLexer;  ///

    return Lexer;
  }

  getParser() {
    const Parser = FlorenceParser;  ///

    return Parser;
  }

  getInitialContent() {
    const initialContent = '';

    return initialContent;
  }

  getParseTree() {
    let parseTree = null;

    const bnf = this.getBNF(),
          lexicalEntries = this.getLexicalEntries(),
          entries = lexicalEntries, ///
          florenceLexer = FlorenceLexer.fromEntries(entries),
          florenceParser = FlorenceParser.fromBNF(bnf),
          content = this.getContent(),
          tokens = florenceLexer.tokenise(content),
          node = florenceParser.parse(tokens);

    if (node !== null) {
      parseTree = node.asParseTree(tokens);
    }

    return parseTree;
  }

  childElements(properties) {
    const keyUpHandler = this.keyUpHandler.bind(this);

    return ([

      <h1>Florence parser example</h1>,
      <div className="columns">
        <SizeableElement>
          <h2>Lexical entries</h2>
          <LexicalEntriesTextarea onKeyUp={keyUpHandler} />
          <h2>BNF</h2>
          <BNFTextarea onKeyUp={keyUpHandler} />
        </SizeableElement>
        <MainVerticalSplitter />
        <div className="column">
          <h2>Parse tree</h2>
          <ParseTreeTextarea />
          <h2>Content</h2>
          <ContentTextarea onKeyUp={keyUpHandler} />
        </div>
      </div>

    ]);
  }

  static fromProperties(properties) { return ExampleView.fromProperties(FlorenceExampleView, properties);}
}

Object.assign(FlorenceExampleView, {
  defaultProperties: {
    className: 'florence'
  }
});

module.exports = FlorenceExampleView;
