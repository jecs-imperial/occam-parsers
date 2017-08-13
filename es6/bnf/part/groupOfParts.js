'use strict';

const arrayUtilities = require('../../utilities/array');

class GroupOfPartsPart {
  constructor(parts) {
    this.parts = parts;
  }

  parse(configuration, noWhitespace) {
    noWhitespace = false; ///
    
    let nodes = [];

    const savedIndex = configuration.savedIndex(),
          everyPartParsed = this.parts.every(function(part) {
            const partNodeOrNodes = part.parse(configuration, noWhitespace),
                  partParsed = (partNodeOrNodes !== null);

            if (partParsed) {
              nodes = nodes.concat(partNodeOrNodes);
            }

            return partParsed;
          });

    if (!everyPartParsed) {
      configuration.backtrack(savedIndex);

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

  static fromNodes(nodes) {
    nodes = arrayUtilities.discardLastThenFirst(nodes);

    const noWhitespace = false,
          parts = nodes.map(function(node) {
            const part = node.generatePart(noWhitespace);

            return part;
          }),
          groupOfPartsPart = new GroupOfPartsPart(parts);

    return groupOfPartsPart;
  }
}

module.exports = GroupOfPartsPart;
