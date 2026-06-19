import { useLanguage } from '../context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import StatsCard from '../components/common/StatsCard';
import {
  Users, Building2, TrendingUp, UserCheck,
  ArrowRight, CheckCircle2, Shield, Brain,
  FileText, UserPlus, HeartHandshake
} from 'lucide-react';
import { stats } from '../data/mockData';

export default function Home() {
  const { t, ta } = useLanguage();
  const navigate = useNavigate();

  const services = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: t('services.admin.title'),
      desc: t('services.admin.desc'),
      features: ta('services.admin.features'),
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: t('services.talent.title'),
      desc: t('services.talent.desc'),
      features: ta('services.talent.features'),
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      title: t('services.qwl.title'),
      desc: t('services.qwl.desc'),
      features: ta('services.qwl.features'),
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const reasons = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: t('home.reason1'),
      desc: t('home.reason1Desc'),
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('home.reason2'),
      desc: t('home.reason2Desc'),
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('home.reason3'),
      desc: t('home.reason3Desc'),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-orange-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-orange-200/30 dark:bg-orange-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-200/20 dark:bg-blue-500/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-6">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                {t('hero.badge')}
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                {t('hero.title')}
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Link to="/services">
                  <Button variant="outline" size="lg">
                    {t('hero.ctaSecondary')}
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-2 mt-8 text-sm text-gray-500 dark:text-gray-400 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>{t('hero.indicator')}</span>
              </div>
            </div>

            <div className="flex-1 max-w-lg animate-fade-in">
              <div className="relative">
                <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-800/10 flex items-center justify-center p-8">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {[
                      { icon: <Users className="w-8 h-8" />, label: 'Collaborateurs', value: '1 000+' },
                      { icon: <Building2 className="w-8 h-8" />, label: 'Entreprises', value: '150+' },
                      { icon: <TrendingUp className="w-8 h-8" />, label: 'Satisfaction', value: '94%' },
                      { icon: <UserCheck className="w-8 h-8" />, label: 'Recrutements', value: '340+' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-2">
                          {item.icon}
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{item.value}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-orange-200 dark:border-orange-800 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="section-title">{t('stats.title')}</h2>
            <p className="section-subtitle">{t('stats.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              icon={<Users className="w-6 h-6" />}
              value={(stats.totalEmployees).toLocaleString('fr-FR')}
              label={t('stats.employees')}
              trend="+12% cette année"
            />
            <StatsCard
              icon={<Building2 className="w-6 h-6" />}
              value={stats.totalCompanies.toString()}
              label={t('stats.companies')}
              trend="+18 nouvelles entreprises"
            />
            <StatsCard
              icon={<TrendingUp className="w-6 h-6" />}
              value={`${stats.satisfactionRate}%`}
              label={t('stats.satisfaction')}
              trend="+2% vs 2023"
            />
            <StatsCard
              icon={<UserCheck className="w-6 h-6" />}
              value={stats.totalRecruitments.toString()}
              label={t('stats.recruitments')}
              trend="+45 ce trimestre"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="section-title">{t('services.title')}</h2>
            <p className="section-subtitle">{t('services.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6 shadow-lg`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{service.desc}</p>
                <ul className="space-y-2.5 text-left">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="section-title">{t('home.whyUs')}</h2>
            <p className="section-subtitle">{t('home.whySub')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-4">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{reason.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 animate-fade-in">{t('home.cta')}</h2>
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
