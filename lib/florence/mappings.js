'use strict';

var TransparentNode = require('../common/node/nonTerminal/transparent'),
    DiscardSecondChildNode = require('../common/node/nonTerminal/discardSecondChild'),
    TransparentThenKeepSecondNode = require('../common/node/nonTerminal/transparentThenKeepSecond');

var mappings = {

  'name': TransparentNode,
  'part': TransparentNode,
  'statement': TransparentNode,
  'subDerivation': TransparentNode,
  'proofDerivation': TransparentNode,
  'parenthesisedType': TransparentNode,
  'abridgedProofDerivation': TransparentNode,

  'typeName': TransparentNode,
  'labelName': TransparentNode,
  'variableName': TransparentNode,
  'referenceName': TransparentNode,
  'constructorName': TransparentNode,
  'metavariableName': TransparentNode,

  'premise(s)': TransparentNode,
  'type(s)Declaration': TransparentNode,
  '(typed)Variable(s)Declaration': TransparentNode,
  'typedConstructor(s)Declaration': TransparentNode,
  '(qualified)Metavariable(s)Declaration': TransparentNode,

  '(typed)Variable': TransparentNode,
  '(qualified)Metavariable': TransparentNode,
  '(abridged)ProofDerivation': TransparentNode,

  'byOrFrom': TransparentNode,
  'typeOrTerm': TransparentNode,
  'unjustifiedStatementOrUnknown': TransparentNode,
  '(un)justifiedStatementOrUnknown': TransparentNode,
  'specialUnassignedOrMinorKeywords': TransparentNode,

  'commaThenTerm': TransparentThenKeepSecondNode,
  'commaThenType': TransparentThenKeepSecondNode,
  'commaThenLabel': TransparentThenKeepSecondNode,
  'commaThenMetavariable': TransparentThenKeepSecondNode,
  'commaThen(typed)Variable': TransparentThenKeepSecondNode,
  'commaThenTypedConstructor': TransparentThenKeepSecondNode,
  'commaThen(qualified)Metavariable': TransparentThenKeepSecondNode,

  'parenthesisedTermList': TransparentThenKeepSecondNode,
  'parenthesisedTypeList': TransparentThenKeepSecondNode,
  'parenthesisedLabelList': TransparentThenKeepSecondNode,

  'conclusion': DiscardSecondChildNode,
  'typedVariable': DiscardSecondChildNode,
  'typedConstructor': DiscardSecondChildNode

};

