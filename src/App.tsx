import './App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useStore } from './hooks/useStore';
import { useDebounce } from './hook/useDebounce';
import { AUTO_LANGUAGE } from './constants';
import { ArrowsIcon } from './components/Icons';
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

  const debouncedFromText = useDebounce(fromText, 500);

  const handleTranslate = async () => {
    try {
      const translated = await translateText(
        fromLanguage,
        fromText,
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
    if (fromText) {
      handleTranslate();
    }
  }, [fromText, fromLanguage, toLanguage]);

  return (
    <Container>
      <h1>Translator</h1>
      <Row>
        <Col>
          <LanguageSelector
            type="from"
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          <TextArea type="from" value={fromText} onChange={setFromText} />
        </Col>
        <Col>
          <Button
            variant="link"
            // si el lenguaje de partida es "auto", el botón está desabilitado
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguage}
          >
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <LanguageSelector
            type="to"
            value={toLanguage}
            onChange={setToLanguage}
          />
          <TextArea type="to" loading={loading} value={result} readOnly />
        </Col>
      </Row>
      <button
        onClick={() => {
          translateText(fromText, fromLanguage, toLanguage);
        }}
      >
        TEST
      </button>
    </Container>
  );
}

export default App;

//Como estás? Necesito escribir un texto muy largo para ver si sale "cargando"
//bon jour
//My name is Noelia
