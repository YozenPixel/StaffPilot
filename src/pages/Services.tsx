import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { CheckCircle2, ArrowRight, FileText, UserPlus, HeartHandshake, Users, Building2, TrendingUp, UserCheck } from 'lucide-react';
import StatsCard from '../components/common/StatsCard';
import { stats } from '../data/mockData';

export default function Services() {
  const { t, ta } = useLanguage();
  const navigate = useNavigate();

  const services = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: t('services.admin.title'),
      desc: t('services.admin.desc'),
      features: ta('services.admin.features'),
      gradient: 'from-orange-500 to-amber-500',
      details: [
        'Rédaction et gestion des contrats de travail',
        'Suivi administratif complet du personnel',
        'Calcul et édition des bulletins de paie',
        'Déclarations sociales et fiscales',
        'Automatisation des processus RH',
        'Gestion des temps et des absences',
      ],
    },
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: t('services.talent.title'),
      desc: t('services.talent.desc'),
      features: ta('services.talent.features'),
      gradient: 'from-blue-500 to-indigo-500',
      details: [
        'Diffusion d\'offres d\'emploi multi-canaux',
        'Sourcing et chasse de talents',
        'Processus de recrutement structuré',
        'Plans de développement des compétences',
        'Gestion des carrières et promotions',
        'Mobilité interne et reconversion',
      ],
    },
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      title: t('services.qwl.title'),
      desc: t('services.qwl.desc'),
      features: ta('services.qwl.features'),
      gradient: 'from-green-500 to-emerald-500',
      details: [
        'Évaluation des risques professionnels',
        'Suivi de la santé au travail',
        'Actions de prévention et sensibilisation',
        'Aménagement des postes de travail',
        'Enquêtes de satisfaction collaborateurs',
        'Programmes de bien-être en entreprise',
      ],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 via-orange-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">{t('services.title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('services.subtitle')}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard icon={<Users className="w-6 h-6" />} value={(stats.totalEmployees).toLocaleString('fr-FR')} label={t('stats.employees')} />
            <StatsCard icon={<Building2 className="w-6 h-6" />} value={stats.totalCompanies.toString()} label={t('stats.companies')} />
            <StatsCard icon={<TrendingUp className="w-6 h-6" />} value={`${stats.satisfactionRate}%`} label={t('stats.satisfaction')} />
            <StatsCard icon={<UserCheck className="w-6 h-6" />} value={stats.totalRecruitments.toString()} label={t('stats.recruitments')} />
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 animate-fade-in">
              <div className={`flex-1 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} text-white mb-6 shadow-lg`}>
                  {service.icon}
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{service.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                      {detail}
                    </div>
                  ))}
                </div>
                <Button variant="primary" onClick={() => navigate('/contact')}>
                  {t('hero.cta')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className={`flex-1 w-full max-w-md ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${service.gradient} opacity-10 dark:opacity-20 flex items-center justify-center p-12`}>
                  <div className="w-full h-full rounded-xl bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} text-white mb-4`}>
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t('home.cta')}</h2>
          <p className="text-orange-100 text-lg mb-8">{t('home.ctaDesc')}</p>
          <Button variant="secondary" size="lg" className="bg-white text-orange-600 hover:bg-orange-50 border-white" onClick={() => navigate('/contact')}>
            {t('hero.cta')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
