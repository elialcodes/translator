export interface InitialState {
  fromLanguage: string;
  toLanguage: string;
  fromText: string;
  result: string;
  loading: boolean;
}

//tipado de la acción del useReducer, combinamos tipos literales con normales
//el payload es la información de la acción:
//el idioma de entrada/salida, el texto introducido/resultante
export type Action =
  | { type: 'INTERCHANGE_LANGUAGE' } //si el type es este, no tiene payload
  | { type: 'SET_FROM_LANGUAGE'; payload: string }
  | { type: 'SET_TO_LANGUAGE'; payload: string }
  | { type: 'SET_FROM_TEXT'; payload: string }
  | { type: 'SET_RESULT'; payload: string };
