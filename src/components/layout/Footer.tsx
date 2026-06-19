import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Building2, Mail, Phone, MapPin, Globe, MessageCircle, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@')) return;
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-orange-400 mb-4">
              <Building2 className="w-6 h-6" />
              <span>GestRH</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Votre partenaire de confiance pour une gestion RH simplifiée et efficace.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-orange-400 transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/services" className="hover:text-orange-400 transition-colors">{t('nav.services')}</Link></li>
              <li><Link to="/client/dashboard" className="hover:text-orange-400 transition-colors">{t('nav.clientArea')}</Link></li>
              <li><Link to="/manager/multi-company" className="hover:text-orange-400 transition-colors">{t('nav.managerArea')}</Link></li>
              <li><Link to="/contact" className="hover:text-orange-400 transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                123 Avenue des RH, 75001 Paris
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400" />
                +33 1 23 45 67 89
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400" />
                contact@gestrh.fr
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.newsletter')}</h3>
            {newsletterSubmitted ? (
              <div className="flex items-center gap-2 text-sm text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                Inscrit avec succès !
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t('footer.newsletterPlaceholder')}
                  className="flex-1 px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-l-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <button type="submit" className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-r-lg transition-colors">
                  {t('footer.subscribe')}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; 2024 GestRH. {t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <Link to="#" className="hover:text-gray-300 transition-colors">{t('footer.legal')}</Link>
            <Link to="#" className="hover:text-gray-300 transition-colors">{t('footer.privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
