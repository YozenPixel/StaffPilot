import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Menu, X, Building2 } from 'lucide-react';
import LanguageSelector from '../common/LanguageSelector';
import ThemeToggle from '../common/ThemeToggle';
import Button from '../common/Button';

export default function Navbar() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/client/dashboard', label: t('nav.clientArea') },
    { to: '/manager/multi-company', label: t('nav.managerArea') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-orange-600 dark:text-orange-400">
            <Building2 className="w-7 h-7" />
            <span>GestRH</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <Button variant="primary" size="md" onClick={() => navigate('/contact')}>
              {t('nav.demo')}
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div ref={mobileMenuRef} className="lg:hidden border-t border-gray-200 dark:border-gray-700 animate-slide-down" role="dialog" aria-modal="true" aria-label="Navigation mobile">
          <div className="px-4 py-4 space-y-2">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <LanguageSelector />
              <ThemeToggle />
              <Button variant="primary" size="sm" className="ml-auto" onClick={() => navigate('/contact')}>
                {t('nav.demo')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
