'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lexers = require('occam-lexers');

var NonTerminalPart = require('../../part/nonTerminal'),
    parserUtilities = require('../../../utilities/parser');

var BNFLexer = lexers.BNFLexer,
    specialSymbols = BNFLexer.specialSymbols,
    NO_WHITESPACE = specialSymbols.NO_WHITESPACE;

var RuleNamePart = function (_NonTerminalPart) {
  _inherits(RuleNamePart, _NonTerminalPart);

  function RuleNamePart(ruleName) {
    var noWhitespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, RuleNamePart);

    var type = RuleNamePart.type;

    var _this = _possibleConstructorReturn(this, (RuleNamePart.__proto__ || Object.getPrototypeOf(RuleNamePart)).call(this, type));

    _this.ruleName = ruleName;

    _this.noWhitespace = noWhitespace;
    return _this;
  }

  _createClass(RuleNamePart, [{
    key: 'getRuleName',
    value: function getRuleName() {
      return this.ruleName;
    }
  }, {
    key: 'parse',
    value: function parse(configuration, noWhitespace) {
      noWhitespace = noWhitespace || this.noWhitespace; ///

      var nodeOrNodes = null;

      var name = this.ruleName,
          ///
      rules = configuration.getRules(),
          rule = parserUtilities.findRuleByName(name, rules);

      if (rule !== null) {
        nodeOrNodes = rule.parse(configuration, noWhitespace);
      }

      return nodeOrNodes;
    }
  }, {
    key: 'asString',
    value: function asString() {
      var noWhitespaceString = this.noWhitespace ? NO_WHITESPACE : '',
          string = '' + noWhitespaceString + this.ruleName;

      return string;
    }
  }]);

  return RuleNamePart;
}(NonTerminalPart);

RuleNamePart.type = 'RuleName';

