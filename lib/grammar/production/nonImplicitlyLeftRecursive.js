'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rule = require('../../common/rule'),
    Production = require('../../common/production');

var NonImplicitlyLeftRecursiveProduction = function (_Production) {
  _inherits(NonImplicitlyLeftRecursiveProduction, _Production);

  function NonImplicitlyLeftRecursiveProduction() {
    _classCallCheck(this, NonImplicitlyLeftRecursiveProduction);

    return _possibleConstructorReturn(this, (NonImplicitlyLeftRecursiveProduction.__proto__ || Object.getPrototypeOf(NonImplicitlyLeftRecursiveProduction)).apply(this, arguments));
  }

  _createClass(NonImplicitlyLeftRecursiveProduction, null, [{
    key: 'fromProductionAndPreviousProductions',
    value: function fromProductionAndPreviousProductions(production, previousProductions) {
      var productionName = production.getName(),
          productionNode = production.getNode(),
          name = productionName,
          ///
      rules = rulesFromProductionAndPreviousProductions(production, previousProductions),
          Node = productionNode,
          ///
      nonImplicitlyLeftRecursiveProduction = new NonImplicitlyLeftRecursiveProduction(name, rules, Node);

      return nonImplicitlyLeftRecursiveProduction;
    }
  }]);

  return NonImplicitlyLeftRecursiveProduction;
}(Production);

module.exports = NonImplicitlyLeftRecursiveProduction;

function rulesFromProductionAndPreviousProductions(production, previousProductions) {
  var productionRules = production.getRules(),
      rules = productionRules.reduce(function (rules, productionRule) {
    var productionRuleImplicitlyLeftRecursivePreviousProduction = productionRule.implicitlyLeftRecursivePreviousProduction(previousProductions);

    if (productionRuleImplicitlyLeftRecursivePreviousProduction !== null) {
      var previousProduction = productionRuleImplicitlyLeftRecursivePreviousProduction,
          ///
      rulesWithPreviousProductionInlineFromProductionInline = rulesWithPreviousProductionInlineFromProductionRuleAndPreviousProduction(productionRule, previousProduction);

      rules = rules.concat(rulesWithPreviousProductionInlineFromProductionInline);
    } else {
      var rule = productionRule;

      rules.push(rule);
    }

    return rules;
  }, []);

  return rules;
}

