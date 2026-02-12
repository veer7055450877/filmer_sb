import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import SEO from '../components/seo/SEO';
import { packages } from '../data';

export default function Packages() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-cinematic-black">
      <SEO 
        title="Video Editing Rates & Packages" 
        description="Transparent pricing for professional video editing. Choose from our Essential, Cinematic, or Masterpiece packages tailored to your needs."
      />
      
      <div className="container mx-auto px-6">
        <SectionHeading title="Investment" subtitle="Packages" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-xl border flex flex-col ${
                pkg.popular 
                  ? "bg-zinc-900 border-gold-500 shadow-[0_0_30px_rgba(212,175,55,0.15)] transform md:-translate-y-4" 
                  : "bg-black/40 border-white/10"
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-black text-xs font-bold uppercase px-4 py-1 rounded-full tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white font-serif mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-gold-500 mb-2">{pkg.price}</div>
                <p className="text-gray-400 text-sm">{pkg.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0">
                        <Check size={12} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-gray-600 shrink-0">
                        <X size={12} />
                      </div>
                    )}
                    <span className={feature.included ? "text-gray-300" : "text-gray-600 line-through"}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Link to="/contact">
                <Button 
                  variant={pkg.popular ? 'primary' : 'outline'} 
                  className="w-full"
                >
                  Choose {pkg.name}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Custom Quote Section */}
        <div className="mt-20 p-8 md:p-12 bg-zinc-900/50 border border-white/5 rounded-xl text-center">
          <h3 className="text-2xl font-bold text-white font-serif mb-4">Need something custom?</h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Every project is unique. If these packages don't fit your specific needs, let's talk about a custom solution tailored just for you.
          </p>
          <Link to="/contact">
            <Button variant="outline">Get a Custom Quote</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
