import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

//empty for now

import en from './en.json';
import pt from './pt.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  debug: true,
  resources: {
    en: {
      translation: en,
    },
    pt: {
      translation: pt,
    },
  },
  fallbackLng: 'en',
  lng: 'en',
  initImmediate: false,
});

export default i18n;
