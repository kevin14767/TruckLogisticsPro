import React, { useEffect } from 'react';
import Providers from "./navigation";
import './i188n/index';
import { loadStoredLanguage } from './i188n';

const App = () => {
  useEffect(() => {
    loadStoredLanguage();
  }, []);

  return <Providers />;
};

export default App;
