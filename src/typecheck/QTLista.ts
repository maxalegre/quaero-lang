import { QuaeroType } from "./QuaeroType";
import { QTNumeral } from "./QTNumeral";

export class QTLista extends QuaeroType {
	constructor() {
		super();
	}

	public isCompatible(tipo: QuaeroType): Boolean {
		if (tipo === this) {
			return true;
		}
		return false;
	}

	public getInstance(): QuaeroType {
		return this;
	}

	public coerce(tipo: QuaeroType): QuaeroType {
		return tipo; 
	}

	public toString(): String {
		return "Lista";
	}

}