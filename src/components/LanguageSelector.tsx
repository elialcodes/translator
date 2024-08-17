import { SUPPORTED_LANGUAGES } from '../constants';
import { type FC } from 'react';
import { FromLanguage, Language } from '../types';

//lo dejamos preparado para una futura api mejor que detecte el idioma de entrada
//por lo que hacemos que el selector de lenguage de entrada tenga un tipado
//diferente al de salida (el de entrada contempla lenguaje "auto" y el de salida no)
//así que hacemos un tipado de props que dependerán del type que tenga cada select
type Props =
  | {
      type: 'from';
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
    }
  | { type: 'to'; value: Language; onChange: (language: Language) => void };

export const LanguageSelector: FC<Props> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language); //TS daba error y se forzó el tipado
  };

  return (
    <select className="language" onChange={handleChange} value={value}>
      {/* lo dejamos preparado para una futura api mejor que contemple como idioma 
      de partida "auto" para detectar el idioma del fromText:
      si type = "from", por defecto tendrá valor "auto" para detectar el idioma */}
      {/* {type === 'from' && <option value="auto">Detect language</option>} */}

      {/* SUPPORTED_LANGUAGES es un objeto, no un array, para poderlo mapear
      tomamos del objeto sus entradas y mapeamos las entrada y sus valores*/}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {/* al usuario le mostramos el literal, no la key */}
          {literal}
        </option>
      ))}
    </select>
  );
};
