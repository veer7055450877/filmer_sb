import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import CustomSelect from '../components/ui/CustomSelect';
import SEO from '../components/seo/SEO';
import axios from 'axios';
import { IS_PRODUCTION, ENDPOINTS } from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding Film',
    date: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, eventType: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      if (IS_PRODUCTION) {
        // --- PRODUCTION MODE: Send to PHP/MySQL ---
        await axios.post(ENDPOINTS.CONTACT, formData);
      } else {
        // --- MOCK MODE: Save to LocalStorage ---
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
        const existing = JSON.parse(localStorage.getItem('filmer_sb_requests') || '[]');
        localStorage.setItem('filmer_sb_requests', JSON.stringify([
            { ...formData, id: Date.now(), created_at: new Date().toISOString() },
            ...existing
        ]));
        console.log("Mock Data Saved:", formData);
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', eventType: 'Wedding Film', date: '', message: '' });

    } catch (error) {
      console.error("Error sending message:", error);
      setStatus('error');
    }
  };

  const eventTypes = ["Wedding Film", "Pre-Wedding", "Instagram Reel", "Event Highlights", "Commercial", "Other"];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-cinematic-black relative overflow-hidden">
      <SEO 
        title="Book Your Cinematic Edit" 
        description="Ready to create magic? Contact Filmer SB today to discuss your video editing project, check availability, and get a custom quote."
      />
      
      {/* Background Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-red-600/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Get In Touch" subtitle="Book Your Edit" />

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-zinc-900/50 p-8 rounded-sm border border-white/5 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white font-serif mb-6">Contact Info</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">WhatsApp</p>
                    <p className="text-white font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Email</p>
                    <p className="text-white font-medium">hello@filmersb.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Location</p>
                    <p className="text-white font-medium">New York, NY (Available Worldwide)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-sm">
              <h4 className="text-white font-bold mb-2">Ready to chat?</h4>
              <p className="text-gray-400 text-sm mb-4">Click below to start a WhatsApp conversation instantly.</p>
              <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white border-none">
                <MessageCircle size={18} /> Chat on WhatsApp
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-2/3"
          >
            <form onSubmit={handleSubmit} className="bg-zinc-900/30 p-8 md:p-10 rounded-sm border border-white/5 backdrop-blur-sm relative">
              
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-20 bg-zinc-900/95 flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6">
                    <Send size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-white font-serif mb-2">Message Sent!</h3>
                  <p className="text-gray-400 mb-8">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <Button type="button" onClick={() => setStatus('idle')} variant="outline">
                    Send Another Message
                  </Button>
                </motion.div>
              )}

              {status === 'error' && (
                 <div className="mb-4 p-3 bg-red-900/50 border border-red-500/30 text-red-200 text-sm rounded">
                    Something went wrong. Please try again.
                 </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/50 border border-white/10 rounded-sm pl-12 pr-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Event Date</label>
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="mb-6 relative z-20">
                 <CustomSelect 
                    label="Event Type"
                    options={eventTypes}
                    value={formData.eventType}
                    onChange={handleSelectChange}
                  />
              </div>

              <div className="mb-8">
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Tell me about your project</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors resize-none"
                  placeholder="Describe your vision..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto" disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Sending...
                    </span>
                ) : (
                    <><Send size={18} /> Send Message</>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
