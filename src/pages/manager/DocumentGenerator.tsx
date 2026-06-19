import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import {
  FileText, FileSignature, GraduationCap, Files,
  Download, Eye, CheckCircle2, File
} from 'lucide-react';

type DocType = 'contract' | 'amendment' | 'training' | 'standard';

export default function DocumentGenerator() {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<DocType>('contract');
  const [generated, setGenerated] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('GestRH Solutions');
  const [selectedEmployee, setSelectedEmployee] = useState('Sophie Martin');
  const [contractType, setContractType] = useState('CDI');
  const [startDate, setStartDate] = useState('');
  const [salary, setSalary] = useState('');

  const docTypes = [
    { id: 'contract' as DocType, label: t('documentGen.contracts'), icon: <FileSignature className="w-5 h-5" />, color: 'from-blue-500 to-blue-600' },
    { id: 'amendment' as DocType, label: t('documentGen.amendments'), icon: <File className="w-5 h-5" />, color: 'from-purple-500 to-purple-600' },
    { id: 'training' as DocType, label: t('documentGen.trainingPlans'), icon: <GraduationCap className="w-5 h-5" />, color: 'from-green-500 to-green-600' },
    { id: 'standard' as DocType, label: t('documentGen.standardDocs'), icon: <Files className="w-5 h-5" />, color: 'from-orange-500 to-orange-600' },
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{t('documentGen.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Générez vos documents RH en quelques clics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {docTypes.map(type => (
          <button
            key={type.id}
            onClick={() => { setSelectedType(type.id); setGenerated(false); }}
            className={`p-4 rounded-xl text-center transition-all duration-300 border-2 ${
              selectedType === type.id
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 bg-white dark:bg-gray-800'
            }`}
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} text-white mb-3 shadow-md`}>
              {type.icon}
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">{type.label}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            {docTypes.find(t => t.id === selectedType)?.label}
          </h2>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Société</label>
              <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500">
                <option>GestRH Solutions</option>
                <option>TechInnov</option>
                <option>MediCare Plus</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employé</label>
              <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500">
                <option>Sophie Martin</option>
                <option>Lucas Bernard</option>
                <option>Emma Dubois</option>
                <option>Thomas Petit</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type de contrat</label>
                <select value={contractType} onChange={(e) => setContractType(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500">
                  <option>CDI</option>
                  <option>CDD</option>
                  <option>Stage</option>
                  <option>Alternance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date de début</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salaire (brut annuel)</label>
              <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="45000" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500" />
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full">
              {generated ? (
                <><CheckCircle2 className="w-4 h-4 mr-2" /> Document généré !</>
              ) : (
                <><FileText className="w-4 h-4 mr-2" /> {t('documentGen.generate')}</>
              )}
            </Button>
          </form>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Aperçu</h2>
            <div className="aspect-[3/4] bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {generated ? 'Document généré avec succès' : 'Générez un document pour voir l\'aperçu'}
              </p>
              {generated && (
                <div className="mt-4 flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" /> {t('documentGen.preview')}
                  </Button>
                  <Button variant="primary" size="sm">
                    <Download className="w-4 h-4 mr-1" /> {t('documentGen.download')}
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Documents récents</h2>
            <div className="space-y-3">
              {[
                { name: 'Contrat Sophie Martin', type: 'CDI', date: '15/01/2024' },
                { name: 'Avenant Lucas Bernard', type: 'Augmentation', date: '01/06/2024' },
                { name: 'Contrat Emma Dubois', type: 'CDI', date: '10/06/2024' },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{doc.type} - {doc.date}</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 hover:text-orange-500 cursor-pointer" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
