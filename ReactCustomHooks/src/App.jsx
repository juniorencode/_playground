import { useTranslation } from './hooks/useTranslation.hook';

function App() {
  const { language, setLanguage, setFallbackLanguage, t } = useTranslation();

  return (
    <>
      <div>{language}</div>
      <div>{t('hi')}</div>
      <div>{t('bye')}</div>
      <div>{t('nested.value')}</div>
      <button onClick={() => setLanguage('es')}>Change To Spanish</button>
      <button onClick={() => setLanguage('en')}>Change To English</button>
      <button onClick={() => setFallbackLanguage('es')}>Change FB Lang</button>
    </>
  );
}

export default App;
