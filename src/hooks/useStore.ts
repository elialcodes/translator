import { useReducer } from 'react';
import { InitialState, Action } from '../types';

//Hook useReducer: para manejar estados complejos
//1. Creamos el estado inicial
export const initialState: InitialState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
};

//2. Creamos la función reducer, lleva 2 argumentos, el estado y una accion
export function reducer(state: InitialState, action: Action) {
  //sacamos las constantes type y payload (es la información que lleva consigo la accion
  //y con esta información actulizaremos el estado)
  const { type, payload } = action;

  if (type === 'INTERCHANGE_LANGUAGE') {
    //tomamos con spreed todo el estado inicial y setearemos los 2 estados Languages
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
      fromLanguage: payload,
    };
  }
  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: payload,
    };
  }
  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true, //seteamos el estado loading mientras el traductor piensa
      fromText: payload,
      result: '',
    };
  }
  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false, //seteamos el estado loading cuando ya hay resultado
      result: payload,
    };
  }
}

export function useStore() {
  //3. Usamos el hook useReducer, que tiene como parámetros la función reducer y
  //el estado inicial

  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  //es buena práctica que el dispatch no salga de aquí, asi que hacemos una
  //función intermedia, que será lo que retornemos
  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' });
  };

  const setFromLanguage = (payload) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload });
  };

  const setToLanguage = (payload) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload });
  };
  const setFromText = (payload) => {
    dispatch({ type: 'SET_FROM_TEXT', payload });
  };
  const setResult = (payload) => {
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
