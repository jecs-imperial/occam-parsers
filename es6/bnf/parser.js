'use strict';

const Parts = require('./parts'),
      Definition = require('./definition'),
      Production = require('./production'),
      cycles = require('../grammar/cycles'),
      leftRecursion = require('../grammar/leftRecursion'),
      CommonParser = require('../common/parser'),
      PartProduction = require('./production/part'),
      DefinitionProduction = require('./production/definition'),
      ProductionProduction = require('./production/production'),
      DefinitionsProduction = require('./production/definitions'),
      ProductionsProduction = require('./production/productions'),
      GroupOfPartsProduction = require('./production/groupOfParts'),
      OptionalPartProduction = require('./production/optionalPart'),
      ZeroOrMorePartsProduction = require('./production/zeroOrMoreParts'),
      OneOrMorePartsProduction = require('./production/oneOrMoreParts'),
      VerticalSpaceProduction = require('./production/verticalSpace'),
      ProductionNameProduction = require('./production/productionName'),
      WildcardSymbolProduction = require('./production/wildcardSymbol'),
      TerminalSymbolProduction = require('./production/terminalSymbol'),
      EndOfLineSymbolProduction = require('./production/endOfLineSymbol'),
      NoWhitespacePartProduction = require('./production/noWhitespacePart'),
      RegularExpressionProduction = require('./production/regularExpression'),
      SignificantTokenTypeProduction = require('./production/significantTokenType');

class BNFParser extends CommonParser {
  static generateProductions(node, mappings = {}) {
    let productions = (node !== null) ?
                        node.generateProductions(Production, Definition, Parts, mappings) :
                          [];

    productions = cycles.eliminate(productions);  ///

    productions = leftRecursion.eliminate(productions);  ///

    return productions;
  }

  static fromNothing() {
    const partProduction = new PartProduction(),
          definitionProduction = new DefinitionProduction(),
          productionProduction = new ProductionProduction(),
          definitionsProduction = new DefinitionsProduction(),
          productionsProduction = new ProductionsProduction(),
          groupOfPartsProduction = new GroupOfPartsProduction(),
          optionalPartProduction = new OptionalPartProduction(),
          zeroOrMorePartsProduction = new ZeroOrMorePartsProduction(),
          oneOrMorePartsProduction = new OneOrMorePartsProduction(),
          verticalSpaceProduction = new VerticalSpaceProduction(),
          productionNameProduction = new ProductionNameProduction(),
          wildcardSymbolProduction = new WildcardSymbolProduction(),
          terminalSymbolProduction = new TerminalSymbolProduction(),
          endOfLineSymbolProduction = new EndOfLineSymbolProduction(),
          noWhitespacePartProduction = new NoWhitespacePartProduction(),
          regularExpressionProduction = new RegularExpressionProduction(),
          significantTokenTypeProduction = new SignificantTokenTypeProduction();

    let productions = [
          productionsProduction,
          productionProduction,
          definitionsProduction,
          definitionProduction,
          noWhitespacePartProduction,
          optionalPartProduction,
          zeroOrMorePartsProduction,
          oneOrMorePartsProduction,
          groupOfPartsProduction,
          partProduction,
          verticalSpaceProduction,
          productionNameProduction,
          regularExpressionProduction,
          significantTokenTypeProduction,
          terminalSymbolProduction,
          endOfLineSymbolProduction,
          wildcardSymbolProduction
        ];

    productions = cycles.eliminate(productions);  ///

    productions = leftRecursion.eliminate(productions);  ///

    const bnfParser = new BNFParser(productions);
    
    return bnfParser;
  }
}

module.exports = BNFParser;