module.exports = RuleNamePart;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9ibmYvcGFydC9ub25UZXJtaW5hbC9ydWxlTmFtZS5qcyJdLCJuYW1lcyI6WyJsZXhlcnMiLCJyZXF1aXJlIiwiTm9uVGVybWluYWxQYXJ0IiwicGFyc2VyVXRpbGl0aWVzIiwiQk5GTGV4ZXIiLCJzcGVjaWFsU3ltYm9scyIsIk5PX1dISVRFU1BBQ0UiLCJSdWxlTmFtZVBhcnQiLCJydWxlTmFtZSIsIm5vV2hpdGVzcGFjZSIsInR5cGUiLCJjb25maWd1cmF0aW9uIiwibm9kZU9yTm9kZXMiLCJuYW1lIiwicnVsZXMiLCJnZXRSdWxlcyIsInJ1bGUiLCJmaW5kUnVsZUJ5TmFtZSIsInBhcnNlIiwibm9XaGl0ZXNwYWNlU3RyaW5nIiwic3RyaW5nIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLGNBQVIsQ0FBZjs7QUFFQSxJQUFNQyxrQkFBa0JELFFBQVEsd0JBQVIsQ0FBeEI7QUFBQSxJQUNNRSxrQkFBa0JGLFFBQVEsMkJBQVIsQ0FEeEI7O0FBR00sSUFBRUcsUUFBRixHQUFlSixNQUFmLENBQUVJLFFBQUY7QUFBQSxJQUNFQyxjQURGLEdBQ3FCRCxRQURyQixDQUNFQyxjQURGO0FBQUEsSUFFRUMsYUFGRixHQUVvQkQsY0FGcEIsQ0FFRUMsYUFGRjs7SUFJQUMsWTs7O0FBQ0osd0JBQVlDLFFBQVosRUFBNEM7QUFBQSxRQUF0QkMsWUFBc0IsdUVBQVAsS0FBTzs7QUFBQTs7QUFDMUMsUUFBTUMsT0FBT0gsYUFBYUcsSUFBMUI7O0FBRDBDLDRIQUdwQ0EsSUFIb0M7O0FBSzFDLFVBQUtGLFFBQUwsR0FBZ0JBLFFBQWhCOztBQUVBLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBUDBDO0FBUTNDOzs7O2tDQUVhO0FBQ1osYUFBTyxLQUFLRCxRQUFaO0FBQ0Q7OzswQkFFS0csYSxFQUFlRixZLEVBQWM7QUFDakNBLHFCQUFlQSxnQkFBZ0IsS0FBS0EsWUFBcEMsQ0FEaUMsQ0FDaUI7O0FBRWxELFVBQUlHLGNBQWMsSUFBbEI7O0FBRUEsVUFBTUMsT0FBTyxLQUFLTCxRQUFsQjtBQUFBLFVBQTRCO0FBQ3RCTSxjQUFRSCxjQUFjSSxRQUFkLEVBRGQ7QUFBQSxVQUVNQyxPQUFPYixnQkFBZ0JjLGNBQWhCLENBQStCSixJQUEvQixFQUFxQ0MsS0FBckMsQ0FGYjs7QUFJQSxVQUFJRSxTQUFTLElBQWIsRUFBbUI7QUFDakJKLHNCQUFjSSxLQUFLRSxLQUFMLENBQVdQLGFBQVgsRUFBMEJGLFlBQTFCLENBQWQ7QUFDRDs7QUFFRCxhQUFPRyxXQUFQO0FBQ0Q7OzsrQkFFVTtBQUNULFVBQU1PLHFCQUFxQixLQUFLVixZQUFMLEdBQ0VILGFBREYsR0FFSSxFQUYvQjtBQUFBLFVBR01jLGNBQVlELGtCQUFaLEdBQWlDLEtBQUtYLFFBSDVDOztBQUtBLGFBQU9ZLE1BQVA7QUFDRDs7OztFQXRDd0JsQixlOztBQXlDM0JLLGFBQWFHLElBQWIsR0FBb0IsVUFBcEI7O0FBRUFXLE9BQU9DLE9BQVAsR0FBaUJmLFlBQWpCIiwiZmlsZSI6InJ1bGVOYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBsZXhlcnMgPSByZXF1aXJlKCdvY2NhbS1sZXhlcnMnKTtcblxuY29uc3QgTm9uVGVybWluYWxQYXJ0ID0gcmVxdWlyZSgnLi4vLi4vcGFydC9ub25UZXJtaW5hbCcpLFxuICAgICAgcGFyc2VyVXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbGl0aWVzL3BhcnNlcicpO1xuXG5jb25zdCB7IEJORkxleGVyIH0gPSBsZXhlcnMsXG4gICAgICB7IHNwZWNpYWxTeW1ib2xzIH0gPSBCTkZMZXhlcixcbiAgICAgIHsgTk9fV0hJVEVTUEFDRSB9ID0gc3BlY2lhbFN5bWJvbHM7XG5cbmNsYXNzIFJ1bGVOYW1lUGFydCBleHRlbmRzIE5vblRlcm1pbmFsUGFydCB7XG4gIGNvbnN0cnVjdG9yKHJ1bGVOYW1lLCBub1doaXRlc3BhY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IHR5cGUgPSBSdWxlTmFtZVBhcnQudHlwZTtcblxuICAgIHN1cGVyKHR5cGUpO1xuXG4gICAgdGhpcy5ydWxlTmFtZSA9IHJ1bGVOYW1lO1xuICAgIFxuICAgIHRoaXMubm9XaGl0ZXNwYWNlID0gbm9XaGl0ZXNwYWNlO1xuICB9XG4gIFxuICBnZXRSdWxlTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5ydWxlTmFtZTtcbiAgfVxuICBcbiAgcGFyc2UoY29uZmlndXJhdGlvbiwgbm9XaGl0ZXNwYWNlKSB7XG4gICAgbm9XaGl0ZXNwYWNlID0gbm9XaGl0ZXNwYWNlIHx8IHRoaXMubm9XaGl0ZXNwYWNlOyAvLy9cblxuICAgIGxldCBub2RlT3JOb2RlcyA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbmFtZSA9IHRoaXMucnVsZU5hbWUsIC8vL1xuICAgICAgICAgIHJ1bGVzID0gY29uZmlndXJhdGlvbi5nZXRSdWxlcygpLFxuICAgICAgICAgIHJ1bGUgPSBwYXJzZXJVdGlsaXRpZXMuZmluZFJ1bGVCeU5hbWUobmFtZSwgcnVsZXMpO1xuXG4gICAgaWYgKHJ1bGUgIT09IG51bGwpIHtcbiAgICAgIG5vZGVPck5vZGVzID0gcnVsZS5wYXJzZShjb25maWd1cmF0aW9uLCBub1doaXRlc3BhY2UpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlT3JOb2RlcztcbiAgfVxuXG4gIGFzU3RyaW5nKCkge1xuICAgIGNvbnN0IG5vV2hpdGVzcGFjZVN0cmluZyA9IHRoaXMubm9XaGl0ZXNwYWNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5PX1dISVRFU1BBQ0UgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICBzdHJpbmcgPSBgJHtub1doaXRlc3BhY2VTdHJpbmd9JHt0aGlzLnJ1bGVOYW1lfWA7XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG59XG5cblJ1bGVOYW1lUGFydC50eXBlID0gJ1J1bGVOYW1lJztcblxubW9kdWxlLmV4cG9ydHMgPSBSdWxlTmFtZVBhcnQ7XG4iXX0=