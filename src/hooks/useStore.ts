import { useReducer } from 'react';
import {
  type Action,
  type InitialState,
  type FromLanguage,
  type Language,
} from '../types';

//Hook useReducer: para manejar estados complejos:

//1. Creamos el estado inicial a modo de objeto
export const initialState: InitialState = {
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
export function reducer(state: InitialState, action: Action): InitialState {
  //de action, sacamos la constante type
  const { type } = action;

  //logica dentro del reducer:

  if (type === 'INTERCHANGE_LANGUAGE') {
    //logica dentro del reducer para cuando se intercambien los lenguajes:

    console.log('interchange languages');
    //si no, tomamos con spreed todo el estado inicial y setearemos 2 estados:
    //en esta acción hacemos un intercambio entre los lenguages de entrada y salida,
    //y aquí no hay payload, no es necesario que action devuelva información con la
    //que setear el estado, así que podemos setear directamente.
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      fromText: '',
      result: '',
    };
  }

  if (type === 'SET_FROM_LANGUAGE') {
    //si el lenguaje de partida es = al que contiene payload se devuelve el estado tal cual
    if (state.fromLanguage === action.payload) return state;

    //definimos la constante loading para que sea true cuando haya texto en formText
    const loading = state.fromText !== '';
    console.log('set fromLanguage');
    //si no, tomamos con spreed todo el estado incial y setearemos uno estado
    //con la información del payload de action y otros dos a " ".
    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading,
    };
  }

  if (type === 'SET_TO_LANGUAGE') {
    //si el lenguaje de salida es = al que contiene payload se devuelve el estado tal cual
    if (state.toLanguage === action.payload) return state;

    const loading = state.fromText !== '';
    console.log('set toLanguage');
    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading,
    };
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = state.fromText !== '';
    console.log('set fromText');
    return {
      ...state,
      loading, //seteamos el estado loading mientras el traductor piensa
      fromText: action.payload,
      result: '',
    };
  }

  if (type === 'SET_RESULT') {
    if (state.fromText === '') {
      return state;
    }
    console.log('set result');
    return {
      ...state,
      loading: false, //seteamos el estado loading cuando ya hay resultado
      result: action.payload,
    };
  }

  return state; //sea cuan sea la condición siempre va a devolver un estado
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
    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
