'use strict';

const metastatementDefaultCustomGrammar = require('./defaultCustomGrammar/metastatement'),
      statementDefaultCustomGrammar = require('./defaultCustomGrammar/statement'),
      termDefaultCustomGrammar = require('./defaultCustomGrammar/term');

const defaultCustomGrammarsMap = {
  metastatement: metastatementDefaultCustomGrammar,
  statement: statementDefaultCustomGrammar,
  term: termDefaultCustomGrammar
};

module.exports = defaultCustomGrammarsMap;