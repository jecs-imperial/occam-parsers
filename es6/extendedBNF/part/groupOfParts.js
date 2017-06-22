'use strict';

const arrayUtil = require('../../util/array');

class GroupOfPartsPart {
  constructor(parts) {
    this.parts = parts;
  }

  parse(context, noWhitespace) {
    noWhitespace = false; ///
    
    let nodes = [];

    const savedIndex = context.savedIndex(),
          everyPartParsed = this.parts.every(function(part) {
            const partNodeOrNodes = part.parse(context, noWhitespace),
                  partParsed = (partNodeOrNodes !== null);

            if (partParsed) {
              nodes = nodes.concat(partNodeOrNodes);
            }

            return partParsed;
          });

    if (!everyPartParsed) {
      context.backtrack(savedIndex);

      nodes = null;
    }

    return nodes;
  }

  toString() {
    const partsString = this.parts.reduce(function(partsString, part) {
            const partString = part.toString();

            if (partsString === null) {
              partsString = partString;
            } else {
              partsString = `${partsString} ${partString}`;
            }

            return partsString;
          }, null),
          string = `( ${partsString} )`;

    return string;
  }

  static fromNodes(nodes, Parts) {
    nodes = arrayUtil.discardFirstAndLast(nodes);

    const noWhitespace = false,
          parts = nodes.map(function(node) {
            const part = node.generatePart(Parts, noWhitespace);

            return part;
          }),
          groupOfPartsPart = new GroupOfPartsPart(parts);

    return groupOfPartsPart;
  }
}

module.exports = GroupOfPartsPart;