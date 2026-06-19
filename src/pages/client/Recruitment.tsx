import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { applications, trainingRequests, mobilityRequests } from '../../data/mockData';
import {
  UserPlus, Briefcase, GraduationCap, ArrowRight,
  Mail, Phone
} from 'lucide-react';

type Tab = 'applications' | 'training' | 'mobility';

export default function Recruitment() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>('applications');

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      inProgress: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
      accepted: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      approved: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      rejected: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
      pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    };
    return styles[status] || 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
  };

  const tabs = [
    { id: 'applications' as Tab, label: t('recruitment.applications'), icon: <Briefcase className="w-4 h-4" />, count: applications.length },
    { id: 'training' as Tab, label: t('recruitment.trainingRequests'), icon: <GraduationCap className="w-4 h-4" />, count: trainingRequests.length },
    { id: 'mobility' as Tab, label: t('recruitment.mobilityRequests'), icon: <ArrowRight className="w-4 h-4" />, count: mobilityRequests.length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{t('recruitment.title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez vos recrutements et formations</p>
        </div>
        <Button variant="primary" size="md">
          <UserPlus className="w-4 h-4 mr-1" />
          {t('recruitment.newApplication')}
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map(tabItem => (
          <button
            key={tabItem.id}
            onClick={() => setTab(tabItem.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              tab === tabItem.id
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tabItem.icon}
            {tabItem.label}
            <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
              tab === tabItem.id ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
            }`}>
              {tabItem.count}
            </span>
          </button>
        ))}
      </div>

      {tab === 'applications' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {applications.map(app => (
            <Card key={app.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 font-semibold text-sm">
                    {app.candidateName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{app.candidateName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{app.position}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusBadge(app.status)}`}>
                  {app.status === 'new' ? t('recruitment.newApplication') : app.status === 'inProgress' ? t('recruitment.inProgress') : app.status === 'accepted' ? t('recruitment.accepted') : t('recruitment.rejected')}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{app.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{app.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Reçue le {app.date}</span>
                <div className="flex gap-2">
                  <button className="text-xs text-orange-600 dark:text-orange-400 hover:underline">Voir le profil</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'training' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Employé</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Formation</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Coût</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Statut</th>
                </tr>
              </thead>
              <tbody>
                {trainingRequests.map(tr => (
                  <tr key={tr.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{tr.employeeName}</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{tr.training}</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{tr.date}</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{tr.cost.toLocaleString('fr-FR')} €</td>
                    <td className="py-3 px-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusBadge(tr.status)}`}>
                        {tr.status === 'approved' ? t('recruitment.accepted') : tr.status === 'rejected' ? t('recruitment.rejected') : t('recruitment.inProgress')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'mobility' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Employé</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Poste actuel</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Poste souhaité</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Statut</th>
                </tr>
              </thead>
              <tbody>
                {mobilityRequests.map(mr => (
                  <tr key={mr.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{mr.employeeName}</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{mr.currentPosition}</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{mr.targetPosition}</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{mr.date}</td>
                    <td className="py-3 px-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusBadge(mr.status)}`}>
                        {mr.status === 'approved' ? t('recruitment.accepted') : mr.status === 'rejected' ? t('recruitment.rejected') : t('recruitment.inProgress')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
