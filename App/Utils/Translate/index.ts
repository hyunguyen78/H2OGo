import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {resources} from './Resources';
import {store} from '@/Config/Store';

//empty for now

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  debug: false,
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (alias: string): void => {
  console.log('log_', alias);
  i18n.changeLanguage(alias);
};

export default i18n;
