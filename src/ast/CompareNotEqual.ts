import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Lista } from './Lista';
import { Conjunto } from './Conjunto';

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
    var lhsEval = this.lhs.evaluate(state);
    var rhsEval = this.rhs.evaluate(state);
    console.log(typeof lhsEval)
    console.log(typeof rhsEval)

    if (typeof lhsEval === 'number' && typeof rhsEval === 'number') {
      if (lhsEval === NaN || rhsEval === NaN) {
        return false;
      } else {
        return lhsEval != rhsEval;
      }
    }

    if (typeof lhsEval === 'boolean' && typeof rhsEval === 'boolean') {
      return lhsEval != rhsEval;
    }

    if (lhsEval instanceof Conjunto && rhsEval instanceof Conjunto) {
      return this.compareConjunto(lhsEval, rhsEval);
    }

    if (lhsEval instanceof Lista && rhsEval instanceof Lista) {
      return this.compareLista(lhsEval, rhsEval);
    }

    if (lhsEval instanceof String && rhsEval instanceof String) {
      return lhsEval != rhsEval;
    }

    throw new Error("No se reconoce el tipo.");
  }

  compareLista(lhsList: Lista, rhsList: Lista): Boolean {
    for (var x = 0; x < lhsList.elementos.length; x++) {
      var lhsEvalLista = lhsList.elementos[x].evaluate;
      var rhsEvalLista = rhsList.elementos[x].evaluate;

      if (lhsEvalLista instanceof Lista && rhsEvalLista instanceof Lista) {
        return this.compareLista(lhsEvalLista, rhsEvalLista);
      }

      if (lhsEvalLista instanceof Conjunto && rhsEvalLista instanceof Conjunto) {
        return this.compareConjunto(lhsEvalLista, rhsEvalLista);
      }

      if (lhsEvalLista instanceof String && rhsEvalLista instanceof String) {
        if (lhsEvalLista == rhsEvalLista) {
          return false;
        }
      }

      if (typeof lhsEvalLista === 'number' && typeof rhsEvalLista === 'number') {
        if (lhsEvalLista === NaN || rhsEvalLista === NaN) {
          return false;
        } else {
          if (lhsEvalLista == rhsEvalLista) {
            return false;
          }
        }
      }

      if (typeof lhsEvalLista === 'boolean' && typeof rhsEvalLista === 'boolean') {
        if (lhsEvalLista == rhsEvalLista) {
          return false
        }
      }
    }
    return true;
  }

  compareConjunto(lhsList: Conjunto, rhsList: Conjunto): Boolean {
    var pertenece = false;
    if (lhsList instanceof Conjunto && rhsList instanceof Conjunto) {
      if (lhsList.elementos.length == rhsList.elementos.length) {
        for (var x = 0; x < lhsList.elementos.length; x++) {
          pertenece = false;
          for (var y = 0; y < rhsList.elementos.length; y++) {
            if (lhsList.elementos[x] == rhsList.elementos[y]) {
              pertenece = true;
              break;
            }
          }
          if (!pertenece) {
            return true;
          }
        }
        return false;
      }
      return true;
    }
  }
}
