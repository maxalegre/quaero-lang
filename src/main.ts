import * as readlineSync from "readline-sync";

import { Parser } from "nearley";

import { tokens } from "./parser/Tokens";
import { MyLexer } from "./parser/Lexer"
import { ParserRules, ParserStart } from "./parser/Grammar";

import { ASTNode, Stmt } from './ast/AST';

import { Estado } from './interpreter/Estado';
import { CheckState } from './typecheck/CheckState';
import { QuaeroType } from './typecheck/QuaeroType';
import { QTNumeral } from "./typecheck/QTNumeral";


console.log("Quaero :: REPL");

var state = new Estado();
var checkstate = new CheckState();
while (true) {
  const lexer = new MyLexer(tokens);
  const parser = new Parser(ParserRules, ParserStart, { lexer });

  const input = readlineSync.question('> ');

  try {
    // Parse user input
    parser.feed(input);
    // Print result
    const nodes: Stmt[] = parser.results;

    switch (nodes.length) {
      case 0: {
        console.log("Parse failed!!");
        break;
      }
      case 1: {
        const node = nodes[0];
        console.log(node);
        state = node.evaluate(state);console.log(`\n${state.toString()}`);
        
        break;
      }
      default: {
        console.log("Warning!! Grammar is ambiguous, multiple parse results.\n");
        nodes.map((node) => console.log(node.toString()));
        break;
      }
    }

  } catch (parseError) {
    console.log(parseError);
  }
}