module.exports = mappings;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9mbG9yZW5jZS9tYXBwaW5ncy5qcyJdLCJuYW1lcyI6WyJUcmFuc3BhcmVudE5vZGUiLCJyZXF1aXJlIiwiRGlzY2FyZFNlY29uZENoaWxkTm9kZSIsIlRyYW5zcGFyZW50VGhlbktlZXBTZWNvbmROb2RlIiwibWFwcGluZ3MiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxJQUFNQSxrQkFBa0JDLFFBQVEsd0NBQVIsQ0FBeEI7QUFBQSxJQUNNQyx5QkFBeUJELFFBQVEsK0NBQVIsQ0FEL0I7QUFBQSxJQUVNRSxnQ0FBZ0NGLFFBQVEsc0RBQVIsQ0FGdEM7O0FBSUEsSUFBTUcsV0FBVzs7QUFFZixVQUFRSixlQUZPO0FBR2YsVUFBUUEsZUFITztBQUlmLGVBQWFBLGVBSkU7QUFLZixtQkFBaUJBLGVBTEY7QUFNZixxQkFBbUJBLGVBTko7QUFPZix1QkFBcUJBLGVBUE47QUFRZiw2QkFBMkJBLGVBUlo7O0FBVWYsY0FBWUEsZUFWRztBQVdmLGVBQWFBLGVBWEU7QUFZZixrQkFBZ0JBLGVBWkQ7QUFhZixtQkFBaUJBLGVBYkY7QUFjZixxQkFBbUJBLGVBZEo7QUFlZixzQkFBb0JBLGVBZkw7O0FBaUJmLGdCQUFjQSxlQWpCQztBQWtCZix3QkFBc0JBLGVBbEJQO0FBbUJmLG1DQUFpQ0EsZUFuQmxCO0FBb0JmLG9DQUFrQ0EsZUFwQm5CO0FBcUJmLDJDQUF5Q0EsZUFyQjFCOztBQXVCZixxQkFBbUJBLGVBdkJKO0FBd0JmLDZCQUEyQkEsZUF4Qlo7QUF5QmYsK0JBQTZCQSxlQXpCZDs7QUEyQmYsY0FBWUEsZUEzQkc7QUE0QmYsZ0JBQWNBLGVBNUJDO0FBNkJmLG1DQUFpQ0EsZUE3QmxCO0FBOEJmLHFDQUFtQ0EsZUE5QnBCO0FBK0JmLHNDQUFvQ0EsZUEvQnJCOztBQWlDZixtQkFBaUJHLDZCQWpDRjtBQWtDZixtQkFBaUJBLDZCQWxDRjtBQW1DZixvQkFBa0JBLDZCQW5DSDtBQW9DZiwyQkFBeUJBLDZCQXBDVjtBQXFDZiw4QkFBNEJBLDZCQXJDYjtBQXNDZiwrQkFBNkJBLDZCQXRDZDtBQXVDZixzQ0FBb0NBLDZCQXZDckI7O0FBeUNmLDJCQUF5QkEsNkJBekNWO0FBMENmLDJCQUF5QkEsNkJBMUNWO0FBMkNmLDRCQUEwQkEsNkJBM0NYOztBQTZDZixnQkFBY0Qsc0JBN0NDO0FBOENmLG1CQUFpQkEsc0JBOUNGO0FBK0NmLHNCQUFvQkE7O0FBL0NMLENBQWpCOztBQW1EQUcsT0FBT0MsT0FBUCxHQUFpQkYsUUFBakIiLCJmaWxlIjoibWFwcGluZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFRyYW5zcGFyZW50Tm9kZSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9ub2RlL25vblRlcm1pbmFsL3RyYW5zcGFyZW50JyksXG4gICAgICBEaXNjYXJkU2Vjb25kQ2hpbGROb2RlID0gcmVxdWlyZSgnLi4vY29tbW9uL25vZGUvbm9uVGVybWluYWwvZGlzY2FyZFNlY29uZENoaWxkJyksXG4gICAgICBUcmFuc3BhcmVudFRoZW5LZWVwU2Vjb25kTm9kZSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9ub2RlL25vblRlcm1pbmFsL3RyYW5zcGFyZW50VGhlbktlZXBTZWNvbmQnKTtcblxuY29uc3QgbWFwcGluZ3MgPSB7XG5cbiAgJ25hbWUnOiBUcmFuc3BhcmVudE5vZGUsXG4gICdwYXJ0JzogVHJhbnNwYXJlbnROb2RlLFxuICAnc3RhdGVtZW50JzogVHJhbnNwYXJlbnROb2RlLFxuICAnc3ViRGVyaXZhdGlvbic6IFRyYW5zcGFyZW50Tm9kZSxcbiAgJ3Byb29mRGVyaXZhdGlvbic6IFRyYW5zcGFyZW50Tm9kZSxcbiAgJ3BhcmVudGhlc2lzZWRUeXBlJzogVHJhbnNwYXJlbnROb2RlLFxuICAnYWJyaWRnZWRQcm9vZkRlcml2YXRpb24nOiBUcmFuc3BhcmVudE5vZGUsXG5cbiAgJ3R5cGVOYW1lJzogVHJhbnNwYXJlbnROb2RlLFxuICAnbGFiZWxOYW1lJzogVHJhbnNwYXJlbnROb2RlLFxuICAndmFyaWFibGVOYW1lJzogVHJhbnNwYXJlbnROb2RlLFxuICAncmVmZXJlbmNlTmFtZSc6IFRyYW5zcGFyZW50Tm9kZSxcbiAgJ2NvbnN0cnVjdG9yTmFtZSc6IFRyYW5zcGFyZW50Tm9kZSxcbiAgJ21ldGF2YXJpYWJsZU5hbWUnOiBUcmFuc3BhcmVudE5vZGUsXG5cbiAgJ3ByZW1pc2UocyknOiBUcmFuc3BhcmVudE5vZGUsXG4gICd0eXBlKHMpRGVjbGFyYXRpb24nOiBUcmFuc3BhcmVudE5vZGUsXG4gICcodHlwZWQpVmFyaWFibGUocylEZWNsYXJhdGlvbic6IFRyYW5zcGFyZW50Tm9kZSxcbiAgJ3R5cGVkQ29uc3RydWN0b3IocylEZWNsYXJhdGlvbic6IFRyYW5zcGFyZW50Tm9kZSxcbiAgJyhxdWFsaWZpZWQpTWV0YXZhcmlhYmxlKHMpRGVjbGFyYXRpb24nOiBUcmFuc3BhcmVudE5vZGUsXG5cbiAgJyh0eXBlZClWYXJpYWJsZSc6IFRyYW5zcGFyZW50Tm9kZSxcbiAgJyhxdWFsaWZpZWQpTWV0YXZhcmlhYmxlJzogVHJhbnNwYXJlbnROb2RlLFxuICAnKGFicmlkZ2VkKVByb29mRGVyaXZhdGlvbic6IFRyYW5zcGFyZW50Tm9kZSxcblxuICAnYnlPckZyb20nOiBUcmFuc3BhcmVudE5vZGUsXG4gICd0eXBlT3JUZXJtJzogVHJhbnNwYXJlbnROb2RlLFxuICAndW5qdXN0aWZpZWRTdGF0ZW1lbnRPclVua25vd24nOiBUcmFuc3BhcmVudE5vZGUsXG4gICcodW4panVzdGlmaWVkU3RhdGVtZW50T3JVbmtub3duJzogVHJhbnNwYXJlbnROb2RlLFxuICAnc3BlY2lhbFVuYXNzaWduZWRPck1pbm9yS2V5d29yZHMnOiBUcmFuc3BhcmVudE5vZGUsXG5cbiAgJ2NvbW1hVGhlblRlcm0nOiBUcmFuc3BhcmVudFRoZW5LZWVwU2Vjb25kTm9kZSxcbiAgJ2NvbW1hVGhlblR5cGUnOiBUcmFuc3BhcmVudFRoZW5LZWVwU2Vjb25kTm9kZSxcbiAgJ2NvbW1hVGhlbkxhYmVsJzogVHJhbnNwYXJlbnRUaGVuS2VlcFNlY29uZE5vZGUsXG4gICdjb21tYVRoZW5NZXRhdmFyaWFibGUnOiBUcmFuc3BhcmVudFRoZW5LZWVwU2Vjb25kTm9kZSxcbiAgJ2NvbW1hVGhlbih0eXBlZClWYXJpYWJsZSc6IFRyYW5zcGFyZW50VGhlbktlZXBTZWNvbmROb2RlLFxuICAnY29tbWFUaGVuVHlwZWRDb25zdHJ1Y3Rvcic6IFRyYW5zcGFyZW50VGhlbktlZXBTZWNvbmROb2RlLFxuICAnY29tbWFUaGVuKHF1YWxpZmllZClNZXRhdmFyaWFibGUnOiBUcmFuc3BhcmVudFRoZW5LZWVwU2Vjb25kTm9kZSxcblxuICAncGFyZW50aGVzaXNlZFRlcm1MaXN0JzogVHJhbnNwYXJlbnRUaGVuS2VlcFNlY29uZE5vZGUsXG4gICdwYXJlbnRoZXNpc2VkVHlwZUxpc3QnOiBUcmFuc3BhcmVudFRoZW5LZWVwU2Vjb25kTm9kZSxcbiAgJ3BhcmVudGhlc2lzZWRMYWJlbExpc3QnOiBUcmFuc3BhcmVudFRoZW5LZWVwU2Vjb25kTm9kZSxcblxuICAnY29uY2x1c2lvbic6IERpc2NhcmRTZWNvbmRDaGlsZE5vZGUsXG4gICd0eXBlZFZhcmlhYmxlJzogRGlzY2FyZFNlY29uZENoaWxkTm9kZSxcbiAgJ3R5cGVkQ29uc3RydWN0b3InOiBEaXNjYXJkU2Vjb25kQ2hpbGROb2RlXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwcGluZ3M7XG4iXX0=