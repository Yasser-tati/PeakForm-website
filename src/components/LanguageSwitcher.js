import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <span>{t('common.language')}: </span>
      <button 
        onClick={() => changeLanguage('en')} 
        className={i18n.language === 'en' ? 'active' : ''}
      >
        English
      </button>
      <button 
        onClick={() => changeLanguage('fr')} 
        className={i18n.language === 'fr' ? 'active' : ''}
      >
        Français
      </button>
    </div>
  );
}

export default LanguageSwitcher; 