@preprocessor typescript

@{%

import {
  QTBool,
  QTInt,
  QTNumeral,
  Numeral,
  String,
  Int,
  TruthValue,
  Variable,
  Conjunction,
  Disjunction,
  Addition,
  Substraction,
  Negation,
  CompareEqual,
  CompareGreat,
  CompareGreatOrEqual,
  CompareLessOrEqual,
  CompareLess,
  CompareNotEqual,
  Multiplication,
  Division,
  Lista,
  Conjunto,
  String,
  Clave

} from '../ast/AST';

import { tokens } from './Tokens';
import { MyLexer } from './Lexer';

const lexer = new MyLexer(tokens);

%}

@lexer lexer


# Colecciones
conjunto -> 
"{"  "}"                {% ([,]) => (new Conjunto([])) %} 
|"{" elementos "}"      {% ([,]) => (new Conjunto(elementos)) %} 

lista -> 
"["  "]"                {% ([,]) => (new Lista([])) %} 
|"[" elementos "]"      {% ([,]) => (new Lista(elementos)) %} 

elementos->
<<<<<<< HEAD
elemento                 {% ([elemento]) => [elemento] %} 
|elementos "," elemento  {% ([elementos, ,elemento]) => elementos.push(elemento) %} 

=======
elemento                 {% ([elemento]) => ([elemento]) %} 
|elementos "," elemento  {% ([elementos, ,elemento]) => (elementos.push(elemento); return(elementos);)%} 
>>>>>>> f1c5d62203a03fbc6c2be7e09f92b2d9315340a5
elemento -> 
value                   {% id %}
|lista                  {% id %}
|conjunto               {% id %}
|clave                  {% id %}

clave ->
identifier ":" value        {% ([id,,valor]) => (new Clave(id,valor)) %}
|string ":" value           {% ([id,,valor]) => (new Clave(id,valor)) %}

value ->
  string                    {% ([string]) => (new String(string)) %}
  | number                  {% ([num]) => (new Numeral(num)) %}
  | "true"                  {% () => (new TruthValue(true)) %}
  | "false"                 {% () => (new TruthValue(false)) %}
  | identifier              {% ([id]) => (new Variable(id)) %}

# Atoms
identifier ->
    %identifier             {% ([id]) => (id.value) %}
string->
  %string                   {% ([id]) => (id.value) %}
number ->
    %integer                {% ([id]) => (id.value) %}
  | %hex                    {% ([id]) => (id.value) %}
  | %float                  {% ([id]) => (id.value) %}
