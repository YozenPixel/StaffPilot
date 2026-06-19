import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  message?: string;
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.firstName.trim()) errs.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) errs.lastName = 'Le nom est requis';
    if (!formData.email.trim()) {
      errs.email = 'L\'email est requis';
    } else if (!formData.email.includes('@')) {
      errs.email = 'Email invalide';
    }
    if (!formData.message.trim()) {
      errs.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Minimum 10 caractères';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' });
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-gray-50 via-orange-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">Contact</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Une question ? Un projet ? Notre équipe est là pour vous accompagner.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6 animate-fade-in">
              <Card>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Adresse</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">123 Avenue des RH<br />75001 Paris, France</p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Téléphone</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">+33 1 23 45 67 89</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Lun-Ven: 9h-18h</p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">contact@gestrh.fr</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">support@gestrh.fr</p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Horaires</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Lundi - Vendredi: 9h00 - 18h00</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Samedi - Dimanche: Fermé</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="animate-slide-up">
              <form onSubmit={handleSubmit} className="space-y-5">
                  {submitted && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Envoyez-nous un message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prénom</label>
                      <input id="firstName" type="text" value={formData.firstName} onChange={handleChange('firstName')} className={`w-full px-4 py-2.5 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`} />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                      <input id="lastName" type="text" value={formData.lastName} onChange={handleChange('lastName')} className={`w-full px-4 py-2.5 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`} />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input id="email" type="email" value={formData.email} onChange={handleChange('email')} className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Société</label>
                    <input id="company" type="text" value={formData.company} onChange={handleChange('company')} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea id="message" rows={5} value={formData.message} onChange={handleChange('message')} className={`w-full px-4 py-2.5 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-none`} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> Envoi en cours...</>
                    ) : (
                      <><Send className="w-4 h-4 mr-2" /> Envoyer le message</>
                    )}
                  </Button>
                </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
