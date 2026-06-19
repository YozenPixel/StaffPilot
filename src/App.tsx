import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Dashboard = lazy(() => import('./pages/client/Dashboard'));
const Payroll = lazy(() => import('./pages/client/Payroll'));
const Recruitment = lazy(() => import('./pages/client/Recruitment'));
const DigitalVault = lazy(() => import('./pages/client/DigitalVault'));
const AbsenceManagement = lazy(() => import('./pages/client/AbsenceManagement'));
const MultiCompany = lazy(() => import('./pages/manager/MultiCompany'));
const DocumentGenerator = lazy(() => import('./pages/manager/DocumentGenerator'));
const Ticketing = lazy(() => import('./pages/manager/Ticketing'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/client/dashboard" element={<Dashboard />} />
                <Route path="/client/payroll" element={<Payroll />} />
                <Route path="/client/recruitment" element={<Recruitment />} />
                <Route path="/client/vault" element={<DigitalVault />} />
                <Route path="/client/absences" element={<AbsenceManagement />} />
                <Route path="/manager/multi-company" element={<MultiCompany />} />
                <Route path="/manager/documents" element={<DocumentGenerator />} />
                <Route path="/manager/ticketing" element={<Ticketing />} />
              </Route>
            </Routes>
          </Suspense>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
