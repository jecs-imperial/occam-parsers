"use strict";

import { specialSymbols } from "occam-lexers";

import EpsilonNode from "../../../common/node/terminal/epsilon";
import TerminalPart from "../../part/terminal";

const { epsilon } = specialSymbols;

export default class EpsilonPart extends TerminalPart {
  parse(nodes, context, callback) {
    let parsed;

    const epsilonNode = EpsilonNode.fromNothing();

    parsed = (epsilonNode !== null);

    if (parsed) {
      nodes.push(epsilonNode);

      if (callback) {
        parsed = callback();

        if (!parsed) {
          nodes.pop();
        }
      }
    }

    return parsed;
  }

  isEpsilonPart() {
    const epsilonPart = true;

    return epsilonPart;
  }

  asString() {
    const string = epsilon; ///

    return string;
  }

  clone() { return super.clone(EpsilonPart); }
}
