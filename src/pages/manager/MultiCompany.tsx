import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/common/Card';
import { companies } from '../../data/mockData';
import {
  Building2, Search, Users, FileText,
  BarChart3, ArrowUpRight
} from 'lucide-react';

export default function MultiCompany() {
  const { t } = useLanguage();
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{t('multiCompany.title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez l'ensemble de vos sociétés clientes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Company List */}
        <div className="lg:col-span-1">
          <Card>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('multiCompany.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-1">
              {filteredCompanies.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">Aucune société trouvée</p>
              ) : (
                filteredCompanies.map(company => (
                <button
                  key={company.id}
                  onClick={() => setSelectedCompany(company)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCompany.id === company.id
                      ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span className="truncate">{company.name}</span>
                  </div>
                </button>
              )))}
            </div>
          </Card>
        </div>

        {/* Company Details */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedCompany.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">SIRET: {selectedCompany.siret}</p>
                  <p className="text-xs text-gray-400">{selectedCompany.sector}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Actif
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                <Users className="w-5 h-5 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCompany.employeesCount}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Employés</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                <FileText className="w-5 h-5 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCompany.activeContracts}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Contrats actifs</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                <BarChart3 className="w-5 h-5 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round((selectedCompany.activeContracts / selectedCompany.employeesCount) * 100)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Taux d'activité</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 dark:text-orange-400 hover:underline">
                Voir le tableau de bord complet
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {filteredCompanies.filter(c => c.id !== selectedCompany.id).slice(0, 3).map(company => (
              <button
                key={company.id}
                onClick={() => setSelectedCompany(company)}
                className="w-full text-left p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-orange-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{company.name}</h3>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{company.employeesCount} employés</span>
                  <span>{company.activeContracts} contrats</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
