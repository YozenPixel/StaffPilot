import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { payslips } from '../../data/mockData';
import { getEmployeeName } from '../../utils/employeeLookup';
import {
  Download, Plus, CheckCircle2, Clock,
  AlertCircle, DollarSign, Percent
} from 'lucide-react';

export default function Payroll() {
  const { t } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState('Juin 2024');

  const statusIcon = (status: string) => {
    switch (status) {
      case 'validated': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'processed': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case 'validated': return t('payroll.validated');
      case 'processed': return t('payroll.processed');
      default: return t('payroll.pending');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{t('payroll.title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez la paie de vos collaborateurs</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500"
          >
            <option>Juin 2024</option>
            <option>Mai 2024</option>
            <option>Avril 2024</option>
          </select>
          <Button variant="primary" size="md">
            <Plus className="w-4 h-4 mr-1" />
            Nouvelle saisie
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Variables saisies</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ce mois</div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Percent className="w-5 h-5" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Primes saisies</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">3</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ce mois</div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Heures sup.</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">47h</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ce mois</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t('payroll.leaveManagement')}</h2>
          <div className="space-y-3">
            {[
              { type: 'Congés payés', used: 12, total: 25, color: 'bg-blue-500' },
              { type: 'RTT', used: 3, total: 10, color: 'bg-green-500' },
              { type: 'Congés sans solde', used: 1, total: 5, color: 'bg-yellow-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{item.type}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.used}/{item.total} jours</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${(item.used / item.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t('payroll.overtimeManagement')}</h2>
          <div className="space-y-3">
            {[
              { emp: 'Sophie Martin', hours: 8, type: 'HE25' },
              { emp: 'Lucas Bernard', hours: 12, type: 'HE50' },
              { emp: 'Nicolas Leroy', hours: 6, type: 'HE25' },
              { emp: 'Thomas Petit', hours: 4, type: 'HE25' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.emp}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.type}</p>
                </div>
                <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">{item.hours}h</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t('payroll.downloadPayslips')}</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{payslips.length} bulletins</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Employé</th>
                <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">{t('payroll.month')}</th>
                <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Brut</th>
                <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Net</th>
                <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">{t('payroll.status')}</th>
                <th scope="col" className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {payslips.map(ps => (
                <tr key={ps.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">
                    {getEmployeeName(ps.employeeId)}
                  </td>
                  <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{ps.month} {ps.year}</td>
                  <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{ps.grossSalary.toLocaleString('fr-FR')} €</td>
                  <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{ps.netSalary.toLocaleString('fr-FR')} €</td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-opacity-20">
                      {statusIcon(ps.status)}
                      {statusLabel(ps.status)}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button className="inline-flex items-center gap-1 text-sm text-orange-600 dark:text-orange-400 hover:underline">
                      <Download className="w-3 h-3" />
                      {t('payroll.downloadPayslips')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
