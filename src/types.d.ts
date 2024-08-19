//en el archivo de las constantes el tipado ha sido por inferencianos, así que nos
//importamos sus tipos para que, si modificamos el arthivo de las constantes,
//el archivo de los tipos esté sincronizado
import { type SUPPORTED_LANGUAGES, type AUTO_LANGUAGE } from './constants';

//el tipo Language queremos que tenga las mismas keys que en el objeto de la
//constante SUPPORTED_LENGUAGES, así, si añadimos idiomas al traductor, tomará
//las keys: los archivo de constantes y de tipos estarán sincronizados,
//con keyof typeof le decimos que coja las keys de los esos types.
export type Language = keyof typeof SUPPORTED_LANGUAGES;

//el tipo AutoLanguage será el mismo que el que tiene AUTO_LANGUAGE, así si
//decidimos cambiar el valor de la constante AUTO_LANGUAGE, los archivo de
//constantes y de tipos estarán sincronizados
export type AutoLanguage = typeof AUTO_LANGUAGE;

//este tipado será para aplicar al idioma de partida, juntará los 2 tipos anteriores:
//esto está pensado para una mejor api y que el lenguage por defecto sea "auto"
//y detecte el idioma cuando el usuario escriba
export type FromLanguage = Language | AutoLanguage;
export interface State {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  result: string;
  loading?: boolean;
}

//tipado de la action del useReducer:
//- type: tipos literales que corresponden con lo que hace cada action
//- el payload es la información de la acción:
//  el idioma de entrada/salida, el texto introducido/resultante
export type Action =
  | { type: 'INTERCHANGE_LANGUAGE'; payload?: undefinded } //en este type, payload no está definido
  | { type: 'SET_FROM_LANGUAGE'; payload: FromLanguage }
  | { type: 'SET_TO_LANGUAGE'; payload: Language }
  | { type: 'SET_FROM_TEXT'; payload: string }
  | { type: 'SET_RESULT'; payload: string };
