import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function TranslationExample() {
  const { t } = useTranslation();

  return (
    <div className="translation-example">
      <LanguageSwitcher />
      
      <h1>{t('common.welcome')}</h1>
      
      <div className="section">
        <h2>{t('home.title')}</h2>
        <p>{t('home.description')}</p>
        <button>{t('home.getStarted')}</button>
      </div>
      
      <div className="section">
        <h2>{t('about.title')}</h2>
        <p>{t('about.description')}</p>
      </div>
      
      <div className="section">
        <h2>{t('contact.title')}</h2>
        <form>
          <div className="form-group">
            <label>{t('contact.name')}</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>{t('contact.email')}</label>
            <input type="email" />
          </div>
          <div className="form-group">
            <label>{t('contact.message')}</label>
            <textarea rows="4"></textarea>
          </div>
          <button type="submit">{t('contact.submit')}</button>
        </form>
      </div>
    </div>
  );
}

export default TranslationExample; 