import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { payslips, contracts, documents } from '../../data/mockData';
import { getEmployeeName } from '../../utils/employeeLookup';
import {
  FileText, Download, Eye, Upload, Shield,
  File, FileSignature, GraduationCap, FolderOpen
} from 'lucide-react';

type DocTab = 'payslips' | 'contracts' | 'documents';

export default function DigitalVault() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<DocTab>('payslips');

  const tabs = [
    { id: 'payslips' as DocTab, label: t('vault.payslips'), icon: <FileText className="w-4 h-4" />, count: payslips.length },
    { id: 'contracts' as DocTab, label: t('vault.contracts'), icon: <FileSignature className="w-4 h-4" />, count: contracts.length },
    { id: 'documents' as DocTab, label: t('vault.documents'), icon: <FolderOpen className="w-4 h-4" />, count: documents.length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-6 h-6 text-orange-500" />
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{t('vault.title')}</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">Accédez à vos documents RH en toute sécurité</p>
        </div>
        <Button variant="primary" size="md">
          <Upload className="w-4 h-4 mr-1" />
          {t('vault.upload')}
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
              tab === tabItem.id ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-600'
            }`}>
              {tabItem.count}
            </span>
          </button>
        ))}
      </div>

      {tab === 'payslips' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Période</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Employé</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Salaire brut</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Salaire net</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Statut</th>
                  <th scope="col" className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payslips.map(ps => (
                  <tr key={ps.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{ps.month} {ps.year}</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">
                      {getEmployeeName(ps.employeeId)}
                    </td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{ps.grossSalary.toLocaleString('fr-FR')} €</td>
                    <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{ps.netSalary.toLocaleString('fr-FR')} €</td>
                    <td className="py-3 px-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        ps.status === 'validated' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        ps.status === 'processed' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      }`}>
                        {ps.status === 'validated' ? 'Validé' : ps.status === 'processed' ? 'Traité' : 'En attente'}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'contracts' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {contracts.map(contract => (
            <Card key={contract.id}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                  <FileSignature className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{contract.employeeName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{contract.type}</p>
                  <p className="text-xs text-gray-400 mt-1">Début: {contract.startDate}{contract.endDate ? ` - Fin: ${contract.endDate}` : ''}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    contract.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {contract.status === 'active' ? 'Actif' : 'Terminé'}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <button className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  <Eye className="w-4 h-4" /> {t('vault.view')}
                </button>
                <button className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  <Download className="w-4 h-4" /> {t('vault.download')}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'documents' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {documents.map(doc => (
            <Card key={doc.id}>
              <div className="flex flex-col items-center text-center">
                <div className={`p-4 rounded-xl mb-4 ${
                  doc.type === 'contract' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                  doc.type === 'amendment' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                  doc.type === 'training' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                  'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                }`}>
                  {doc.type === 'contract' ? <FileSignature className="w-8 h-8" /> :
                   doc.type === 'amendment' ? <File className="w-8 h-8" /> :
                   doc.type === 'training' ? <GraduationCap className="w-8 h-8" /> :
                   <FileText className="w-8 h-8" />}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{doc.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{doc.date}</p>
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-1 text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline">
                    <Download className="w-3 h-3" /> {t('vault.download')}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
