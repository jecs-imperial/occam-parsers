'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Graph = require('./graph'),
    arrayUtil = require('../util/array'),
    parserUtil = require('../util/parser'),
    Production = require('../common/production'),
    UnitRuleProduction = require('./production/unitRule'),
    UnitRulesProduction = require('./production/unitRules'),
    NonUnitRulesProduction = require('./production/nonUnitRules');

var cycles = function () {
  function cycles() {
    _classCallCheck(this, cycles);
  }

  _createClass(cycles, null, [{
    key: 'eliminate',
    value: function eliminate(productions) {
      var unitRulesProductions = unitRulesProductionsFromProductions(productions),
          graph = Graph.fromUnitRulesProductions(unitRulesProductions),
          components = graph.getComponents(),
          nonCyclicProductions = nonCyclicProductionsFromComponents(components, productions);

      productions = nonCyclicProductions; ///

      return productions;
    }
  }]);

  return cycles;
}();

module.exports = cycles;

function unitRulesProductionsFromProductions(productions) {
  var unitRulesProductions = productions.reduce(function (unitRulesProductions, production) {
    var unitRulesProduction = UnitRulesProduction.fromProduction(production);

    if (unitRulesProduction !== null) {
      unitRulesProductions.push(unitRulesProduction);
    }

    return unitRulesProductions;
  }, []);

  return unitRulesProductions;
}

function nonCyclicProductionsFromComponents(components, productions) {
  var nonCyclicProductions = components.reduce(function (nonCyclicProductions, component) {
    var componentNonCyclic = component.isNonCyclic();

    if (componentNonCyclic) {
      nonCyclicProductionFromComponent(component, productions, nonCyclicProductions);
    } else {
      nonCyclicProductionsFromComponent(component, productions, nonCyclicProductions);
    }

    return nonCyclicProductions;
  }, []);

  return nonCyclicProductions;
}

function nonCyclicProductionFromComponent(component, productions, nonCyclicProductions) {
  var firstVertex = component.getFirstVertex(),
      firstVertexName = firstVertex.getName(),
      nonCyclicProductionName = firstVertexName,
      ///
  nonCyclicProduction = parserUtil.findProduction(nonCyclicProductionName, productions);

  nonCyclicProductions.push(nonCyclicProduction);
}

function nonCyclicProductionsFromComponent(component, productions, nonCyclicProductions) {
  productions = productionsFromComponent(component, productions); ///

  var fixedProductions = fixedProductionsFromProductions(productions),
      unitRuleProductions = unitRuleProductionsFromProductions(productions),
      removedProductions = [],
      addedProductions = [];

  var unitRuleProductionsLength = unitRuleProductions.length;

  while (unitRuleProductionsLength > 0) {
    var unitRuleProduction = unitRuleProductions.shift(),
        unitRuleProductionName = unitRuleProduction.getName();

    var removedProduction = unitRuleProduction;

    removedProductions.push(removedProduction);

    var unitRuleProductionUnitRuleProductionName = unitRuleProduction.getUnitRuleProductionName(),
        fixedProductionName = unitRuleProductionUnitRuleProductionName,
        ///
    addedProductionName = unitRuleProductionName,
        ///
    fixedProduction = parserUtil.findProduction(fixedProductionName, fixedProductions);

    var addedProduction = parserUtil.findProduction(addedProductionName, addedProductions);

    if (addedProduction === null) {
      addedProduction = Production.fromProduction(fixedProduction);

      addedProduction.setName(addedProductionName);

      addedProductions.push(addedProduction);
    } else {
      var fixedProductionRules = fixedProduction.getRules();

      addedProduction.concatRules(fixedProductionRules);
    }

    var intermediateProductionName = unitRuleProductionUnitRuleProductionName,
        ///
    intermediateProduction = parserUtil.findProduction(intermediateProductionName, unitRuleProductions);

    if (intermediateProduction !== null) {
      var intermediateProductionUnitRuleProductionName = intermediateProduction.getUnitRuleProductionName(),
          _unitRuleProductionUnitRuleProductionName = intermediateProductionUnitRuleProductionName; ///

      if (unitRuleProductionName !== _unitRuleProductionUnitRuleProductionName) {
        unitRuleProduction = findUnitRuleProduction(unitRuleProductionName, _unitRuleProductionUnitRuleProductionName, removedProductions);

        if (unitRuleProduction === null) {
          unitRuleProduction = UnitRuleProduction.fromNameAndUnitRuleProductionName(unitRuleProductionName, _unitRuleProductionUnitRuleProductionName);

          unitRuleProductions.unshift(unitRuleProduction);
        }
      }
    }

    unitRuleProductionsLength = unitRuleProductions.length;
  }

  nonCyclicProductionsFromFixedAndAddedProductions(fixedProductions, addedProductions, nonCyclicProductions);
}

