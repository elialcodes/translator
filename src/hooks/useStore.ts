import { useReducer } from 'react';
// import { AUTO_LANGUAGE } from '../constants';
import {
  type Action,
  type InitialState,
  type FromLanguage,
  type Language,
} from '../types';

//Hook useReducer: para manejar estados complejos
//1. Creamos el estado inicial a modo de objeto
export const initialState: InitialState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
};

//2. Creamos la función reducer, que siempre devuelve un estado y lleva siempre 2 argumentos:
//- el estado
//- una accion: action es un objeto que tiene como propiedades el tipo de acción (type)
//  y payload (que es la información que lleva consigo la accion y con esta información
//  seteraremos el estado)
export function reducer(state: InitialState, action: Action): InitialState {
  //de action, sacamos la constante type
  const { type } = action;

  if (type === 'INTERCHANGE_LANGUAGE') {
    //tomamos con spreed todo el estado inicial y setearemos los 2 estados Languages:
    //en esta acción hacemos un intercambio entre los lenguages de entrada y salida,
    //y aquí no hay payload, no es necesario que action devuelva información con la que
    //setear el estado, así que podemos setear directamente.
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }
  if (type === 'SET_FROM_LANGUAGE') {
    //tomamos con spreed todo el estado incial y setearemos uno de los estados
    //con la información del payload
    return {
      ...state,
      fromLanguage: action.payload,
    };
  }
  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload,
    };
  }
  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true, //seteamos el estado loading mientras el traductor piensa
      fromText: action.payload,
      result: '',
    };
  }
  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false, //seteamos el estado loading cuando ya hay resultado
      result: action.payload,
    };
  }
  return state; //siempre va a devolver un estado
}

//3. Hook useReducer, que tiene como parámetros la función reducer y
//el estado inicial
export function useStore() {
  //useReduce siempre devuelve un array con 2 elementos: el estado actual del
  //componente y el dispatch (una función que se usa para despachar acciones
  //que actualizan el estado).
  //del array que devuelve useReducer sacamos 5 constantes del estado inicial
  //así como el dispatch; y como argumentos del useReducer pasamos la función
  //reducer(función que manejará las actualizaciones del estado) y el estado inicial
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  //es buena práctica que el dispatch no salga de aquí, asi que hacemos una
  //función intermedia, que será lo que retornemos
  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGE' });
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
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
