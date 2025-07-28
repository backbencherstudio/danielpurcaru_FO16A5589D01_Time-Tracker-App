'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState, useRef } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (
          config: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          }
        ) => void;
      };
    };
  }
}

interface LanguageSwitcherProps {
  variant?: 'default' | 'minimal';
  className?: string;
  onLanguageChange?: (lang: string) => void;
}

const LanguageSwitcher = ({ variant = 'default', className = '', onLanguageChange }: LanguageSwitcherProps) => {
  const [languageDropDown, setLanguageDropDown] = useState(false);
  const [language, setLanguage] = useState("EN");
  const languageDropdownRef = useRef(null);
  const dropdownContentRef = useRef(null);
  const { selectedLang, setSelectedLang } = useLanguage();

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLanguageDropDown(!languageDropDown);
  };

  const handleLanguageChange = (lang: string) => {
    const languageMap = {
      'English': { code: 'en', short: 'EN', flag: '🇬🇧' },
      'Spanish': { code: 'es', short: 'ES', flag: '🇪🇸' },
      'Portuguese': { code: 'pt', short: 'PT', flag: '🇵🇹' }
    };
    // const languageMap = {
    //     'German': { code: 'de', short: 'DE', flag: '🇩🇪' },
    //     'English': { code: 'en', short: 'EN', flag: '🇬🇧' },
    //     // 'Arabic': { code: 'ar', short: 'AR', flag: '🇦🇪' },
    //     // 'Chinese': { code: 'zh-CN', short: 'ZH', flag: '🇨🇳' },
    //     // 'French': { code: 'fr', short: 'FR', flag: '🇫🇷' }
    // };

    const langInfo = languageMap[lang as keyof typeof languageMap];

    if (langInfo) {
      setSelectedLang(langInfo.code);
      setLanguage(langInfo.short);
      setLanguageDropDown(false);
      onLanguageChange?.(langInfo.code);

      // Initialize Google Translate
      const waitForGoogleTranslate = setInterval(() => {
        if (typeof window.google !== 'undefined' && window.google.translate) {
          clearInterval(waitForGoogleTranslate);
          const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
          if (selectElement) {
            selectElement.value = langInfo.code;
            selectElement.dispatchEvent(new Event('change'));
          }
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,es,pt',
            autoDisplay: false
          });
        }
      }, 100);

      setTimeout(() => clearInterval(waitForGoogleTranslate), 5000);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        dropdownContentRef.current &&
        !(languageDropdownRef.current as HTMLElement).contains(event.target as Node) &&
        !(dropdownContentRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setLanguageDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Set initial language based on selectedLang
    const langMap = {
      'en': 'EN',
      'es': 'ES',
      'pt': 'PT',
    };
    setLanguage(langMap[selectedLang as keyof typeof langMap] || 'EN');
  }, [selectedLang]);

  const dropdownStyles = variant === 'minimal' ? 'w-[180px]' : 'w-[220px]';
  const buttonStyles = variant === 'minimal'
    ? 'px-3 py-1.5 text-sm rounded-md bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 hover:border-primary-500'
    : 'px-3 py-2 rounded-[8px] shadow-sm border border-gray-300 font-semibold hover:shadow-md hover:border-primary-500 transition-all duration-300';

  return (
    <div className={`flex items-center ${className}`}>
      <div className='relative inline-block text-left' ref={languageDropdownRef}>
        <button
          className={`flex cursor-pointer justify-between items-center min-w-[100px] gap-x-1.5 bg-white text-gray-900 ${buttonStyles}`}
          onClick={handleDropdownToggle}
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <ellipse cx="9" cy="9" rx="3" ry="7.5" stroke="#82C8E5" strokeWidth="1.5" />
                            <path d="M16.4971 8.7904C15.1454 9.90118 12.2962 10.6667 9 10.6667C5.70383 10.6667 2.85464 9.90118 1.50287 8.7904M16.4971 8.7904C16.3861 4.74518 13.072 1.5 9 1.5C4.92796 1.5 1.61387 4.74518 1.50287 8.7904M16.4971 8.7904C16.499 8.86004 16.5 8.92991 16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 8.92991 1.50096 8.86004 1.50287 8.7904" stroke="#82C8E5" strokeWidth="1.5" />
                        </svg>
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary-50 text-primary-600 text-xs font-medium">
              {language}
            </span>
            {/* {variant !== 'minimal' && (
              <span className="font-medium">Language</span>
            )} */}
          </div>
          <svg
            className={`size-4 text-gray-500 ${languageDropDown ? "rotate-180" : "rotate-0"} transform duration-300`}
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z'
              clipRule='evenodd'
            />
          </svg>
        </button>

        {languageDropDown && (
          <div
            ref={dropdownContentRef}
            className={`absolute right-0 mt-2 ${dropdownStyles} bg-white rounded-lg shadow-lg ring-1 ring-black/5 border border-gray-100 overflow-hidden z-[100]`}
          >
            {Object.entries({
              'English': { code: 'en', short: 'EN', flag: '🇬🇧' },
              'Spanish': { code: 'es', short: 'ES', flag: '🇪🇸' },
              'Portuguese': { code: 'pt', short: 'PT', flag: '🇵🇹' }
            }).map(([lang, info]) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`flex cursor-pointer items-center gap-3 w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors duration-150 ${selectedLang === info.code ? 'bg-primary-50/50 text-primary-700 font-medium' : 'text-gray-700'}`}
              >
                <span className="text-base">{info.flag}</span>
                <span className="flex-1">{lang}</span>
                <span className="text-xs font-medium text-gray-400">{info.short}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div id="google_translate_element" className="hidden" />
    </div>
  );
};

export default LanguageSwitcher;
