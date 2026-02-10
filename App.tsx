import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, Phone, Target, Users, ShieldCheck, 
  GraduationCap, Plane, Shield, BarChart, Check, CheckCircle2, 
  Mail, MapPin, Send, MessageSquare, Bot, Twitter, Linkedin, 
  Calendar 
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- TYPES ---
interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  points: string[];
}

interface ServiceItem {
  title: string;
  description: string[];
  icon: 'Plane' | 'Shield' | 'BarChart';
}

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

// --- CONSTANTS & DATA ---
const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/shaonpromx', icon: <Linkedin size={20} /> },
  { platform: 'Twitter', url: 'https://x.com/ShaonM37x', icon: <Twitter size={20} /> },
  { platform: 'Telegram', url: 'https://t.me/ShaonMSX', icon: <Send size={20} /> },
  { platform: 'Email', url: 'mailto:shaonpromx@gmail.com', icon: <Mail size={20} /> },
  { platform: 'WhatsApp', url: 'https://wa.me/8801518693126', icon: <Phone size={20} /> },
];

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    title: 'Digital Engagement Specialist',
    company: 'The Pulselorian',
    period: '2022 – 2024',
    points: [
      'Primary point of contact for customer inquiries and complex support ticket resolution.',
      'Maintained 100% data accuracy across digital records and internal platforms.',
      'Strategically assisted sales teams by identifying potential leads through community sentiment analysis.'
    ]
  },
  {
    title: 'Operations & Community Lead',
    company: 'Tech & Digital Services',
    period: '2020 – 2022',
    points: [
      'Managed operations for communities with over 10,000+ active members.',
      'Implemented real-time fraud detection systems and platform policy enforcement protocols.',
      'Streamlined onboarding processes, reducing user setup time significantly.',
      'Produced advanced data reports using MS Excel and Google Sheets to guide executive decisions.'
    ]
  }
];

const SERVICES_DATA: ServiceItem[] = [
  {
    title: 'Logistics & Travel',
    icon: 'Plane',
    description: ['B2B Air Ticketing', 'Visa Processing', 'Agency Operations Management']
  },
  {
    title: 'Digital Operations',
    icon: 'Shield',
    description: ['Community Leadership', 'Quality Control', 'Fraud Detection & Prevention']
  },
  {
    title: 'Business Analytics',
    icon: 'BarChart',
    description: ['Advanced MS Excel Reporting', 'Process Optimization', 'Data-Driven Decision Support']
  }
];

// --- AI SERVICE ---
const SYSTEM_INSTRUCTION = `
You are an AI assistant for Shaon Mondal's professional portfolio.
Shaon is an Operations Specialist and BBA Student at Tejgaon College, Dhaka.
Key facts: 
- 4+ years of experience in digital operations.
- 100% data accuracy record.
- Managed 10,000+ members in communities.
- Logistics expert (Air Ticketing, Visa, Agency Ops).
- Analytics expert (MS Excel, Google Sheets).
Reflect Shaon's precision. Point contact info to WhatsApp (+8801518693126).
Keep answers professional and concise.
`;

async function askAssistant(question: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Contact Shaon directly via WhatsApp for immediate response!";
  }
}

