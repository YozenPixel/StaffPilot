import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { leaveRequests as initialLeaveRequests } from '../../data/mockData';
import type { LeaveRequest } from '../../data/mockData';
import {
  Calendar, FileText, CheckCircle2, XCircle,
  Clock, Plus, AlertCircle, Ban
} from 'lucide-react';

type AbsenceTab = 'requests' | 'history';

export default function AbsenceManagement() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<AbsenceTab>('requests');
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);

  const handleApprove = (id: number) => {
    setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
  };

  const handleReject = (id: number) => {
    setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case 'sickLeave': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'paidLeave': return <Calendar className="w-4 h-4 text-green-500" />;
      case 'unpaidLeave': return <Ban className="w-4 h-4 text-yellow-500" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const typeLabel = (type: string) => {
    switch (type) {
      case 'sickLeave': return t('absences.sickLeave');
      case 'paidLeave': return t('absences.paidLeave');
      case 'unpaidLeave': return t('absences.unpaidLeave');
      default: return type;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{t('absences.title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez les absences et congés de vos collaborateurs</p>
        </div>
        <Button variant="primary" size="md">
          <Plus className="w-4 h-4 mr-1" />
          Nouvelle demande
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{t('absences.approved')}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{leaveRequests.filter(l => l.status === 'approved').length}</div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{t('absences.pending')}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{leaveRequests.filter(l => l.status === 'pending').length}</div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
              <XCircle className="w-5 h-5" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{t('absences.rejected')}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{leaveRequests.filter(l => l.status === 'rejected').length}</div>
        </Card>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setTab('requests')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tab === 'requests'
              ? 'bg-orange-500 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          {t('absences.requests')}
        </button>
        <button
          onClick={() => setTab('history')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tab === 'history'
              ? 'bg-orange-500 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <Clock className="w-4 h-4" />
          {t('absences.history')}
        </button>
      </div>

      {tab === 'requests' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {leaveRequests.filter(l => l.status === 'pending').map(request => (
            <Card key={request.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                    {typeIcon(request.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{request.employeeName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{typeLabel(request.type)}</p>
                  </div>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                  {t('absences.pending')}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Du {request.startDate} au {request.endDate}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Motif: {request.reason}
              </p>
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <Button variant="secondary" size="sm" onClick={() => handleApprove(request.id)}>
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  {t('absences.approve')}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleReject(request.id)}>
                  <XCircle className="w-4 h-4 mr-1" />
                  {t('absences.reject')}
                </Button>
                {request.document && (
                  <button className="ml-auto text-xs text-orange-600 dark:text-orange-400 hover:underline">
                    <FileText className="w-3 h-3 inline mr-1" />
                    {t('absences.submitDocument')}
                  </button>
                )}
              </div>
            </Card>
          ))}
          {leaveRequests.filter(l => l.status === 'pending').length === 0 && (
            <Card className="lg:col-span-2">
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">Aucune demande en attente</p>
            </Card>
          )}
        </div>
      )}

      {tab === 'history' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Employé</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Type</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Début</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Fin</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Motif</th>
                  <th scope="col" className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Statut</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map(request => (
                  <tr key={request.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{request.employeeName}</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        {typeIcon(request.type)}
                        {typeLabel(request.type)}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{request.startDate}</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{request.endDate}</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400 max-w-[150px] truncate">{request.reason}</td>
                    <td className="py-3 px-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        request.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        request.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      }`}>
                        {request.status === 'approved' ? t('absences.approved') : request.status === 'rejected' ? t('absences.rejected') : t('absences.pending')}
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
