'use strict';

const Context = require('./context');

class CommonParser {
  constructor(productions) {
    this.productions = productions;
  }

  getProductions() {
    return this.productions;
  }

  parse(tokens, production = null) {
    let node = null;

    if (production === null) {
      const productionsLength = this.productions.length;

      if (productionsLength > 0) {
        const firstProduction = first(this.productions);

        production = firstProduction; ///
      }
    }

    if (production !== null) {
      const context = new Context(tokens, this.productions),
            noWhitespace = false,
            nodeOrNodes = production.parse(context, noWhitespace);

      if (nodeOrNodes !== null) {
        node = (nodeOrNodes instanceof Array) ?
                 first(nodeOrNodes) :
                   nodeOrNodes;
      }
    }

    return node;
  }

  findProduction(productionName) {
    const name = productionName,  ///
          index = this.indexOfProductionByName(name),
          production = (index !== null) ?
                         this.productions[index] :
                           null;

    return production;
  }

  indexOfProductionByName(name) {
    let index,
        foundIndex = null;

    this.productions.some(function(production, index) {
      const productionName = production.getName();

      if (productionName === name) {
        foundIndex = index;

        return true;
      } else {
        return false;
      }
    });

    index = foundIndex; ///

    return index;
  }
}

module.exports = CommonParser;

function first(array) { return array[0]; }
