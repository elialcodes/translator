//nos importamos el type de las siguientes constantes
import { type SUPPORTED_LANGUAGES, type AUTO_LANGUAGE } from './constants';

//este tipado será el mismo que el de las keys que tenemos en el objeto de la constante
//SUPPORTD_LENGUAGES, así, si añadimos idiomas al traductor, tomará las keys
//así los archivo de constantes y de tipos estarán sincronizados
//con typeof le decimo que coja el objeto al completo (y de ahí saca las keys)
export type Language = keyof typeof SUPPORTED_LANGUAGES;

//este tipado será el mismo que el que tiene AUTO_LANGUAGE, por si decidimos
//cambiar el valor de la constante AUTO_LANGUAGE, los archivo de constantes y de tipos
//estarán sincronizados
export type AutoLanguage = typeof AUTO_LANGUAGE;

//este tipado será para el idioma de partida, y juntará los 2 tipos anteriores
export type FromLanguage = Language | AutoLanguage;
export interface InitialState {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  result: string;
  loading: boolean;
}

//tipado de la action del useReducer:
//- type: tipos literales que corresponden con lo que hace cada action
//- el payload es la información de la acción:
//  el idioma de entrada/salida, el texto introducido/resultante
export type Action =
  | { type: 'INTERCHANGE_LANGUAGE' } //si el type de action es este, no tiene payload
  | { type: 'SET_FROM_LANGUAGE'; payload: FromLanguage }
  | { type: 'SET_TO_LANGUAGE'; payload: Language }
  | { type: 'SET_FROM_TEXT'; payload: string }
  | { type: 'SET_RESULT'; payload: string };
