export interface NavLink    { label: string; path: string; }
export interface PracticeArea { id: string; icon: string; title: string; shortDesc: string; fullDesc: string; highlights: string[]; }
export interface TeamMember   { id: string; photo: string; name: string; title: string; role: string; experience: string; specialisation: string; tagline: string; highlights: string[]; quote: string; }
export interface Stat         { value: string; label: string; }
export interface Testimonial  { id: string; quote: string; author: string; matter: string; }
export interface OfficeHour   { day: string; time: string; }
export interface ContactForm  { name: string; email: string; phone: string; message: string; }
export interface Value        { icon: string; title: string; desc: string; }
export interface Milestone    { year: string; event: string; }