// --- SUB-COMPONENTS ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-black text-white tracking-tighter uppercase">
          SHAON <span className="text-[#10b981]">MONDAL</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-[#10b981] transition-colors">{link.name}</a>
          ))}
          <a href="https://wa.me/8801518693126" className="px-5 py-2 rounded-full bg-[#10b981] text-slate-950 font-bold text-sm hover:scale-105 transition-transform">Hire Me</a>
        </div>
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 absolute top-full left-0 w-full p-6 border-b border-slate-800">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-lg text-slate-300" onClick={() => setIsMenuOpen(false)}>{link.name}</a>
            ))}
            <a href="https://wa.me/8801518693126" className="w-full text-center px-5 py-3 rounded-lg bg-[#10b981] text-slate-950 font-bold" onClick={() => setIsMenuOpen(false)}>WhatsApp Me</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const imagePath = "https://i.postimg.cc/dVJtfgM4/shaon-hero.jpg";
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 md:pt-0 overflow-hidden bg-[#020617]">
      <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-[#10b981] rounded-full blur-[120px] opacity-[0.08] animate-pulse pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-20 w-[350px] h-[350px] bg-[#10b981] rounded-full blur-[100px] opacity-[0.05] pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
          <div className="flex-1 text-center md:text-left space-y-8 py-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-[10px] md:text-xs font-black uppercase tracking-[0.25em] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                </span>
                Operations Specialist
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter">
                Shaon <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-emerald-400 to-teal-500">Mondal</span>
              </h1>
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl text-slate-200 font-bold leading-tight">
                  Operations Specialist & BBA Student <br className="hidden md:block" />
                  <span className="text-[#10b981] font-medium">(Tejgaon College, Dhaka)</span>
                </h2>
                <p className="text-base md:text-lg text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed font-light">
                  Versatile professional with <span className="text-white font-medium">4+ years of experience</span> in digital operations, delivering <span className="text-[#10b981] font-medium">100% data accuracy</span> and managing <span className="text-white font-medium">10,000+ members</span>.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <a href="https://wa.me/8801518693126" className="group flex items-center gap-3 bg-[#10b981] text-slate-950 px-8 py-4 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] shadow-[0_15px_30px_-10px_rgba(16,185,129,0.4)]">
                <Phone size={20} fill="currentColor" />
                <span>WhatsApp Me</span>
              </a>
              <a href="#experience" className="group flex items-center gap-2 border border-slate-800 text-slate-300 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-900 transition-all">
                View Career <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="flex-shrink-0 flex justify-center items-center">
            <div className="relative group">
              <div className="absolute -inset-6 bg-[#10b981]/20 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative w-[240px] h-[320px] md:w-[300px] md:h-[400px]">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#10b981]/60 to-transparent rounded-[2rem] opacity-50"></div>
                <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
                  <img src={imagePath} alt="Shaon Mondal" className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110" loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                </div>
                <div className="absolute -top-4 -left-4 w-10 h-10 border-t-2 border-l-2 border-[#10b981]/60 rounded-tl-2xl"></div>
                <div className="absolute -bottom-4 -right-4 w-10 h-10 border-b-2 border-r-2 border-[#10b981]/60 rounded-br-2xl"></div>
                <div className="absolute -bottom-6 -left-6 bg-slate-900/98 backdrop-blur-xl border border-slate-800 p-3 rounded-2xl shadow-2xl flex items-center gap-2 transition-transform group-hover:-translate-y-2">
                  <div className="w-8 h-8 bg-[#10b981] rounded-lg flex items-center justify-center text-slate-950 font-black text-xs">4+</div>
                  <div className="pr-1">
                    <p className="text-[9px] text-[#10b981] uppercase font-black tracking-wider leading-none">Years</p>
                    <p className="text-white font-bold text-xs mt-0.5">Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const stats = [
    { label: 'Community Management', value: '10,000+', icon: <Users className="text-[#10b981]" />, highlight: true },
    { label: 'Data Accuracy', value: '100%', icon: <ShieldCheck className="text-[#10b981]" />, highlight: true },
    { label: 'Operational Years', value: '4+', icon: <Target className="text-[#10b981]" />, highlight: false },
    { label: 'Education', value: 'BBA', icon: <GraduationCap className="text-[#10b981]" />, highlight: false },
  ];
  return (
    <section id="about" className="py-24 bg-slate-950 border-y border-slate-900">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div>
            <span className="text-[#10b981] font-black tracking-[0.3em] uppercase text-xs mb-3 block">About Me</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 leading-tight">Driving Excellence in <br/><span className="text-slate-500">Digital Operations.</span></h2>
          </div>
          <div className="space-y-6 text-slate-400 leading-relaxed text-lg font-light">
            <p>Currently pursuing a <span className="text-white font-medium">BBA at Tejgaon College, Dhaka</span>, I have spent the last 4 years mastering digital infrastructure and community leadership.</p>
            <p>My professional ethos is built on <span className="text-[#10b981] font-semibold">uncompromising accuracy</span>. I focus on process optimization, fraud prevention, and efficient resource management.</p>
            <div className="p-6 bg-slate-900/50 rounded-2xl border-l-4 border-[#10b981] italic text-slate-300">
              "Specializing in turning complex operational chaos into streamlined, data-driven success stories."
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className={`p-6 rounded-[2rem] bg-slate-900/40 border border-slate-800 transition-all duration-500 hover:border-[#10b981]/30 ${stat.highlight ? 'bg-slate-900 shadow-xl' : ''}`}>
              <div className="mb-4 bg-slate-950/50 w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-800">{stat.icon}</div>
              <h3 className="text-3xl font-black text-white mb-1 tracking-tighter">{stat.value}</h3>
              <p className="text-slate-500 font-bold tracking-widest uppercase text-[10px] leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const IconMap = { Plane, Shield, BarChart };
  return (
    <section id="services" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#10b981] font-bold tracking-widest uppercase text-sm">Core Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Service Pillars</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Providing high-end operational support and strategic management for digital and physical businesses.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, i) => {
            const Icon = IconMap[service.icon];
            return (
              <div key={i} className="group p-8 rounded-3xl bg-slate-950 border border-slate-800 hover:border-[#10b981] transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 text-[#10b981] group-hover:bg-[#10b981] group-hover:text-slate-950 transition-all"><Icon size={32} /></div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <ul className="space-y-3">
                  {service.description.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-400"><Check size={16} className="text-[#10b981]" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Experience = () => (
  <section id="experience" className="py-24 bg-slate-950">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-[#10b981] font-bold tracking-widest uppercase text-sm">Professional Journey</span>
        <h2 className="text-4xl font-bold text-white mt-2">Experience Timeline</h2>
      </div>
      <div className="relative border-l-2 border-slate-800 space-y-12 ml-4 md:ml-0">
        {EXPERIENCE_DATA.map((exp, i) => (
          <div key={i} className="relative pl-10">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#10b981] border-4 border-slate-950"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                <p className="text-[#10b981] font-bold text-lg">{exp.company}</p>
              </div>
              <span className="inline-block px-4 py-1 rounded-full bg-slate-900 border border-[#10b981]/30 text-[#10b981] text-sm font-bold">{exp.period}</span>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
              <ul className="space-y-3">
                {exp.points.map((point, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-400"><CheckCircle2 size={18} className="text-[#10b981] mt-1 flex-shrink-0" /><span>{point}</span></li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Education = () => {
  const eduData = [
    { degree: 'Bachelor of Business Administration (BBA)', inst: 'Tejgaon College, Dhaka', period: '2022 – Present' },
    { degree: 'Higher Secondary Certificate (HSC)', inst: 'Shahid Smriti College', period: '2021' }
  ];
  return (
    <section id="education" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#10b981] font-bold tracking-widest uppercase text-sm">Academic Background</span>
          <h2 className="text-4xl font-bold text-white mt-2">Education</h2>
        </div>
        <div className="space-y-8">
          {eduData.map((e, i) => (
            <div key={i} className="group bg-slate-950 p-8 rounded-3xl border border-slate-800 hover:border-[#10b981]/50 transition-all">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <div className="bg-slate-900 p-3 rounded-xl text-[#10b981] group-hover:bg-[#10b981] group-hover:text-slate-950 transition-colors"><GraduationCap size={24}/></div>
                  <div><h3 className="text-xl font-bold text-white group-hover:text-[#10b981] transition-colors">{e.degree}</h3><p className="text-slate-400">{e.inst}</p></div>
                </div>
                <div className="flex items-center gap-2 text-[#10b981] bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 text-sm font-bold self-start md:self-center"><Calendar size={14}/>{e.period}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Shaon, I'm ${formData.name} (${formData.email}). Regarding "${formData.subject}": ${formData.message}`;
    window.open(`https://wa.me/8801518693126?text=${encodeURIComponent(text)}`, '_blank');
  };
  return (
    <section id="contact" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <span className="text-[#10b981] font-bold tracking-widest uppercase text-sm">Get in Touch</span>
          <h2 className="text-4xl font-bold text-white mt-2 mb-6">Let's Discuss Your Next Project</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-300"><div className="bg-slate-800 p-3 rounded-xl text-[#10b981]"><Mail size={24}/></div><div><p className="text-sm font-bold uppercase text-slate-500">Email Me</p><p>shaonpromx@gmail.com</p></div></div>
            <div className="flex items-center gap-4 text-slate-300"><div className="bg-slate-800 p-3 rounded-xl text-[#10b981]"><Phone size={24}/></div><div><p className="text-sm font-bold uppercase text-slate-500">WhatsApp</p><p>+880 151 869 3126</p></div></div>
          </div>
          <div className="mt-10 flex gap-4">
            {SOCIAL_LINKS.map((link, i) => (
              <a key={i} href={link.url} target="_blank" className="bg-slate-800 text-white p-3 rounded-xl hover:bg-[#10b981] hover:text-slate-950 transition-all">{link.icon}</a>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <input type="text" placeholder="Name" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-[#10b981]" required onChange={e => setFormData({...formData, name: e.target.value})} />
            <input type="email" placeholder="Email" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-[#10b981]" required onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <input type="text" placeholder="Subject" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-[#10b981]" required onChange={e => setFormData({...formData, subject: e.target.value})} />
          <textarea rows={4} placeholder="Message" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-[#10b981] resize-none" required onChange={e => setFormData({...formData, message: e.target.value})} />
          <button type="submit" className="w-full bg-[#10b981] text-slate-950 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">Send via WhatsApp <Send size={20}/></button>
        </form>
      </div>
    </section>
  );
};

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([{ role: 'assistant', text: "Hi! I'm Shaon's AI assistant. Ask me anything about his experience!" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);
  const handleSend = async (e: any) => {
    e.preventDefault(); if (!input.trim() || loading) return;
    const txt = input; setInput(''); setMessages(prev => [...prev, { role: 'user', text: txt }]); setLoading(true);
    const resp = await askAssistant(txt); setMessages(prev => [...prev, { role: 'assistant', text: resp }]); setLoading(false);
  };
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-[#10b981] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"><MessageSquare size={24}/></button>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl w-[320px] sm:w-[380px] h-[450px] flex flex-col shadow-2xl overflow-hidden">
          <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-2 text-[#10b981]"><Bot size={20}/><span className="font-semibold text-white">Career Assistant</span></div>
            <button onClick={() => setIsOpen(false)}><X size={20} className="text-slate-400 hover:text-white"/></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${m.role === 'user' ? 'bg-[#10b981] text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}>{m.text}</div>
              </div>
            ))}
            {loading && <div className="text-slate-500 text-xs animate-pulse pl-2">Typing...</div>}
          </div>
          <form onSubmit={handleSend} className="p-4 bg-slate-800 border-t border-slate-700 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about Shaon..." className="flex-1 bg-slate-900 p-2 rounded-lg text-sm border border-slate-700 text-white outline-none focus:border-[#10b981]"/>
            <button type="submit" className="bg-[#10b981] p-2 rounded-lg text-white hover:bg-emerald-600 transition-colors"><Send size={18}/></button>
          </form>
        </div>
      )}
    </div>
  );
};

const Footer = () => (
  <footer className="py-12 bg-slate-950 border-t border-slate-900 text-center">
    <a href="#" className="text-2xl font-black text-white uppercase tracking-tighter">SHAON <span className="text-[#10b981]">MONDAL</span></a>
    <p className="text-slate-500 text-sm mt-2">© {new Date().getFullYear()} Shaon Mondal. All rights reserved.</p>
    <div className="flex justify-center gap-6 text-sm mt-6">
      <a href="#about" className="text-slate-400 hover:text-white transition-colors">About</a>
      <a href="#services" className="text-slate-400 hover:text-white transition-colors">Services</a>
      <a href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact</a>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default App;
