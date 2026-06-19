import { useLanguage } from '../../context/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title="Changer la langue / Change language"
      aria-label="Changer la langue"
    >
      <Languages className="w-4 h-4" />
      <span>{lang === 'fr' ? 'FR' : 'EN'}</span>
    </button>
  );
}
