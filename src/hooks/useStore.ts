import { useReducer } from 'react';
import {
  type Action,
  type State,
  type FromLanguage,
  type Language,
} from '../types';

//Hook useReducer: en vez de useState, y sirve para manejar estados complejos:

//1. Creamos el estado inicial a modo de objeto
export const initialState: State = {
  fromLanguage: 'en',
  toLanguage: 'es',
  fromText: '',
  result: '',
  loading: false,
};

//2. Creamos la función reducer, que siempre devuelve un estado y lleva 2 argumentos:
//- el estado inicial
//- el objeto action: que dentro tiene las propiedades type (el tipo de acción) y payload
//  (que es la información que lleva consigo la accion y con ella seteraremos el estado)
export function reducer(state: State, action: Action): State {
  //de action, sacamos las constantes type y payload
  const { type, payload } = action;

  //logica dentro del reducer:

  if (type === 'INTERCHANGE_LANGUAGE') {
    //setearemos los estados necesarios: en esta acción hacemos un intercambio
    //entre los lenguages de entrada y salida, y como aquí no hay payload,
    //no es necesario que action devuelva información con la setear el estado,
    //así que seteamos directamente
    return {
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      fromText: '',
      result: '',
      loading: false,
    };
  }

  if (type === 'SET_FROM_LANGUAGE') {
    //tomamos con spreed todo el estado y setearemos los estados necesarios, uno
    //de ellos con la información del payload de action.
    return {
      ...state,
      fromLanguage: payload,
      fromText: '',
      result: '',
      loading: false,
    };
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.fromText === '') {
      return state;
    }
    return {
      ...state,
      toLanguage: payload,
      result: '',
      loading: state.fromText !== '',
    };
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      fromText: payload,
      loading: payload.trim() !== '', //trim elimina espacios en blanco al principio y a final
      result: '',
    };
  }

  if (type === 'SET_RESULT') {
    if (state.fromText === '') {
      return state;
    }
    return {
      ...state,
      loading: false,
      result: payload,
    };
  }

  return state; //sea cual sea la condición siempre va a devolver un estado
}

//3. Hook useReducer, tiene como parámetros la función reducer y el estado inicial
export function useStore() {
  //useReduce siempre se compone de un array con 2 elementos: el estado actual y
  //el dispatch (una función que se usa para despachar acciones que actualizan el estado)
  //de dicho array sacamos: del primer elemento las 5 constantes del estado inicial,
  //y del segundo elemento el dispatch;
  //como argumentos del useReducer pasamos: la función reducer(función que manejará
  //las actualizaciones del estado) y el estado inicial
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  //es buena práctica que el dispatch no salga de aquí, asi que hacemos una
  //función intermedia, que será lo que retornemos y que nos dice que despachemos
  //la action del reducer correspondiente al type... el que sea
  const interchangeLanguage = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGE', payload: undefined });
  };

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload });
  };

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload });
  };

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload });
  };

  //devolvemos los 5 estados procedentes de la función reducer
  //devolvemos las 5 funciones del useReducer (setean los 5 estados anteriores)
  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
