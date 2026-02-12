import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import SEO from '../components/seo/SEO';
import { servicesList } from '../data';

export default function Services() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-cinematic-black">
      <SEO 
        title="Professional Video Editing Services" 
        description="From full-length wedding documentaries to viral Instagram reels. Discover our range of professional video editing services."
      />
      
      <div className="container mx-auto px-6">
        <SectionHeading title="Creative Services" subtitle="What We Offer" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-zinc-900 border border-white/5 p-8 md:p-10 rounded-sm hover:border-gold-500/30 transition-colors"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ArrowRight size={64} className="text-gold-500 -rotate-45" />
              </div>

              <h3 className="text-2xl font-bold text-white font-serif mb-2">{service.title}</h3>
              <p className="text-gold-500 font-medium mb-6">{service.price}</p>
              <p className="text-gray-400 leading-relaxed mb-8 border-b border-white/5 pb-8">
                {service.description}
              </p>

              <ul className="space-y-4 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                    <Check size={18} className="text-gold-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/contact">
                <Button variant="outline" className="w-full group-hover:bg-gold-500 group-hover:text-black group-hover:border-gold-500">
                  Get a Quote
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