function nonCyclicProductionsFromFixedAndAddedProductions(fixedProductions, addedProductions, nonCyclicProductions) {
  fixedProductions.forEach(function (fixedProduction) {
    var nonCyclicProduction = fixedProduction,
        ///
    nonCyclicProductionName = nonCyclicProduction.getName(),
        addedProductionName = nonCyclicProductionName,
        ///
    addedProduction = parserUtil.findProduction(addedProductionName, addedProductions);

    if (addedProduction !== null) {
      var addedProductionRules = addedProduction.getRules();

      nonCyclicProduction.concatRules(addedProductionRules);
    }

    nonCyclicProductions.push(nonCyclicProduction);
  });
}

function productionsFromComponent(component, productions) {
  productions = component.mapVertices(function (vertex) {
    var vertexName = vertex.getName(),
        productionName = vertexName,
        ///
    production = parserUtil.findProduction(productionName, productions);

    return production;
  });

  return productions;
}

function unitRuleProductionsFromProductions(productions) {
  var unitRuleProductions = productions.reduce(function (unitRuleProductions, production) {
    var name = production.getName(),
        unitRulesProduction = UnitRulesProduction.fromProduction(production);

    unitRulesProduction.forEachUnitRule(function (unitRule) {
      var unitRuleProduction = UnitRuleProduction.fromNameAndUnitRule(name, unitRule);

      unitRuleProductions.push(unitRuleProduction);
    });

    return unitRuleProductions;
  }, []);

  return unitRuleProductions;
}

function fixedProductionsFromProductions(productions) {
  var fixedProductions = productions.map(function (production) {
    var nonUnitProduction = NonUnitRulesProduction.fromProduction(production),
        fixedProduction = nonUnitProduction; ///

    return fixedProduction;
  });

  return fixedProductions;
}

