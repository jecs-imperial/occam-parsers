'use strict';

var EpsilonPart = require('./part/epsilon'),
    OptionalPartPart = require('./part/optionalPart'),
    GroupOfPartsPart = require('./part/groupOfParts'),
    TerminalSymbolPart = require('./part/terminalSymbol'),
    ProductionNamePart = require('./part/productionName'),
    OneOrMorePartsPart = require('./part/oneOrMoreParts'),
    SequenceOfPartsPart = require('./part/sequenceOfParts'),
    ZeroOrMorePartsPart = require('./part/zeroOrMoreParts'),
    RegularExpressionPart = require('./part/regularExpression'),
    SignificantTokenTypePart = require('./part/significantTokenType');

var Parts = {
  'EpsilonPart': EpsilonPart,
  'OptionalPartPart': OptionalPartPart,
  'GroupOfPartsPart': GroupOfPartsPart,
  'TerminalSymbolPart': TerminalSymbolPart,
  'ProductionNamePart': ProductionNamePart,
  'OneOrMorePartsPart': OneOrMorePartsPart,
  'SequenceOfPartsPart': SequenceOfPartsPart,
  'ZeroOrMorePartsPart': ZeroOrMorePartsPart,
  'RegularExpressionPart': RegularExpressionPart,
  'SignificantTokenTypePart': SignificantTokenTypePart
};

