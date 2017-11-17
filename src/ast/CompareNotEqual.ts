import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { QuaeroType } from '../typecheck/QuaeroType';

/**
  Representación de las comparaciones por igual.
*/
export class CompareNotEqual implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `CompareNotEqual(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} /= ${this.rhs.unparse()})`;
  }

  evaluate(state: Estado): any {
<<<<<<< HEAD
    var lhsEval = this.lhs.evaluate(state);
    var rhsEval = this.rhs.evaluate(state);
    console.log(typeof lhsEval)
    console.log(typeof rhsEval)

    if (typeof lhsEval === 'number' && typeof rhsEval === 'number') {
      console.log ('Los operandos son del tipo numérico.');
      return lhsEval /= rhsEval;
    }
    console.log ('Operandos deben ser de tipo numérico.');
    throw new Error("Operandos deben ser de tipo numérico.");
  }
=======
    return undefined;
  }

>>>>>>> ad6a215f531c2f088e709bcfa1b6203f3535e2ef
}
