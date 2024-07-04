import { Form } from 'react-bootstrap';
import { SUPPORTED_LANGUAGES } from '../constants';
import { type FC } from 'react';
import { FromLanguage, Language } from '../types';

//el lenguaje de partida tiene un tipado diferente al de salida (contempla "auto"
//y el de salida no), así que hacemos un tipado de props que dependerán del type
//que tenga el select
type Props =
  | {
      type: 'from';
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
    }
  | { type: 'to'; value: Language; onChange: (language: Language) => void };

export const LanguageSelector: FC<Props> = ({ type, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language); //TS devolvía error y se forzó el tipado
  };

  return (
    <Form.Select
      aria-label="Select the language"
      onChange={handleChange}
      value={value}
    >
      {/* si type = "from", por defecto tendrá valor "auto" para detectar el idioma */}
      {type === 'from' && <option value="auto">Detect language</option>}

      {/* SUPPORTED_LANGUAGES es un objeto, no un array, para poderlo mapear
      tomamos del objeto sus entradas y mapeamos las entrada y sus valores*/}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {/* al usuario le mostramos el literal, no la key */}
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};
