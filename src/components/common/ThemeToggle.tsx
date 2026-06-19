import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
      aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
    >
      {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      <span className="hidden sm:inline">{theme === 'light' ? 'Sombre' : 'Clair'}</span>
    </button>
  );
}
