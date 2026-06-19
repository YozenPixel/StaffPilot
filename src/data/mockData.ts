export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  startDate: string;
  contractType: string;
  salary: number;
  probationEnd?: string;
  nextMedical?: string;
  endDate?: string;
  status: 'active' | 'inactive' | 'probation';
}

export interface Activity {
  id: number;
  type: 'contract' | 'onboarding' | 'leave' | 'alert' | 'payroll';
  description: string;
  date: string;
  employeeName?: string;
}

export interface Payslip {
  id: number;
  employeeId: number;
  month: string;
  year: number;
  grossSalary: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'validated';
  url: string;
}

export interface Contract {
  id: number;
  employeeId: number;
  employeeName: string;
  type: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'ended';
  url: string;
}

export interface Application {
  id: number;
  candidateName: string;
  position: string;
  date: string;
  status: 'new' | 'inProgress' | 'accepted' | 'rejected';
  email: string;
  phone: string;
}

export interface LeaveRequest {
  id: number;
  employeeName: string;
  type: 'sickLeave' | 'paidLeave' | 'unpaidLeave';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  document?: string;
}

export interface TrainingRequest {
  id: number;
  employeeName: string;
  training: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  cost: number;
}

export interface MobilityRequest {
  id: number;
  employeeName: string;
  currentPosition: string;
  targetPosition: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Company {
  id: number;
  name: string;
  siret: string;
  employeesCount: number;
  activeContracts: number;
  sector: string;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  companyId: number;
  companyName: string;
  status: 'open' | 'inProgress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: number;
  ticketId: number;
  author: string;
  content: string;
  date: string;
  isInternal: boolean;
}

export interface Document {
  id: number;
  name: string;
  type: 'contract' | 'amendment' | 'training' | 'hr';
  employeeName: string;
  date: string;
  url: string;
}

export const employees: Employee[] = [
  { id: 1, name: 'Sophie Martin', position: 'Développeuse Full-Stack', department: 'IT', startDate: '2024-01-15', contractType: 'CDI', salary: 45000, probationEnd: '2024-07-15', nextMedical: '2024-12-15', status: 'active' },
  { id: 2, name: 'Lucas Bernard', position: 'Chef de Projet', department: 'Projets', startDate: '2024-03-01', contractType: 'CDI', salary: 52000, status: 'active' },
  { id: 3, name: 'Emma Dubois', position: 'Comptable', department: 'Finance', startDate: '2024-06-10', contractType: 'CDI', salary: 38000, probationEnd: '2024-09-10', status: 'probation' },
  { id: 4, name: 'Thomas Petit', position: 'Designer UX', department: 'Design', startDate: '2023-09-01', contractType: 'CDI', salary: 42000, nextMedical: '2024-11-20', status: 'active' },
  { id: 5, name: 'Julie Moreau', position: 'RH Manager', department: 'RH', startDate: '2022-11-01', contractType: 'CDI', salary: 48000, status: 'active' },
  { id: 6, name: 'Nicolas Leroy', position: 'Développeur Backend', department: 'IT', startDate: '2024-05-01', contractType: 'CDD', salary: 40000, endDate: '2025-05-01', status: 'active' },
  { id: 7, name: 'Camille Lefevre', position: 'Assistant Commercial', department: 'Commercial', startDate: '2024-07-01', contractType: 'CDI', salary: 35000, probationEnd: '2024-10-01', status: 'probation' },
  { id: 8, name: 'Antoine Girard', position: 'Directeur Technique', department: 'IT', startDate: '2021-01-01', contractType: 'CDI', salary: 75000, status: 'active' },
];

export const activities: Activity[] = [
  { id: 1, type: 'onboarding', description: 'Arrivée de Camille Lefevre - Assistante Commerciale', date: '2024-07-01', employeeName: 'Camille Lefevre' },
  { id: 2, type: 'contract', description: 'Fin de période d\'essai - Sophie Martin validée', date: '2024-07-15', employeeName: 'Sophie Martin' },
  { id: 3, type: 'leave', description: 'Demande de congés - Lucas Bernard (15-20 août)', date: '2024-07-12', employeeName: 'Lucas Bernard' },
  { id: 4, type: 'payroll', description: 'Bulletins de juin disponibles', date: '2024-07-05' },
  { id: 5, type: 'alert', description: 'Visite médicale - Thomas Petit le 20/11', date: '2024-07-10', employeeName: 'Thomas Petit' },
  { id: 6, type: 'contract', description: 'Prolongation CDD - Nicolas Leroy', date: '2024-07-08', employeeName: 'Nicolas Leroy' },
];

export const payslips: Payslip[] = [
  { id: 1, employeeId: 1, month: 'Juin', year: 2024, grossSalary: 4500, netSalary: 3480, status: 'validated', url: '#' },
  { id: 2, employeeId: 2, month: 'Juin', year: 2024, grossSalary: 5200, netSalary: 4020, status: 'validated', url: '#' },
  { id: 3, employeeId: 3, month: 'Juin', year: 2024, grossSalary: 3800, netSalary: 2940, status: 'processed', url: '#' },
  { id: 4, employeeId: 1, month: 'Mai', year: 2024, grossSalary: 4500, netSalary: 3480, status: 'validated', url: '#' },
  { id: 5, employeeId: 4, month: 'Juin', year: 2024, grossSalary: 4200, netSalary: 3250, status: 'validated', url: '#' },
  { id: 6, employeeId: 5, month: 'Juin', year: 2024, grossSalary: 4800, netSalary: 3710, status: 'pending', url: '#' },
];

export const contracts: Contract[] = [
  { id: 1, employeeId: 1, employeeName: 'Sophie Martin', type: 'CDI', startDate: '2024-01-15', status: 'active', url: '#' },
  { id: 2, employeeId: 2, employeeName: 'Lucas Bernard', type: 'CDI', startDate: '2024-03-01', status: 'active', url: '#' },
  { id: 3, employeeId: 3, employeeName: 'Emma Dubois', type: 'CDI', startDate: '2024-06-10', status: 'active', url: '#' },
  { id: 4, employeeId: 6, employeeName: 'Nicolas Leroy', type: 'CDD', startDate: '2024-05-01', endDate: '2025-05-01', status: 'active', url: '#' },
  { id: 5, employeeId: 7, employeeName: 'Camille Lefevre', type: 'CDI', startDate: '2024-07-01', status: 'active', url: '#' },
];

export const applications: Application[] = [
  { id: 1, candidateName: 'Marie Lambert', position: 'Développeuse Frontend', date: '2024-07-14', status: 'new', email: 'marie.lambert@email.com', phone: '06 12 34 56 78' },
  { id: 2, candidateName: 'Alexandre Dupont', position: 'Chef de Projet', date: '2024-07-12', status: 'inProgress', email: 'alex.dupont@email.com', phone: '06 23 45 67 89' },
  { id: 3, candidateName: 'Sarah Cohen', position: 'Designer UX', date: '2024-07-10', status: 'accepted', email: 'sarah.cohen@email.com', phone: '06 34 56 78 90' },
  { id: 4, candidateName: 'Pierre Morel', position: 'Développeur Backend', date: '2024-07-08', status: 'rejected', email: 'pierre.morel@email.com', phone: '06 45 67 89 01' },
  { id: 5, candidateName: 'Laura Vincent', position: 'Comptable', date: '2024-07-15', status: 'new', email: 'laura.vincent@email.com', phone: '06 56 78 90 12' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 1, employeeName: 'Lucas Bernard', type: 'paidLeave', startDate: '2024-08-15', endDate: '2024-08-20', status: 'pending', reason: 'Vacances d\'été' },
  { id: 2, employeeName: 'Sophie Martin', type: 'paidLeave', startDate: '2024-09-01', endDate: '2024-09-05', status: 'approved', reason: 'Congés personnels' },
  { id: 3, employeeName: 'Emma Dubois', type: 'sickLeave', startDate: '2024-07-10', endDate: '2024-07-12', status: 'approved', reason: 'Arrêt maladie', document: 'certificat.pdf' },
  { id: 4, employeeName: 'Thomas Petit', type: 'unpaidLeave', startDate: '2024-08-01', endDate: '2024-08-15', status: 'pending', reason: 'Raisons personnelles' },
  { id: 5, employeeName: 'Julie Moreau', type: 'paidLeave', startDate: '2024-07-22', endDate: '2024-07-26', status: 'rejected', reason: 'Demande refusée' },
];

export const trainingRequests: TrainingRequest[] = [
  { id: 1, employeeName: 'Sophie Martin', training: 'Formation React Avancé', date: '2024-08-01', status: 'approved', cost: 1500 },
  { id: 2, employeeName: 'Thomas Petit', training: 'Certification UX', date: '2024-08-15', status: 'pending', cost: 2500 },
  { id: 3, employeeName: 'Nicolas Leroy', training: 'Formation DevOps', date: '2024-07-20', status: 'rejected', cost: 3000 },
  { id: 4, employeeName: 'Camille Lefevre', training: 'Formation commerciale', date: '2024-09-01', status: 'pending', cost: 1200 },
];

export const mobilityRequests: MobilityRequest[] = [
  { id: 1, employeeName: 'Lucas Bernard', currentPosition: 'Chef de Projet', targetPosition: 'Directeur de Projet', date: '2024-07-01', status: 'pending' },
  { id: 2, employeeName: 'Julie Moreau', currentPosition: 'RH Manager', targetPosition: 'Directrice RH', date: '2024-06-15', status: 'approved' },
];

export const documents: Document[] = [
  { id: 1, name: 'Contrat Sophie Martin', type: 'contract', employeeName: 'Sophie Martin', date: '2024-01-15', url: '#' },
  { id: 2, name: 'Avenant Lucas Bernard', type: 'amendment', employeeName: 'Lucas Bernard', date: '2024-06-01', url: '#' },
  { id: 3, name: 'Plan formation 2024', type: 'training', employeeName: '-', date: '2024-01-10', url: '#' },
  { id: 4, name: 'Contrat Emma Dubois', type: 'contract', employeeName: 'Emma Dubois', date: '2024-06-10', url: '#' },
  { id: 5, name: 'Règlement intérieur', type: 'hr', employeeName: '-', date: '2024-01-01', url: '#' },
  { id: 6, name: 'Contrat Nicolas Leroy', type: 'contract', employeeName: 'Nicolas Leroy', date: '2024-05-01', url: '#' },
];

export const companies: Company[] = [
  { id: 1, name: 'GestRH Solutions', siret: '123 456 789 00012', employeesCount: 45, activeContracts: 38, sector: 'Services RH' },
  { id: 2, name: 'TechInnov', siret: '987 654 321 00045', employeesCount: 120, activeContracts: 115, sector: 'Technologies' },
  { id: 3, name: 'MediCare Plus', siret: '456 789 123 00078', employeesCount: 230, activeContracts: 220, sector: 'Santé' },
  { id: 4, name: 'EcoBuild', siret: '321 654 987 00021', employeesCount: 67, activeContracts: 62, sector: 'Construction' },
  { id: 5, name: 'FinCorp', siret: '654 321 987 00054', employeesCount: 89, activeContracts: 85, sector: 'Finance' },
];

export const tickets: Ticket[] = [
  {
    id: 1, title: 'Problème d\'accès à la plateforme', description: 'Un utilisateur ne peut pas se connecter à son espace', companyId: 1, companyName: 'GestRH Solutions',
    status: 'open', priority: 'high', createdAt: '2024-07-14', updatedAt: '2024-07-14',
    messages: [
      { id: 1, ticketId: 1, author: 'Support', content: 'Bonjour, pouvez-vous nous donner plus de détails sur le problème ?', date: '2024-07-14', isInternal: false },
      { id: 2, ticketId: 1, author: 'Client', content: 'Le message d\'erreur est "Accès refusé"', date: '2024-07-14', isInternal: false },
    ],
  },
  {
    id: 2, title: 'Mise à jour des bulletins de paie', description: 'Les bulletins de juillet ne sont pas encore disponibles', companyId: 2, companyName: 'TechInnov',
    status: 'inProgress', priority: 'medium', createdAt: '2024-07-12', updatedAt: '2024-07-13',
    messages: [
      { id: 3, ticketId: 2, author: 'Client', content: 'Bonjour, quand les bulletins seront-ils disponibles ?', date: '2024-07-12', isInternal: false },
      { id: 4, ticketId: 2, author: 'Support', content: 'Ils seront disponibles d\'ici 48h, merci pour votre patience.', date: '2024-07-13', isInternal: false },
    ],
  },
  {
    id: 3, title: 'Ajout d\'un nouveau collaborateur', description: 'Création du compte pour un nouvel employé', companyId: 3, companyName: 'MediCare Plus',
    status: 'resolved', priority: 'low', createdAt: '2024-07-10', updatedAt: '2024-07-11',
    messages: [
      { id: 5, ticketId: 3, author: 'Client', content: 'Merci de créer un compte pour Marie Dupont.', date: '2024-07-10', isInternal: false },
      { id: 6, ticketId: 3, author: 'Support', content: 'Le compte a été créé avec succès.', date: '2024-07-11', isInternal: false },
    ],
  },
  {
    id: 4, title: 'Bug dans le module de paie', description: 'Erreur de calcul pour les heures supplémentaires', companyId: 4, companyName: 'EcoBuild',
    status: 'open', priority: 'critical', createdAt: '2024-07-14', updatedAt: '2024-07-14',
    messages: [
      { id: 7, ticketId: 4, author: 'Client', content: 'Les heures sup ne sont pas correctement calculées.', date: '2024-07-14', isInternal: false },
    ],
  },
  {
    id: 5, title: 'Demande de formation', description: 'Inscription à la formation Excel avancé', companyId: 5, companyName: 'FinCorp',
    status: 'closed', priority: 'low', createdAt: '2024-07-08', updatedAt: '2024-07-09',
    messages: [
      { id: 8, ticketId: 5, author: 'Client', content: 'Nous souhaitons inscrire 5 personnes.', date: '2024-07-08', isInternal: false },
      { id: 9, ticketId: 5, author: 'Support', content: 'Inscription confirmée pour le 15/08.', date: '2024-07-09', isInternal: false },
    ],
  },
];

export const stats = {
  totalEmployees: 1047,
  totalCompanies: 156,
  satisfactionRate: 94,
  totalRecruitments: 342,
};
