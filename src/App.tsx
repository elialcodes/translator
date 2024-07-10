import './App.css';
import { useEffect, useState } from 'react';
import { useStore } from './hooks/useStore';
import { useDebounce } from './hooks/useDebounce';
import { VOICE_FOR_LANGUAGE } from './constants';
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { TextArea } from './components/TextArea';
import { translateText } from './services/apiTranslate';

function App() {
  const {
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
  } = useStore();

  const debouncedFromText = useDebounce(fromText, 1000);

  const handleTranslate = async () => {
    try {
      const translated = await translateText(
        fromLanguage,
        debouncedFromText,
        toLanguage,
      );
      setResult(translated);
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  useEffect(() => {
    // if (fromText === '') {
    //   return;
    // }
    if (debouncedFromText) {
      handleTranslate();
    }
  }, [debouncedFromText, fromLanguage, toLanguage]);

  // Estado para mostrar el mensaje "Copied text"
  const [copied, setCopied] = useState(false);

  //función para copiar texto del text area,lo hará el navegador
  //con la API del Portapapeles
  const handleClipBoard = () => {
    navigator.clipboard
      .writeText(result)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Mostrar mensaje durante 2 segundos
      })
      .catch(() => {});
  };

  //función para dar voz al texto result, lo hará el navegador y sus propiedades
  //uterance significa instancia
  const handleSpeak = () => {
    const uterance = new SpeechSynthesisUtterance(result);
    uterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    uterance.rate = 0.9; //velocidad de la voz
    speechSynthesis.speak(uterance);
  };

  return (
    <>
      <h1 className="title">Translator</h1>
      <div className="container">
        <div className="selector-languages">
          <LanguageSelector
            type="from"
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          <button
            className="arrows-button"
            // si el lenguaje de partida es "auto", el botón está desabilitado
            //disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguage}
          >
            <ArrowsIcon />
          </button>
          <LanguageSelector
            type="to"
            value={toLanguage}
            onChange={setToLanguage}
          />
        </div>
        <div className="textarea-languages">
          <TextArea type="from" value={fromText} onChange={setFromText} />
          <div>
            <TextArea type="to" loading={loading} value={result} readOnly>
              <span className="loading">Loading...</span>
            </TextArea>
            <div>
              <button
                className="icon-button"
                style={{
                  marginTop: '10px',
                }}
                disabled={result === ''}
                onClick={handleClipBoard}
              >
                <ClipboardIcon />
              </button>
              <button
                className="icon-button"
                disabled={result === ''}
                onClick={handleSpeak}
              >
                <SpeakerIcon />
              </button>
              {copied && <span className="copied-text">Copied text!</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

//Como estás? Necesito escribir un texto muy largo para ver si sale "cargando"
//bon jour
//My name is Noelia