function findUnitRuleProduction(productionName, unitRuleProductionName, unitRuleProductions) {
  var firstProductionName = productionName,
      ///
  secondProductionName = unitRuleProductionName; ///

  var foundUnitRuleProduction = null;

  unitRuleProductions.some(function (unitRuleProduction) {
    var unitRuleProductionFound = unitRuleProduction.isFoundByProductionNames(firstProductionName, secondProductionName);

    if (unitRuleProductionFound) {
      foundUnitRuleProduction = unitRuleProduction;

      return true;
    }
  });

  var unitRuleProduction = foundUnitRuleProduction; ///

  return unitRuleProduction;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9ncmFtbWFyL2N5Y2xlcy5qcyJdLCJuYW1lcyI6WyJHcmFwaCIsInJlcXVpcmUiLCJhcnJheVV0aWwiLCJwYXJzZXJVdGlsIiwiUHJvZHVjdGlvbiIsIlVuaXRSdWxlUHJvZHVjdGlvbiIsIlVuaXRSdWxlc1Byb2R1Y3Rpb24iLCJOb25Vbml0UnVsZXNQcm9kdWN0aW9uIiwiY3ljbGVzIiwicHJvZHVjdGlvbnMiLCJ1bml0UnVsZXNQcm9kdWN0aW9ucyIsInVuaXRSdWxlc1Byb2R1Y3Rpb25zRnJvbVByb2R1Y3Rpb25zIiwiZ3JhcGgiLCJmcm9tVW5pdFJ1bGVzUHJvZHVjdGlvbnMiLCJjb21wb25lbnRzIiwiZ2V0Q29tcG9uZW50cyIsIm5vbkN5Y2xpY1Byb2R1Y3Rpb25zIiwibm9uQ3ljbGljUHJvZHVjdGlvbnNGcm9tQ29tcG9uZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZWR1Y2UiLCJwcm9kdWN0aW9uIiwidW5pdFJ1bGVzUHJvZHVjdGlvbiIsImZyb21Qcm9kdWN0aW9uIiwicHVzaCIsImNvbXBvbmVudCIsImNvbXBvbmVudE5vbkN5Y2xpYyIsImlzTm9uQ3ljbGljIiwibm9uQ3ljbGljUHJvZHVjdGlvbkZyb21Db21wb25lbnQiLCJub25DeWNsaWNQcm9kdWN0aW9uc0Zyb21Db21wb25lbnQiLCJmaXJzdFZlcnRleCIsImdldEZpcnN0VmVydGV4IiwiZmlyc3RWZXJ0ZXhOYW1lIiwiZ2V0TmFtZSIsIm5vbkN5Y2xpY1Byb2R1Y3Rpb25OYW1lIiwibm9uQ3ljbGljUHJvZHVjdGlvbiIsImZpbmRQcm9kdWN0aW9uIiwicHJvZHVjdGlvbnNGcm9tQ29tcG9uZW50IiwiZml4ZWRQcm9kdWN0aW9ucyIsImZpeGVkUHJvZHVjdGlvbnNGcm9tUHJvZHVjdGlvbnMiLCJ1bml0UnVsZVByb2R1Y3Rpb25zIiwidW5pdFJ1bGVQcm9kdWN0aW9uc0Zyb21Qcm9kdWN0aW9ucyIsInJlbW92ZWRQcm9kdWN0aW9ucyIsImFkZGVkUHJvZHVjdGlvbnMiLCJ1bml0UnVsZVByb2R1Y3Rpb25zTGVuZ3RoIiwibGVuZ3RoIiwidW5pdFJ1bGVQcm9kdWN0aW9uIiwic2hpZnQiLCJ1bml0UnVsZVByb2R1Y3Rpb25OYW1lIiwicmVtb3ZlZFByb2R1Y3Rpb24iLCJ1bml0UnVsZVByb2R1Y3Rpb25Vbml0UnVsZVByb2R1Y3Rpb25OYW1lIiwiZ2V0VW5pdFJ1bGVQcm9kdWN0aW9uTmFtZSIsImZpeGVkUHJvZHVjdGlvbk5hbWUiLCJhZGRlZFByb2R1Y3Rpb25OYW1lIiwiZml4ZWRQcm9kdWN0aW9uIiwiYWRkZWRQcm9kdWN0aW9uIiwic2V0TmFtZSIsImZpeGVkUHJvZHVjdGlvblJ1bGVzIiwiZ2V0UnVsZXMiLCJjb25jYXRSdWxlcyIsImludGVybWVkaWF0ZVByb2R1Y3Rpb25OYW1lIiwiaW50ZXJtZWRpYXRlUHJvZHVjdGlvbiIsImludGVybWVkaWF0ZVByb2R1Y3Rpb25Vbml0UnVsZVByb2R1Y3Rpb25OYW1lIiwiZmluZFVuaXRSdWxlUHJvZHVjdGlvbiIsImZyb21OYW1lQW5kVW5pdFJ1bGVQcm9kdWN0aW9uTmFtZSIsInVuc2hpZnQiLCJub25DeWNsaWNQcm9kdWN0aW9uc0Zyb21GaXhlZEFuZEFkZGVkUHJvZHVjdGlvbnMiLCJmb3JFYWNoIiwiYWRkZWRQcm9kdWN0aW9uUnVsZXMiLCJtYXBWZXJ0aWNlcyIsInZlcnRleCIsInZlcnRleE5hbWUiLCJwcm9kdWN0aW9uTmFtZSIsIm5hbWUiLCJmb3JFYWNoVW5pdFJ1bGUiLCJ1bml0UnVsZSIsImZyb21OYW1lQW5kVW5pdFJ1bGUiLCJtYXAiLCJub25Vbml0UHJvZHVjdGlvbiIsImZpcnN0UHJvZHVjdGlvbk5hbWUiLCJzZWNvbmRQcm9kdWN0aW9uTmFtZSIsImZvdW5kVW5pdFJ1bGVQcm9kdWN0aW9uIiwic29tZSIsInVuaXRSdWxlUHJvZHVjdGlvbkZvdW5kIiwiaXNGb3VuZEJ5UHJvZHVjdGlvbk5hbWVzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxTQUFSLENB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QUF1QmhDLHNCQUQ3QixDQUQyRixDQUVyQzs7QUFFdEQsTUFBSWlDLDBCQUEwQixJQUE5Qjs7QUFFQXpDLHNCQUFvQjBDLElBQXBCLENBQXlCLFVBQVNwQyxrQkFBVCxFQUE2QjtBQUNwRCxRQUFNcUMsMEJBQTBCckMsbUJBQW1Cc0Msd0JBQW5CLENBQTRDTCxtQkFBNUMsRUFBaUVDLG9CQUFqRSxDQUFoQzs7QUFFQSxRQUFJRyx1QkFBSixFQUE2QjtBQUMzQkYsZ0NBQTBCbkMsa0JBQTFCOztBQUVBLGFBQU8sSUFBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxNQUFNQSxxQkFBcUJtQyx1QkFBM0IsQ0FoQjJGLENBZ0J2Qzs7QUFFcEQsU0FBT25DLGtCQUFQO0FBQ0QiLCJmaWxlIjoiY3ljbGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBHcmFwaCA9IHJlcXVpcmUoJy4vZ3JhcGgnKSxcbiAgICAgIGFycmF5VXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwvYXJyYXknKSxcbiAgICAgIHBhcnNlclV0aWwgPSByZXF1aXJlKCcuLi91dGlsL3BhcnNlcicpLFxuICAgICAgUHJvZHVjdGlvbiA9IHJlcXVpcmUoJy4uL2NvbW1vbi9wcm9kdWN0aW9uJyksXG4gICAgICBVbml0UnVsZVByb2R1Y3Rpb24gPSByZXF1aXJlKCcuL3Byb2R1Y3Rpb24vdW5pdFJ1bGUnKSxcbiAgICAgIFVuaXRSdWxlc1Byb2R1Y3Rpb24gPSByZXF1aXJlKCcuL3Byb2R1Y3Rpb24vdW5pdFJ1bGVzJyksXG4gICAgICBOb25Vbml0UnVsZXNQcm9kdWN0aW9uID0gcmVxdWlyZSgnLi9wcm9kdWN0aW9uL25vblVuaXRSdWxlcycpO1xuXG5jbGFzcyBjeWNsZXMge1xuICBzdGF0aWMgZWxpbWluYXRlKHByb2R1Y3Rpb25zKSB7XG4gICAgY29uc3QgdW5pdFJ1bGVzUHJvZHVjdGlvbnMgPSB1bml0UnVsZXNQcm9kdWN0aW9uc0Zyb21Qcm9kdWN0aW9ucyhwcm9kdWN0aW9ucyksXG4gICAgICAgICAgZ3JhcGggPSBHcmFwaC5mcm9tVW5pdFJ1bGVzUHJvZHVjdGlvbnModW5pdFJ1bGVzUHJvZHVjdGlvbnMpLFxuICAgICAgICAgIGNvbXBvbmVudHMgPSBncmFwaC5nZXRDb21wb25lbnRzKCksXG4gICAgICAgICAgbm9uQ3ljbGljUHJvZHVjdGlvbnMgPSBub25DeWNsaWNQcm9kdWN0aW9uc0Zyb21Db21wb25lbnRzKGNvbXBvbmVudHMsIHByb2R1Y3Rpb25zKTtcblxuICAgIHByb2R1Y3Rpb25zID0gbm9uQ3ljbGljUHJvZHVjdGlvbnM7IC8vL1xuXG4gICAgcmV0dXJuIHByb2R1Y3Rpb25zO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3ljbGVzO1xuXG5mdW5jdGlvbiB1bml0UnVsZXNQcm9kdWN0aW9uc0Zyb21Qcm9kdWN0aW9ucyhwcm9kdWN0aW9ucykge1xuICBjb25zdCB1bml0UnVsZXNQcm9kdWN0aW9ucyA9IHByb2R1Y3Rpb25zLnJlZHVjZShmdW5jdGlvbih1bml0UnVsZXNQcm9kdWN0aW9ucywgcHJvZHVjdGlvbikge1xuICAgIGNvbnN0IHVuaXRSdWxlc1Byb2R1Y3Rpb24gPSBVbml0UnVsZXNQcm9kdWN0aW9uLmZyb21Qcm9kdWN0aW9uKHByb2R1Y3Rpb24pO1xuXG4gICAgaWYgKHVuaXRSdWxlc1Byb2R1Y3Rpb24gIT09IG51bGwpIHtcbiAgICAgIHVuaXRSdWxlc1Byb2R1Y3Rpb25zLnB1c2godW5pdFJ1bGVzUHJvZHVjdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuaXRSdWxlc1Byb2R1Y3Rpb25zO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHVuaXRSdWxlc1Byb2R1Y3Rpb25zO1xufVxuXG5mdW5jdGlvbiBub25DeWNsaWNQcm9kdWN0aW9uc0Zyb21Db21wb25lbnRzKGNvbXBvbmVudHMsIHByb2R1Y3Rpb25zKSB7XG4gIGNvbnN0IG5vbkN5Y2xpY1Byb2R1Y3Rpb25zID0gY29tcG9uZW50cy5yZWR1Y2UoZnVuY3Rpb24obm9uQ3ljbGljUHJvZHVjdGlvbnMsIGNvbXBvbmVudCkge1xuICAgICAgICAgIGNvbnN0IGNvbXBvbmVudE5vbkN5Y2xpYyA9IGNvbXBvbmVudC5pc05vbkN5Y2xpYygpO1xuXG4gICAgICAgICAgaWYgKGNvbXBvbmVudE5vbkN5Y2xpYykge1xuICAgICAgICAgICAgbm9uQ3ljbGljUHJvZHVjdGlvbkZyb21Db21wb25lbnQoY29tcG9uZW50LCBwcm9kdWN0aW9ucywgbm9uQ3ljbGljUHJvZHVjdGlvbnMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub25DeWNsaWNQcm9kdWN0aW9uc0Zyb21Db21wb25lbnQoY29tcG9uZW50LCBwcm9kdWN0aW9ucywgbm9uQ3ljbGljUHJvZHVjdGlvbnMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBub25DeWNsaWNQcm9kdWN0aW9ucztcbiAgICAgICAgfSwgW10pO1xuXG4gIHJldHVybiBub25DeWNsaWNQcm9kdWN0aW9ucztcbn1cblxuZnVuY3Rpb24gbm9uQ3ljbGljUHJvZHVjdGlvbkZyb21Db21wb25lbnQoY29tcG9uZW50LCBwcm9kdWN0aW9ucywgbm9uQ3ljbGljUHJvZHVjdGlvbnMpIHtcbiAgY29uc3QgZmlyc3RWZXJ0ZXggPSBjb21wb25lbnQuZ2V0Rmlyc3RWZXJ0ZXgoKSxcbiAgICAgICAgZmlyc3RWZXJ0ZXhOYW1lID0gZmlyc3RWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICBub25DeWNsaWNQcm9kdWN0aW9uTmFtZSA9IGZpcnN0VmVydGV4TmFtZSwgIC8vL1xuICAgICAgICBub25DeWNsaWNQcm9kdWN0aW9uID0gcGFyc2VyVXRpbC5maW5kUHJvZHVjdGlvbihub25DeWNsaWNQcm9kdWN0aW9uTmFtZSwgcHJvZHVjdGlvbnMpO1xuXG4gIG5vbkN5Y2xpY1Byb2R1Y3Rpb25zLnB1c2gobm9uQ3ljbGljUHJvZHVjdGlvbik7XG59XG5cbmZ1bmN0aW9uIG5vbkN5Y2xpY1Byb2R1Y3Rpb25zRnJvbUNvbXBvbmVudChjb21wb25lbnQsIHByb2R1Y3Rpb25zLCBub25DeWNsaWNQcm9kdWN0aW9ucykge1xuICBwcm9kdWN0aW9ucyA9IHByb2R1Y3Rpb25zRnJvbUNvbXBvbmVudChjb21wb25lbnQsIHByb2R1Y3Rpb25zKTsgLy8vXG5cbiAgY29uc3QgZml4ZWRQcm9kdWN0aW9ucyA9IGZpeGVkUHJvZHVjdGlvbnNGcm9tUHJvZHVjdGlvbnMocHJvZHVjdGlvbnMpLFxuICAgICAgICB1bml0UnVsZVByb2R1Y3Rpb25zID0gdW5pdFJ1bGVQcm9kdWN0aW9uc0Zyb21Qcm9kdWN0aW9ucyhwcm9kdWN0aW9ucyksXG4gICAgICAgIHJlbW92ZWRQcm9kdWN0aW9ucyA9IFtdLFxuICAgICAgICBhZGRlZFByb2R1Y3Rpb25zID0gW107XG5cbiAgbGV0IHVuaXRSdWxlUHJvZHVjdGlvbnNMZW5ndGggPSB1bml0UnVsZVByb2R1Y3Rpb25zLmxlbmd0aDtcblxuICB3aGlsZSAodW5pdFJ1bGVQcm9kdWN0aW9uc0xlbmd0aCA+IDApIHtcbiAgICBsZXQgdW5pdFJ1bGVQcm9kdWN0aW9uID0gdW5pdFJ1bGVQcm9kdWN0aW9ucy5zaGlmdCgpLFxuICAgICAgICB1bml0UnVsZVByb2R1Y3Rpb25OYW1lID0gdW5pdFJ1bGVQcm9kdWN0aW9uLmdldE5hbWUoKTtcblxuICAgIGNvbnN0IHJlbW92ZWRQcm9kdWN0aW9uID0gdW5pdFJ1bGVQcm9kdWN0aW9uO1xuXG4gICAgcmVtb3ZlZFByb2R1Y3Rpb25zLnB1c2gocmVtb3ZlZFByb2R1Y3Rpb24pO1xuXG4gICAgY29uc3QgdW5pdFJ1bGVQcm9kdWN0aW9uVW5pdFJ1bGVQcm9kdWN0aW9uTmFtZSA9IHVuaXRSdWxlUHJvZHVjdGlvbi5nZXRVbml0UnVsZVByb2R1Y3Rpb25OYW1lKCksXG4gICAgICAgICAgZml4ZWRQcm9kdWN0aW9uTmFtZSA9IHVuaXRSdWxlUHJvZHVjdGlvblVuaXRSdWxlUHJvZHVjdGlvbk5hbWUsICAvLy9cbiAgICAgICAgICBhZGRlZFByb2R1Y3Rpb25OYW1lID0gdW5pdFJ1bGVQcm9kdWN0aW9uTmFtZSwgIC8vL1xuICAgICAgICAgIGZpeGVkUHJvZHVjdGlvbiA9IHBhcnNlclV0aWwuZmluZFByb2R1Y3Rpb24oZml4ZWRQcm9kdWN0aW9uTmFtZSwgZml4ZWRQcm9kdWN0aW9ucyk7XG5cbiAgICBsZXQgYWRkZWRQcm9kdWN0aW9uID0gcGFyc2VyVXRpbC5maW5kUHJvZHVjdGlvbihhZGRlZFByb2R1Y3Rpb25OYW1lLCBhZGRlZFByb2R1Y3Rpb25zKTtcblxuICAgIGlmIChhZGRlZFByb2R1Y3Rpb24gPT09IG51bGwpIHtcbiAgICAgIGFkZGVkUHJvZHVjdGlvbiA9IFByb2R1Y3Rpb24uZnJvbVByb2R1Y3Rpb24oZml4ZWRQcm9kdWN0aW9uKTtcblxuICAgICAgYWRkZWRQcm9kdWN0aW9uLnNldE5hbWUoYWRkZWRQcm9kdWN0aW9uTmFtZSk7XG5cbiAgICAgIGFkZGVkUHJvZHVjdGlvbnMucHVzaChhZGRlZFByb2R1Y3Rpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaXhlZFByb2R1Y3Rpb25SdWxlcyA9IGZpeGVkUHJvZHVjdGlvbi5nZXRSdWxlcygpO1xuXG4gICAgICBhZGRlZFByb2R1Y3Rpb24uY29uY2F0UnVsZXMoZml4ZWRQcm9kdWN0aW9uUnVsZXMpO1xuICAgIH1cblxuICAgIGNvbnN0IGludGVybWVkaWF0ZVByb2R1Y3Rpb25OYW1lID0gdW5pdFJ1bGVQcm9kdWN0aW9uVW5pdFJ1bGVQcm9kdWN0aW9uTmFtZSwgLy8vXG4gICAgICAgICAgaW50ZXJtZWRpYXRlUHJvZHVjdGlvbiA9IHBhcnNlclV0aWwuZmluZFByb2R1Y3Rpb24oaW50ZXJtZWRpYXRlUHJvZHVjdGlvbk5hbWUsIHVuaXRSdWxlUHJvZHVjdGlvbnMpO1xuXG4gICAgaWYgKGludGVybWVkaWF0ZVByb2R1Y3Rpb24gIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGludGVybWVkaWF0ZVByb2R1Y3Rpb25Vbml0UnVsZVByb2R1Y3Rpb25OYW1lID0gaW50ZXJtZWRpYXRlUHJvZHVjdGlvbi5nZXRVbml0UnVsZVByb2R1Y3Rpb25OYW1lKCksXG4gICAgICAgICAgICB1bml0UnVsZVByb2R1Y3Rpb25Vbml0UnVsZVByb2R1Y3Rpb25OYW1lID0gaW50ZXJtZWRpYXRlUHJvZHVjdGlvblVuaXRSdWxlUHJvZHVjdGlvbk5hbWU7ICAvLy9cblxuICAgICAgaWYgKHVuaXRSdWxlUHJvZHVjdGlvbk5hbWUgIT09IHVuaXRSdWxlUHJvZHVjdGlvblVuaXRSdWxlUHJvZHVjdGlvbk5hbWUpIHtcbiAgICAgICAgdW5pdFJ1bGVQcm9kdWN0aW9uID0gZmluZFVuaXRSdWxlUHJvZHVjdGlvbih1bml0UnVsZVByb2R1Y3Rpb25OYW1lLCB1bml0UnVsZVByb2R1Y3Rpb25Vbml0UnVsZVByb2R1Y3Rpb25OYW1lLCByZW1vdmVkUHJvZHVjdGlvbnMpO1xuXG4gICAgICAgIGlmICh1bml0UnVsZVByb2R1Y3Rpb24gPT09IG51bGwpIHtcbiAgICAgICAgICB1bml0UnVsZVByb2R1Y3Rpb24gPSBVbml0UnVsZVByb2R1Y3Rpb24uZnJvbU5hbWVBbmRVbml0UnVsZVByb2R1Y3Rpb25OYW1lKHVuaXRSdWxlUHJvZHVjdGlvbk5hbWUsIHVuaXRSdWxlUHJvZHVjdGlvblVuaXRSdWxlUHJvZHVjdGlvbk5hbWUpO1xuXG4gICAgICAgICAgdW5pdFJ1bGVQcm9kdWN0aW9ucy51bnNoaWZ0KHVuaXRSdWxlUHJvZHVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB1bml0UnVsZVByb2R1Y3Rpb25zTGVuZ3RoID0gdW5pdFJ1bGVQcm9kdWN0aW9ucy5sZW5ndGg7XG4gIH1cblxuICBub25DeWNsaWNQcm9kdWN0aW9uc0Zyb21GaXhlZEFuZEFkZGVkUHJvZHVjdGlvbnMoZml4ZWRQcm9kdWN0aW9ucywgYWRkZWRQcm9kdWN0aW9ucywgbm9uQ3ljbGljUHJvZHVjdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBub25DeWNsaWNQcm9kdWN0aW9uc0Zyb21GaXhlZEFuZEFkZGVkUHJvZHVjdGlvbnMoZml4ZWRQcm9kdWN0aW9ucywgYWRkZWRQcm9kdWN0aW9ucywgbm9uQ3ljbGljUHJvZHVjdGlvbnMpIHtcbiAgZml4ZWRQcm9kdWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGZpeGVkUHJvZHVjdGlvbikge1xuICAgIGNvbnN0IG5vbkN5Y2xpY1Byb2R1Y3Rpb24gPSBmaXhlZFByb2R1Y3Rpb24sIC8vL1xuICAgICAgICAgIG5vbkN5Y2xpY1Byb2R1Y3Rpb25OYW1lID0gbm9uQ3ljbGljUHJvZHVjdGlvbi5nZXROYW1lKCksXG4gICAgICAgICAgYWRkZWRQcm9kdWN0aW9uTmFtZSA9IG5vbkN5Y2xpY1Byb2R1Y3Rpb25OYW1lLCAvLy9cbiAgICAgICAgICBhZGRlZFByb2R1Y3Rpb24gPSBwYXJzZXJVdGlsLmZpbmRQcm9kdWN0aW9uKGFkZGVkUHJvZHVjdGlvbk5hbWUsIGFkZGVkUHJvZHVjdGlvbnMpO1xuXG4gICAgaWYgKGFkZGVkUHJvZHVjdGlvbiAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgYWRkZWRQcm9kdWN0aW9uUnVsZXMgPSBhZGRlZFByb2R1Y3Rpb24uZ2V0UnVsZXMoKTtcblxuICAgICAgbm9uQ3ljbGljUHJvZHVjdGlvbi5jb25jYXRSdWxlcyhhZGRlZFByb2R1Y3Rpb25SdWxlcyk7XG4gICAgfVxuXG4gICAgbm9uQ3ljbGljUHJvZHVjdGlvbnMucHVzaChub25DeWNsaWNQcm9kdWN0aW9uKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHByb2R1Y3Rpb25zRnJvbUNvbXBvbmVudChjb21wb25lbnQsIHByb2R1Y3Rpb25zKSB7XG4gIHByb2R1Y3Rpb25zID0gY29tcG9uZW50Lm1hcFZlcnRpY2VzKGZ1bmN0aW9uKHZlcnRleCkge1xuICAgIGNvbnN0IHZlcnRleE5hbWUgPSB2ZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgIHByb2R1Y3Rpb25OYW1lID0gdmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgIHByb2R1Y3Rpb24gPSBwYXJzZXJVdGlsLmZpbmRQcm9kdWN0aW9uKHByb2R1Y3Rpb25OYW1lLCBwcm9kdWN0aW9ucyk7XG5cbiAgICByZXR1cm4gcHJvZHVjdGlvbjtcbiAgfSk7XG5cbiAgcmV0dXJuIHByb2R1Y3Rpb25zO1xufVxuXG5mdW5jdGlvbiB1bml0UnVsZVByb2R1Y3Rpb25zRnJvbVByb2R1Y3Rpb25zKHByb2R1Y3Rpb25zKSB7XG4gIGNvbnN0IHVuaXRSdWxlUHJvZHVjdGlvbnMgPSBwcm9kdWN0aW9ucy5yZWR1Y2UoZnVuY3Rpb24odW5pdFJ1bGVQcm9kdWN0aW9ucywgcHJvZHVjdGlvbikge1xuICAgIGNvbnN0IG5hbWUgPSBwcm9kdWN0aW9uLmdldE5hbWUoKSxcbiAgICAgICAgICB1bml0UnVsZXNQcm9kdWN0aW9uID0gVW5pdFJ1bGVzUHJvZHVjdGlvbi5mcm9tUHJvZHVjdGlvbihwcm9kdWN0aW9uKTtcblxuICAgIHVuaXRSdWxlc1Byb2R1Y3Rpb24uZm9yRWFjaFVuaXRSdWxlKGZ1bmN0aW9uKHVuaXRSdWxlKSB7XG4gICAgICBjb25zdCB1bml0UnVsZVByb2R1Y3Rpb24gPSBVbml0UnVsZVByb2R1Y3Rpb24uZnJvbU5hbWVBbmRVbml0UnVsZShuYW1lLCB1bml0UnVsZSk7XG5cbiAgICAgIHVuaXRSdWxlUHJvZHVjdGlvbnMucHVzaCh1bml0UnVsZVByb2R1Y3Rpb24pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHVuaXRSdWxlUHJvZHVjdGlvbnM7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gdW5pdFJ1bGVQcm9kdWN0aW9ucztcbn1cblxuZnVuY3Rpb24gZml4ZWRQcm9kdWN0aW9uc0Zyb21Qcm9kdWN0aW9ucyhwcm9kdWN0aW9ucykge1xuICBjb25zdCBmaXhlZFByb2R1Y3Rpb25zID0gcHJvZHVjdGlvbnMubWFwKGZ1bmN0aW9uKHByb2R1Y3Rpb24pIHtcbiAgICBjb25zdCBub25Vbml0UHJvZHVjdGlvbiA9IE5vblVuaXRSdWxlc1Byb2R1Y3Rpb24uZnJvbVByb2R1Y3Rpb24ocHJvZHVjdGlvbiksXG4gICAgICAgICAgZml4ZWRQcm9kdWN0aW9uID0gbm9uVW5pdFByb2R1Y3Rpb247IC8vL1xuICAgIFxuICAgIHJldHVybiBmaXhlZFByb2R1Y3Rpb247XG4gIH0pO1xuICBcbiAgcmV0dXJuIGZpeGVkUHJvZHVjdGlvbnM7XG59XG5cbmZ1bmN0aW9uIGZpbmRVbml0UnVsZVByb2R1Y3Rpb24ocHJvZHVjdGlvbk5hbWUsIHVuaXRSdWxlUHJvZHVjdGlvbk5hbWUsIHVuaXRSdWxlUHJvZHVjdGlvbnMpIHtcbiAgY29uc3QgZmlyc3RQcm9kdWN0aW9uTmFtZSA9IHByb2R1Y3Rpb25OYW1lLCAvLy9cbiAgICAgICAgc2Vjb25kUHJvZHVjdGlvbk5hbWUgPSB1bml0UnVsZVByb2R1Y3Rpb25OYW1lOyAgLy8vXG5cbiAgbGV0IGZvdW5kVW5pdFJ1bGVQcm9kdWN0aW9uID0gbnVsbDtcblxuICB1bml0UnVsZVByb2R1Y3Rpb25zLnNvbWUoZnVuY3Rpb24odW5pdFJ1bGVQcm9kdWN0aW9uKSB7XG4gICAgY29uc3QgdW5pdFJ1bGVQcm9kdWN0aW9uRm91bmQgPSB1bml0UnVsZVByb2R1Y3Rpb24uaXNGb3VuZEJ5UHJvZHVjdGlvbk5hbWVzKGZpcnN0UHJvZHVjdGlvbk5hbWUsIHNlY29uZFByb2R1Y3Rpb25OYW1lKTtcblxuICAgIGlmICh1bml0UnVsZVByb2R1Y3Rpb25Gb3VuZCkge1xuICAgICAgZm91bmRVbml0UnVsZVByb2R1Y3Rpb24gPSB1bml0UnVsZVByb2R1Y3Rpb247XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgdW5pdFJ1bGVQcm9kdWN0aW9uID0gZm91bmRVbml0UnVsZVByb2R1Y3Rpb247IC8vL1xuXG4gIHJldHVybiB1bml0UnVsZVByb2R1Y3Rpb247XG59Il19