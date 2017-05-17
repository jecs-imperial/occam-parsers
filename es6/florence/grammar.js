'use strict';

const grammar = `

    document                                          ::=   header? verticalSpace? body?
                                              
                                              
                                              
    header                                            ::=   includeDirective+
    
    includeDirective                                  ::=   'include'<NO_WHITESPACE>'('<NO_WHITESPACE>[string]<NO_WHITESPACE>')' <END_OF_LINE>
                                              
                                              
    body                                              ::=   part+  
        
    part                                              ::=   type | constructors | rule | axiom | theorem | lemma | verticalSpace | error
    
    

    type                                              ::=   'Type' typeName
    
    constructors                                      ::=   'Constructors' typedConstructorList
    
    rule                                              ::=   'Rule' parenthesisedLabelList? <END_OF_LINE> premise(s)? conclusion proof?
    
    axiom                                             ::=   'Axiom' parenthesisedLabelList? <END_OF_LINE> premise(s)? conclusion
    
    theorem                                           ::=   'Theorem' parenthesisedLabelList? <END_OF_LINE> premise(s)? conclusion proof
        
    lemma                                             ::=   'Lemma' parenthesisedLabelList? <END_OF_LINE> premise(s)? conclusion proof    
    
    
    
    typedConstructorList                              ::=   typedConstructor<NO_WHITESPACE>commaThenTypedConstructor*
    
    commaThenTypedConstructor                         ::=   ','<NO_WHITESPACE>typedConstructor
    
    typedConstructor                                  ::=   constructor<NO_WHITESPACE>':'<NO_WHITESPACE>typeName
    
    constructor                                       ::=   constructorName<NO_WHITESPACE>parenthesisedTypeNameList?
    
    constructorName                                   ::=   [unassigned]
        
    
    
    parenthesisedTypeNameList                         ::=   '('<NO_WHITESPACE>typeNameList<NO_WHITESPACE>')'
    
    typeNameList                                      ::=   typeName<NO_WHITESPACE>commaThenTypeName*
    
    commaThenTypeName                                 ::=   ','<NO_WHITESPACE>typeName

    typeName                                          ::=   [unassigned]
    
    

    parenthesisedLabelList                            ::=   '('<NO_WHITESPACE>labelList<NO_WHITESPACE>')'
    
    labelList                                         ::=   label<NO_WHITESPACE>commaThenLabel*
    
    commaThenLabel                                    ::=   ','<NO_WHITESPACE>label
    
    
    
    premise(s)                                        ::=   premise | premises
    
    premise                                           ::=   'Premise' <END_OF_LINE> (un)labelledStatement
    
    premises                                          ::=   'Premises' <END_OF_LINE> (un)labelledStatement (un)labelledStatement+
    
    conclusion                                        ::=   'Conclusion' <END_OF_LINE> (un)labelledStatement
    
    proof                                             ::=   'Proof' <END_OF_LINE> subLemmaOr(un)labelledStatementThenVerticalSpace* therefore
    
    therefore                                         ::=   'Therefore' <END_OF_LINE> (un)labelledStatement
    
    
    
    subLemmaOr(un)labelledStatementThenVerticalSpace  ::=   subLemmaOr(un)labelledStatement verticalSpace?   
    
    subLemmaOr(un)labelledStatement                   ::=   subLemma | (un)labelledStatement
    
    subLemma                                          ::=   suppose then? hence
    
    
    
    suppose                                           ::=   'Suppose' <END_OF_LINE> unlabelledStatement+
    
    then                                              ::=   'Then' <END_OF_LINE> subLemmaOr(un)labelledStatement+
    
    hence                                             ::=   'Hence' <END_OF_LINE> (un)labelledStatement
    
    
    
    (un)labelledStatement                             ::=   unlabelledStatement | labelledStatement
    
    labelledStatement                                 ::=   statement 'by' label <END_OF_LINE>  
    
    unlabelledStatement                               ::=   statement <END_OF_LINE>  
    
    statement                                         ::=   specialOrUnassigned+ 
    
    specialOrUnassigned                               ::=   [special] | [unassigned]
    
    
    
    label                                             ::=   [unassigned]
     
     
     
    verticalSpace                                     ::=   <END_OF_LINE>+
    
    
    
    error                                             ::=   *
    
`;

module.exports = grammar;
