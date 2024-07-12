import { useReducer } from 'react';
import {
  type Action,
  type State,
  type FromLanguage,
  type Language,
} from '../types';

//Hook useReducer: para manejar estados complejos:

//1. Creamos el estado inicial a modo de objeto
export const initialState: State = {
  fromLanguage: 'es',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
};

//2. Creamos la función reducer, que siempre devuelve un estado y lleva 2 argumentos:
//- el estado
//- una accion: action es un objeto que tiene como propiedades type (el tipo de
//  acción) y payload (que es la información que lleva consigo la accion y con ella
//  seteraremos el estado)
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
      loading: state.fromText !== '',
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
      loading: payload.trim() !== '',
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
  //useReduce siempre devuelve un array con 2 elementos: el estado actual del
  //componente y el dispatch (una función que se usa para despachar acciones
  //que actualizan el estado)
  //del array que devuelve useReducer sacamos 5 constantes del estado inicial
  //así como el dispatch; y como argumentos del useReducer pasamos la función
  //reducer(función que manejará las actualizaciones del estado) y el estado inicial
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  //es buena práctica que el dispatch no salga de aquí, asi que hacemos una
  //función intermedia, que será lo que retornemos y que nos dice que despachemos
  //la action del reducer correspondiente al type...el que sea
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
