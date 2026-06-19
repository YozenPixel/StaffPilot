import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/common/Card';
import StatsCard from '../../components/common/StatsCard';
import { employees, activities } from '../../data/mockData';
import {
  Users, FileText, AlertTriangle, Clock, Calendar,
  Activity, UserPlus, Bell, Eye, ChevronRight
} from 'lucide-react';

export default function Dashboard() {
  const { t } = useLanguage();

  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const probations = employees.filter(e => e.status === 'probation');
  const medicals = employees.filter(e => e.nextMedical);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Bienvenue sur votre espace client</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-green-700 dark:text-green-400">Système opérationnel</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatsCard
          icon={<Users className="w-5 h-5" />}
          value={activeEmployees.toString()}
          label={t('dashboard.employeesCount')}
        />
        <StatsCard
          icon={<FileText className="w-5 h-5" />}
          value="5"
          label={t('dashboard.contractsCount')}
        />
        <StatsCard
          icon={<AlertTriangle className="w-5 h-5" />}
          value="2"
          label={t('dashboard.alerts')}
        />
        <StatsCard
          icon={<Bell className="w-5 h-5" />}
          value={probations.length.toString()}
          label={t('dashboard.probation')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t('dashboard.recentActivity')}</h2>
            <button className="text-sm text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1">
              {t('dashboard.viewAll')} <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {activities.slice(0, 5).map(activity => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className={`p-2 rounded-lg shrink-0 ${
                  activity.type === 'onboarding' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                  activity.type === 'contract' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                  activity.type === 'leave' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                  activity.type === 'alert' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                  'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                }`}>
                  {activity.type === 'onboarding' ? <UserPlus className="w-4 h-4" /> :
                   activity.type === 'alert' ? <AlertTriangle className="w-4 h-4" /> :
                   activity.type === 'leave' ? <Calendar className="w-4 h-4" /> :
                   activity.type === 'payroll' ? <FileText className="w-4 h-4" /> :
                   <Activity className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{activity.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t('dashboard.probation')}</h2>
            </div>
            {probations.length > 0 ? (
              <div className="space-y-3">
                {probations.map(emp => (
                  <div key={emp.id} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{emp.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Fin: {emp.probationEnd}</p>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                      {emp.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Aucune période d'essai en cours</p>
            )}
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t('dashboard.medicalAppointments')}</h2>
            </div>
            {medicals.length > 0 ? (
              <div className="space-y-3">
                {medicals.map(emp => (
                  <div key={emp.id} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{emp.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Le {emp.nextMedical}</p>
                    </div>
                    <Eye className="w-4 h-4 text-blue-500" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Aucune visite médicale à venir</p>
            )}
          </Card>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Collaborateurs</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{employees.length} employés</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Nom</th>
                <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Poste</th>
                <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Département</th>
                <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Contrat</th>
                <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Statut</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">Aucun employé</td>
                </tr>
              ) : (
                employees.map(emp => (
                <tr key={emp.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{emp.name}</td>
                  <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{emp.position}</td>
                  <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{emp.department}</td>
                  <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">{emp.contractType}</td>
                  <td className="py-3 px-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      emp.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      emp.status === 'probation' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {emp.status === 'active' ? 'Actif' : emp.status === 'probation' ? 'Période d\'essai' : 'Inactif'}
                    </span>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
