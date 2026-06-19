import { employees } from '../data/mockData';

const employeeNames: Record<number, string> = Object.fromEntries(
  employees.map(e => [e.id, e.name])
);

export function getEmployeeName(employeeId: number): string {
  return employeeNames[employeeId] ?? 'Employé inconnu';
}