module.exports = Parts;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9ibmYvcGFydHMuanMiXSwibmFtZXMiOlsiRXBzaWxvblBhcnQiLCJyZXF1aXJlIiwiT3B0aW9uYWxQYXJ0UGFydCIsIkdyb3VwT2ZQYXJ0c1BhcnQiLCJUZXJtaW5hbFN5bWJvbFBhcnQiLCJQcm9kdWN0aW9uTmFtZVBhcnQiLCJPbmVPck1vcmVQYXJ0c1BhcnQiLCJTZXF1ZW5jZU9mUGFydHNQYXJ0IiwiWmVyb09yTW9yZVBhcnRzUGFydCIsIlJlZ3VsYXJFeHByZXNzaW9uUGFydCIsIlNpZ25pZmljYW50VG9rZW5UeXBlUGFydCIsIlBhcnRzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsSUFBTUEsY0FBY0MsUUFBUSxnQkFBUixDQUFwQjtBQUFBLElBQ01DLG1CQUFtQkQsUUFBUSxxQkFBUixDQUR6QjtBQUFBLElBRU1FLG1CQUFtQkYsUUFBUSxxQkFBUixDQUZ6QjtBQUFBLElBR01HLHFCQUFxQkgsUUFBUSx1QkFBUixDQUgzQjtBQUFBLElBSU1JLHFCQUFxQkosUUFBUSx1QkFBUixDQUozQjtBQUFBLElBS01LLHFCQUFxQkwsUUFBUSx1QkFBUixDQUwzQjtBQUFBLElBTU1NLHNCQUFzQk4sUUFBUSx3QkFBUixDQU41QjtBQUFBLElBT01PLHNCQUFzQlAsUUFBUSx3QkFBUixDQVA1QjtBQUFBLElBUU1RLHdCQUF3QlIsUUFBUSwwQkFBUixDQVI5QjtBQUFBLElBU01TLDJCQUEyQlQsUUFBUSw2QkFBUixDQVRqQzs7QUFXQSxJQUFNVSxRQUFRO0FBQ1osaUJBQWdCWCxXQURKO0FBRVosc0JBQXFCRSxnQkFGVDtBQUdaLHNCQUFxQkMsZ0JBSFQ7QUFJWix3QkFBdUJDLGtCQUpYO0FBS1osd0JBQXVCQyxrQkFMWDtBQU1aLHdCQUF1QkMsa0JBTlg7QUFPWix5QkFBd0JDLG1CQVBaO0FBUVoseUJBQXdCQyxtQkFSWjtBQVNaLDJCQUEwQkMscUJBVGQ7QUFVWiw4QkFBNkJDO0FBVmpCLENBQWQ7O0FBYUFFLE9BQU9DLE9BQVAsR0FBaUJGLEtBQWpCIiwiZmlsZSI6InBhcnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFcHNpbG9uUGFydCA9IHJlcXVpcmUoJy4vcGFydC9lcHNpbG9uJyksXG4gICAgICBPcHRpb25hbFBhcnRQYXJ0ID0gcmVxdWlyZSgnLi9wYXJ0L29wdGlvbmFsUGFydCcpLFxuICAgICAgR3JvdXBPZlBhcnRzUGFydCA9IHJlcXVpcmUoJy4vcGFydC9ncm91cE9mUGFydHMnKSxcbiAgICAgIFRlcm1pbmFsU3ltYm9sUGFydCA9IHJlcXVpcmUoJy4vcGFydC90ZXJtaW5hbFN5bWJvbCcpLFxuICAgICAgUHJvZHVjdGlvbk5hbWVQYXJ0ID0gcmVxdWlyZSgnLi9wYXJ0L3Byb2R1Y3Rpb25OYW1lJyksXG4gICAgICBPbmVPck1vcmVQYXJ0c1BhcnQgPSByZXF1aXJlKCcuL3BhcnQvb25lT3JNb3JlUGFydHMnKSxcbiAgICAgIFNlcXVlbmNlT2ZQYXJ0c1BhcnQgPSByZXF1aXJlKCcuL3BhcnQvc2VxdWVuY2VPZlBhcnRzJyksXG4gICAgICBaZXJvT3JNb3JlUGFydHNQYXJ0ID0gcmVxdWlyZSgnLi9wYXJ0L3plcm9Pck1vcmVQYXJ0cycpLFxuICAgICAgUmVndWxhckV4cHJlc3Npb25QYXJ0ID0gcmVxdWlyZSgnLi9wYXJ0L3JlZ3VsYXJFeHByZXNzaW9uJyksXG4gICAgICBTaWduaWZpY2FudFRva2VuVHlwZVBhcnQgPSByZXF1aXJlKCcuL3BhcnQvc2lnbmlmaWNhbnRUb2tlblR5cGUnKTtcblxuY29uc3QgUGFydHMgPSB7XG4gICdFcHNpbG9uUGFydCcgOiBFcHNpbG9uUGFydCxcbiAgJ09wdGlvbmFsUGFydFBhcnQnIDogT3B0aW9uYWxQYXJ0UGFydCxcbiAgJ0dyb3VwT2ZQYXJ0c1BhcnQnIDogR3JvdXBPZlBhcnRzUGFydCxcbiAgJ1Rlcm1pbmFsU3ltYm9sUGFydCcgOiBUZXJtaW5hbFN5bWJvbFBhcnQsXG4gICdQcm9kdWN0aW9uTmFtZVBhcnQnIDogUHJvZHVjdGlvbk5hbWVQYXJ0LFxuICAnT25lT3JNb3JlUGFydHNQYXJ0JyA6IE9uZU9yTW9yZVBhcnRzUGFydCxcbiAgJ1NlcXVlbmNlT2ZQYXJ0c1BhcnQnIDogU2VxdWVuY2VPZlBhcnRzUGFydCxcbiAgJ1plcm9Pck1vcmVQYXJ0c1BhcnQnIDogWmVyb09yTW9yZVBhcnRzUGFydCxcbiAgJ1JlZ3VsYXJFeHByZXNzaW9uUGFydCcgOiBSZWd1bGFyRXhwcmVzc2lvblBhcnQsXG4gICdTaWduaWZpY2FudFRva2VuVHlwZVBhcnQnIDogU2lnbmlmaWNhbnRUb2tlblR5cGVQYXJ0XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnRzO1xuIl19