function rulesWithPreviousProductionInlineFromProductionRuleAndPreviousProduction(productionRule, previousProduction) {
  var previousProductionRules = previousProduction.getRules(),
      rulesWithPreviousProductionInline = previousProductionRules.map(function (previousProductionRule) {
    var previousProductionRuleParts = previousProductionRule.getParts(),
        productionRuleAllButFirstParts = productionRule.getAllButFirstParts(),
        ruleWithPreviousProductionInlineParts = [].concat(previousProductionRuleParts).concat(productionRuleAllButFirstParts),
        ruleWithPreviousProductionInline = new Rule(ruleWithPreviousProductionInlineParts);

    return ruleWithPreviousProductionInline;
  });

  return rulesWithPreviousProductionInline;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9ncmFtbWFyL3Byb2R1Y3Rpb24vbm9uSW1wbGljaXRseUxlZnRSZWN1cnNpdmUuanMiXSwibmFtZXMiOlsiUnVsZSIsInJlcXVpcmUiLCJQcm9kdWN0aW9uIiwiTm9uSW1wbGljaXRseUxlZnRSZWN1cnNpdmVQcm9kdWN0aW9uIiwicHJvZHVjdGlvbiIsInByZXZpb3VzUHJvZHVjdGlvbnMiLCJwcm9kdWN0aW9uTmFtZSIsImdldE5hbWUiLCJwcm9kdWN0aW9uTm9kZSIsImdldE5vZGUiLCJuYW1lIiwicnVsZXMiLCJydWxlc0Zyb21Qcm9kdWN0aW9uQW5kUHJldmlvdXNQcm9kdWN0aW9ucyIsIk5vZGUiLCJub25JbXBsaWNpdGx5TGVmdFJlY3Vyc2l2ZVByb2R1Y3Rpb24iLCJtb2R1bGUiLCJleHBvcnRzIiwicHJvZHVjdGlvblJ1bGVzIiwiZ2V0UnVsZXMiLCJyZWR1Y2UiLCJwcm9kdWN0aW9uUnVsZSIsInByb2R1Y3Rpb25SdWxlSW1wbGljaXRseUxlZnRSZWN1cnNpdmVQcmV2aW91c1Byb2R1Y3Rpb24iLCJpbXBsaWNpdGx5TGVmdFJlY3Vyc2l2ZVByZXZpb3VzUHJvZHVjdGlvbiIsInByZXZpb3VzUHJvZHVjdGlvbiIsInJ1bGVzV2l0aFByZXZpb3VzUHJvZHVjdGlvbklubGluZUZyb21Qcm9kdWN0aW9uSW5saW5lIiwicnVsZXNXaXRoUHJldmlvdXNQcm9kdWN0aW9uSW5saW5lRnJvbVByb2R1Y3Rpb25SdWxlQW5kUHJldmlvdXNQcm9kdWN0aW9uIiwiY29uY2F0IiwicnVsZSIsInB1c2giLCJwcmV2aW91c1Byb2R1Y3Rpb25SdWxlcyIsInJ1bGVzV2l0aFByZXZpb3VzUHJvZHVjdGlvbklubGluZSIsIm1hcCIsInByZXZpb3VzUHJvZHVjdGlvblJ1bGUiLCJwcmV2aW91c1Byb2R1Y3Rpb25SdWxlUGFydHMiLCJnZXRQYXJ0cyIsInByb2R1Y3Rpb25SdWxlQWxsQnV0Rmlyc3RQYXJ0cyIsImdldEFsbEJ1dEZpcnN0UGFydHMiLCJydWxlV2l0aFByZXZpb3VzUHJvZHVjdGlvbklubGluZVBhcnRzIiwicnVsZVdpdGhQcmV2aW91c1Byb2R1Y3Rpb25JbmxpbmUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxtQkFBUixDQUFiO0FBQUEsSUFDTUMsYUFBYUQsUUFBUSx5QkFBUixDQURuQjs7SUFHTUUsb0M7Ozs7Ozs7Ozs7O3lEQUN3Q0MsVSxFQUFZQyxtQixFQUFxQjtBQUMzRSxVQUFNQyxpQkFBaUJGLFdBQVdHLE9BQVgsRUFBdkI7QUFBQSxVQUNNQyxpQkFBaUJKLFdBQVdLLE9BQVgsRUFEdkI7QUFBQSxVQUVNQyxPQUFPSixjQUZiO0FBQUEsVUFFOEI7QUFDeEJLLGNBQVFDLDBDQUEwQ1IsVUFBMUMsRUFBc0RDLG1CQUF0RCxDQUhkO0FBQUEsVUFJTVEsT0FBT0wsY0FKYjtBQUFBLFVBSThCO0FBQ3hCTSw2Q0FBdUMsSUFBSVgsb0NBQUosQ0FBeUNPLElBQXpDLEVBQStDQyxLQUEvQyxFQUFzREUsSUFBdEQsQ0FMN0M7O0FBT0EsYUFBT0Msb0NBQVA7QUFDRDs7OztFQVZnRFosVTs7QUFhbkRhLE9BQU9DLE9BQVAsR0FBaUJiLG9DQUFqQjs7QUFFQSxTQUFTUyx5Q0FBVCxDQUFtRFIsVUFBbkQsRUFBK0RDLG1CQUEvRCxFQUFvRjtBQUNsRixNQUFNWSxrQkFBa0JiLFdBQVdjLFFBQVgsRUFBeEI7QUFBQSxNQUNNUCxRQUFRTSxnQkFBZ0JFLE1BQWhCLENBQXVCLFVBQVNSLEtBQVQsRUFBZ0JTLGNBQWhCLEVBQWdDO0FBQzdELFFBQU1DLDBEQUEwREQsZUFBZUUseUNBQWYsQ0FBeURqQixtQkFBekQsQ0FBaEU7O0FBRUEsUUFBSWdCLDREQUE0RCxJQUFoRSxFQUFzRTtBQUNwRSxVQUFNRSxxQkFBcUJGLHVEQUEzQjtBQUFBLFVBQW9GO0FBQzlFRyw4REFBd0RDLHlFQUF5RUwsY0FBekUsRUFBeUZHLGtCQUF6RixDQUQ5RDs7QUFHQVosY0FBUUEsTUFBTWUsTUFBTixDQUFhRixxREFBYixDQUFSO0FBQ0QsS0FMRCxNQUtPO0FBQ0wsVUFBTUcsT0FBT1AsY0FBYjs7QUFFQVQsWUFBTWlCLElBQU4sQ0FBV0QsSUFBWDtBQUNEOztBQUVELFdBQU9oQixLQUFQO0FBQ0QsR0FmTyxFQWVMLEVBZkssQ0FEZDs7QUFrQkEsU0FBT0EsS0FBUDtBQUNEOztBQUVELFNBQVNjLHdFQUFULENBQWtGTCxjQUFsRixFQUFrR0csa0JBQWxHLEVBQXNIO0FBQ3BILE1BQU1NLDBCQUEwQk4sbUJBQW1CTCxRQUFuQixFQUFoQztBQUFBLE1BQ01ZLG9DQUFvQ0Qsd0JBQXdCRSxHQUF4QixDQUE0QixVQUFTQyxzQkFBVCxFQUFpQztBQUMvRixRQUFNQyw4QkFBOEJELHVCQUF1QkUsUUFBdkIsRUFBcEM7QUFBQSxRQUNNQyxpQ0FBaUNmLGVBQWVnQixtQkFBZixFQUR2QztBQUFBLFFBRU1DLHdDQUF3QyxHQUFHWCxNQUFILENBQVVPLDJCQUFWLEVBQXVDUCxNQUF2QyxDQUE4Q1MsOEJBQTlDLENBRjlDO0FBQUEsUUFHTUcsbUNBQW1DLElBQUl0QyxJQUFKLENBQVNxQyxxQ0FBVCxDQUh6Qzs7QUFLQSxXQUFPQyxnQ0FBUDtBQUNELEdBUG1DLENBRDFDOztBQVVBLFNBQU9SLGlDQUFQO0FBQ0QiLCJmaWxlIjoibm9uSW1wbGljaXRseUxlZnRSZWN1cnNpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFJ1bGUgPSByZXF1aXJlKCcuLi8uLi9jb21tb24vcnVsZScpLFxuICAgICAgUHJvZHVjdGlvbiA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi9wcm9kdWN0aW9uJyk7XG5cbmNsYXNzIE5vbkltcGxpY2l0bHlMZWZ0UmVjdXJzaXZlUHJvZHVjdGlvbiBleHRlbmRzIFByb2R1Y3Rpb24ge1xuICBzdGF0aWMgZnJvbVByb2R1Y3Rpb25BbmRQcmV2aW91c1Byb2R1Y3Rpb25zKHByb2R1Y3Rpb24sIHByZXZpb3VzUHJvZHVjdGlvbnMpIHtcbiAgICBjb25zdCBwcm9kdWN0aW9uTmFtZSA9IHByb2R1Y3Rpb24uZ2V0TmFtZSgpLFxuICAgICAgICAgIHByb2R1Y3Rpb25Ob2RlID0gcHJvZHVjdGlvbi5nZXROb2RlKCksXG4gICAgICAgICAgbmFtZSA9IHByb2R1Y3Rpb25OYW1lLCAgLy8vXG4gICAgICAgICAgcnVsZXMgPSBydWxlc0Zyb21Qcm9kdWN0aW9uQW5kUHJldmlvdXNQcm9kdWN0aW9ucyhwcm9kdWN0aW9uLCBwcmV2aW91c1Byb2R1Y3Rpb25zKSxcbiAgICAgICAgICBOb2RlID0gcHJvZHVjdGlvbk5vZGUsICAvLy9cbiAgICAgICAgICBub25JbXBsaWNpdGx5TGVmdFJlY3Vyc2l2ZVByb2R1Y3Rpb24gPSBuZXcgTm9uSW1wbGljaXRseUxlZnRSZWN1cnNpdmVQcm9kdWN0aW9uKG5hbWUsIHJ1bGVzLCBOb2RlKTtcblxuICAgIHJldHVybiBub25JbXBsaWNpdGx5TGVmdFJlY3Vyc2l2ZVByb2R1Y3Rpb247XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb25JbXBsaWNpdGx5TGVmdFJlY3Vyc2l2ZVByb2R1Y3Rpb247XG5cbmZ1bmN0aW9uIHJ1bGVzRnJvbVByb2R1Y3Rpb25BbmRQcmV2aW91c1Byb2R1Y3Rpb25zKHByb2R1Y3Rpb24sIHByZXZpb3VzUHJvZHVjdGlvbnMpIHtcbiAgY29uc3QgcHJvZHVjdGlvblJ1bGVzID0gcHJvZHVjdGlvbi5nZXRSdWxlcygpLFxuICAgICAgICBydWxlcyA9IHByb2R1Y3Rpb25SdWxlcy5yZWR1Y2UoZnVuY3Rpb24ocnVsZXMsIHByb2R1Y3Rpb25SdWxlKSB7XG4gICAgICAgICAgY29uc3QgcHJvZHVjdGlvblJ1bGVJbXBsaWNpdGx5TGVmdFJlY3Vyc2l2ZVByZXZpb3VzUHJvZHVjdGlvbiA9IHByb2R1Y3Rpb25SdWxlLmltcGxpY2l0bHlMZWZ0UmVjdXJzaXZlUHJldmlvdXNQcm9kdWN0aW9uKHByZXZpb3VzUHJvZHVjdGlvbnMpO1xuXG4gICAgICAgICAgaWYgKHByb2R1Y3Rpb25SdWxlSW1wbGljaXRseUxlZnRSZWN1cnNpdmVQcmV2aW91c1Byb2R1Y3Rpb24gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzUHJvZHVjdGlvbiA9IHByb2R1Y3Rpb25SdWxlSW1wbGljaXRseUxlZnRSZWN1cnNpdmVQcmV2aW91c1Byb2R1Y3Rpb24sIC8vL1xuICAgICAgICAgICAgICAgICAgcnVsZXNXaXRoUHJldmlvdXNQcm9kdWN0aW9uSW5saW5lRnJvbVByb2R1Y3Rpb25JbmxpbmUgPSBydWxlc1dpdGhQcmV2aW91c1Byb2R1Y3Rpb25JbmxpbmVGcm9tUHJvZHVjdGlvblJ1bGVBbmRQcmV2aW91c1Byb2R1Y3Rpb24ocHJvZHVjdGlvblJ1bGUsIHByZXZpb3VzUHJvZHVjdGlvbik7XG5cbiAgICAgICAgICAgIHJ1bGVzID0gcnVsZXMuY29uY2F0KHJ1bGVzV2l0aFByZXZpb3VzUHJvZHVjdGlvbklubGluZUZyb21Qcm9kdWN0aW9uSW5saW5lKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcnVsZSA9IHByb2R1Y3Rpb25SdWxlO1xuXG4gICAgICAgICAgICBydWxlcy5wdXNoKHJ1bGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBydWxlcztcbiAgICAgICAgfSwgW10pO1xuXG4gIHJldHVybiBydWxlcztcbn1cblxuZnVuY3Rpb24gcnVsZXNXaXRoUHJldmlvdXNQcm9kdWN0aW9uSW5saW5lRnJvbVByb2R1Y3Rpb25SdWxlQW5kUHJldmlvdXNQcm9kdWN0aW9uKHByb2R1Y3Rpb25SdWxlLCBwcmV2aW91c1Byb2R1Y3Rpb24pIHtcbiAgY29uc3QgcHJldmlvdXNQcm9kdWN0aW9uUnVsZXMgPSBwcmV2aW91c1Byb2R1Y3Rpb24uZ2V0UnVsZXMoKSxcbiAgICAgICAgcnVsZXNXaXRoUHJldmlvdXNQcm9kdWN0aW9uSW5saW5lID0gcHJldmlvdXNQcm9kdWN0aW9uUnVsZXMubWFwKGZ1bmN0aW9uKHByZXZpb3VzUHJvZHVjdGlvblJ1bGUpIHtcbiAgICAgICAgICBjb25zdCBwcmV2aW91c1Byb2R1Y3Rpb25SdWxlUGFydHMgPSBwcmV2aW91c1Byb2R1Y3Rpb25SdWxlLmdldFBhcnRzKCksXG4gICAgICAgICAgICAgICAgcHJvZHVjdGlvblJ1bGVBbGxCdXRGaXJzdFBhcnRzID0gcHJvZHVjdGlvblJ1bGUuZ2V0QWxsQnV0Rmlyc3RQYXJ0cygpLFxuICAgICAgICAgICAgICAgIHJ1bGVXaXRoUHJldmlvdXNQcm9kdWN0aW9uSW5saW5lUGFydHMgPSBbXS5jb25jYXQocHJldmlvdXNQcm9kdWN0aW9uUnVsZVBhcnRzKS5jb25jYXQocHJvZHVjdGlvblJ1bGVBbGxCdXRGaXJzdFBhcnRzKSxcbiAgICAgICAgICAgICAgICBydWxlV2l0aFByZXZpb3VzUHJvZHVjdGlvbklubGluZSA9IG5ldyBSdWxlKHJ1bGVXaXRoUHJldmlvdXNQcm9kdWN0aW9uSW5saW5lUGFydHMpO1xuXG4gICAgICAgICAgcmV0dXJuIHJ1bGVXaXRoUHJldmlvdXNQcm9kdWN0aW9uSW5saW5lO1xuICAgICAgICB9KTtcblxuICByZXR1cm4gcnVsZXNXaXRoUHJldmlvdXNQcm9kdWN0aW9uSW5saW5lO1xufVxuXG4iXX0=