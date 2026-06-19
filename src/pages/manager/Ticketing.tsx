import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { tickets as initialTickets } from '../../data/mockData';
import type { Ticket, TicketMessage } from '../../data/mockData';
import {
  MessageSquare, Plus, Send,
} from 'lucide-react';

const priorityColors: Record<string, string> = {
  low: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
  medium: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  high: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

const statusColors: Record<string, string> = {
  open: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  inProgress: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  resolved: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  closed: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
};

export default function Ticketing() {
  const { t } = useLanguage();
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(tickets[0]);
  const [newMessage, setNewMessage] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketCompany, setNewTicketCompany] = useState('GestRH Solutions');
  const [newTicketPriority, setNewTicketPriority] = useState('medium');
  const [newTicketDescription, setNewTicketDescription] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedTicket) return;
    const msg: TicketMessage = {
      id: Date.now(),
      ticketId: selectedTicket.id,
      author: 'Support',
      content: newMessage.trim(),
      date: new Date().toISOString().split('T')[0],
      isInternal: false,
    };
    setTickets(prev => prev.map(t =>
      t.id === selectedTicket.id
        ? { ...t, messages: [...t.messages, msg], updatedAt: msg.date }
        : t
    ));
    setSelectedTicket(prev => prev ? { ...prev, messages: [...prev.messages, msg], updatedAt: msg.date } : prev);
    setNewMessage('');
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: Ticket = {
      id: Date.now(),
      title: newTicketTitle,
      description: newTicketDescription,
      companyId: 0,
      companyName: newTicketCompany,
      status: 'open',
      priority: newTicketPriority as Ticket['priority'],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      messages: [],
    };
    setTickets(prev => [newTicket, ...prev]);
    setSelectedTicket(newTicket);
    setShowCreateForm(false);
    setNewTicketTitle('');
    setNewTicketDescription('');
    setNewTicketCompany('GestRH Solutions');
    setNewTicketPriority('medium');
  };

  const getStatusDot = (status: string) => {
    const colors: Record<string, string> = {
      open: 'bg-blue-500',
      inProgress: 'bg-yellow-500',
      resolved: 'bg-green-500',
      closed: 'bg-gray-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{t('ticketing.title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez les demandes et le support client</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="w-4 h-4 mr-1" />
          {t('ticketing.create')}
        </Button>
      </div>

      {showCreateForm && (
        <Card className="mb-6 animate-slide-up">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Nouveau ticket</h3>
          <form onSubmit={handleCreateTicket} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre</label>
              <input type="text" value={newTicketTitle} onChange={(e) => setNewTicketTitle(e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Société</label>
                <select value={newTicketCompany} onChange={(e) => setNewTicketCompany(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500">
                  <option>GestRH Solutions</option>
                  <option>TechInnov</option>
                  <option>MediCare Plus</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('ticketing.priority')}</label>
                <select value={newTicketPriority} onChange={(e) => setNewTicketPriority(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500">
                  <option value="low">{t('ticketing.low')}</option>
                  <option value="medium">{t('ticketing.medium')}</option>
                  <option value="high">{t('ticketing.high')}</option>
                  <option value="critical">{t('ticketing.critical')}</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea value={newTicketDescription} onChange={(e) => setNewTicketDescription(e.target.value)} rows={4} required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 resize-none" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="md" onClick={() => setShowCreateForm(false)}>Annuler</Button>
              <Button type="submit" variant="primary" size="md">Créer le ticket</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-3">
          {tickets.map(ticket => (
            <button
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className={`w-full text-left p-4 rounded-xl transition-all border ${
                selectedTicket?.id === ticket.id
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate flex-1">{ticket.title}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ml-2 ${priorityColors[ticket.priority]}`}>
                  {ticket.priority === 'low' ? t('ticketing.low') : ticket.priority === 'medium' ? t('ticketing.medium') : ticket.priority === 'high' ? t('ticketing.high') : t('ticketing.critical')}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">{ticket.companyName}</p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs">
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(ticket.status)}`} />
                  {ticket.status === 'open' ? t('ticketing.open') : ticket.status === 'inProgress' ? t('ticketing.inProgress') : ticket.status === 'resolved' ? t('ticketing.resolved') : t('ticketing.closed')}
                </span>
                <span className="text-xs text-gray-400">{ticket.createdAt}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedTicket ? (
            <Card>
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">{selectedTicket.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedTicket.companyName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[selectedTicket.status]}`}>
                    {selectedTicket.status === 'open' ? t('ticketing.open') : selectedTicket.status === 'inProgress' ? t('ticketing.inProgress') : selectedTicket.status === 'resolved' ? t('ticketing.resolved') : t('ticketing.closed')}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors[selectedTicket.priority]}`}>
                    {selectedTicket.priority === 'low' ? t('ticketing.low') : selectedTicket.priority === 'medium' ? t('ticketing.medium') : selectedTicket.priority === 'high' ? t('ticketing.high') : t('ticketing.critical')}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{selectedTicket.description}</p>

              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  {t('ticketing.history')}
                </h3>
                {selectedTicket.messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.author === 'Support' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-xl ${
                      msg.author === 'Support'
                        ? 'bg-orange-50 dark:bg-orange-900/20 text-gray-900 dark:text-white'
                        : 'bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold">{msg.author}</span>
                        <span className="text-xs text-gray-400">{msg.date}</span>
                      </div>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Votre message..."
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button type="submit" className="p-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">Sélectionnez un ticket pour voir les détails</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
