import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Mail, Phone, Film } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cinematic-dark border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Film className="w-8 h-8 text-gold-500" />
              <span className="text-2xl font-bold font-serif tracking-wider text-white">
                FILMER <span className="text-gold-500">SB</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-md mb-6">
              Crafting cinematic stories from your most precious moments. 
              Specializing in wedding films, emotional storytelling, and high-impact visuals.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-gold-500 hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-red-600 hover:text-white transition-all">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-serif">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/portfolio" className="text-gray-400 hover:text-gold-500 transition-colors">Portfolio</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-gold-500 transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-gold-500 transition-colors">About Me</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-gold-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-serif">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="text-gold-500" />
                <span>hello@filmersb.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-gold-500" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Filmer SB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
