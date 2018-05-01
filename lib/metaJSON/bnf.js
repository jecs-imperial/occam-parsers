'use strict';

var bnf = '\n\n\n    document         ::= metaJSON | error+ ;\n\n    metaJSON         ::= "{" \n    \n                            "\\"dependencies\\"" ":" \n                            \n                            "[" \n                            \n                              dependencies? \n                              \n                            "]" \n                            \n                          "}" ;\n\n    dependencies     ::= dependency ( "," dependency )* ;\n\n    dependency       ::= [string] ;\n\n    error            ::= . ;\n\n\n';

module.exports = bnf;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9tZXRhSlNPTi9ibmYuanMiXSwibmFtZXMiOlsiYm5mIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsSUFBTUEsK2lCQUFOOztBQTBCQUMsT0FBT0MsT0FBUCxHQUFpQkYsR0FBakIiLCJmaWxlIjoiYm5mLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBibmYgPSBgXG5cblxuICAgIGRvY3VtZW50ICAgICAgICAgOjo9IG1ldGFKU09OIHwgZXJyb3IrIDtcblxuICAgIG1ldGFKU09OICAgICAgICAgOjo9IFwie1wiIFxuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxcXFwiZGVwZW5kZW5jaWVzXFxcXFwiXCIgXCI6XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJbXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXM/IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJdXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwifVwiIDtcblxuICAgIGRlcGVuZGVuY2llcyAgICAgOjo9IGRlcGVuZGVuY3kgKCBcIixcIiBkZXBlbmRlbmN5ICkqIDtcblxuICAgIGRlcGVuZGVuY3kgICAgICAgOjo9IFtzdHJpbmddIDtcblxuICAgIGVycm9yICAgICAgICAgICAgOjo9IC4gO1xuXG5cbmA7XG5cbm1vZHVsZS5leHBvcnRzID0gYm5mO1xuIl19