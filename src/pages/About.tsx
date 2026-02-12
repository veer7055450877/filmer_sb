import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import { Camera, Heart, Coffee } from 'lucide-react';
import SEO from '../components/seo/SEO';

export default function About() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-cinematic-black">
      <SEO 
        title="Meet the Editor Behind the Lens" 
        description="Learn about Filmer SB's passion for storytelling, 5+ years of experience, and the creative process that drives every cinematic edit."
      />
      
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 border-2 border-gold-500/30 p-2 rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop" 
                alt="Filmer SB Profile" 
                className="w-full h-auto rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-zinc-900 z-0 border border-white/10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border border-gold-500/20 z-0" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-gold-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
              The Editor
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-serif mb-8">
              Hi, I'm <span className="text-gold-500">Filmer SB</span>
            </h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
              <p>
                I am a passionate video editor with a love for cinematic storytelling. 
                My journey began 5 years ago when I picked up my first camera, but I quickly realized 
                that the real magic happens in the editing room.
              </p>
              <p>
                To me, editing isn't just about cutting clips together; it's about rhythm, emotion, 
                and pacing. Whether it's the tearful vows at a wedding or the high-energy beats of a 
                fashion reel, I strive to make every frame count.
              </p>
              <p>
                When I'm not editing, you can find me scouting for new music, watching classic cinema 
                for inspiration, or exploring the city with my camera.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center p-4 bg-white/5 rounded-sm">
                <Camera className="w-8 h-8 text-gold-500 mx-auto mb-2" />
                <span className="text-white font-bold block">5+ Years</span>
                <span className="text-xs text-gray-500 uppercase">Experience</span>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-sm">
                <Heart className="w-8 h-8 text-gold-500 mx-auto mb-2" />
                <span className="text-white font-bold block">100+</span>
                <span className="text-xs text-gray-500 uppercase">Happy Clients</span>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-sm">
                <Coffee className="w-8 h-8 text-gold-500 mx-auto mb-2" />
                <span className="text-white font-bold block">Infinite</span>
                <span className="text-xs text-gray-500 uppercase">Coffees</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Workflow / Process */}
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="My Process" subtitle="How It Works" />
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gold-500/50 before:to-transparent">
            {[
              { title: "Consultation", desc: "We discuss your vision, style preferences, and requirements." },
              { title: "Editing Magic", desc: "I craft the narrative, color grade, and sound design." },
              { title: "Review & Refine", desc: "We fine-tune the details to ensure perfection." },
              { title: "Final Delivery", desc: "You receive your cinematic masterpiece in high quality." }
            ].map((step, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gold-500 bg-cinematic-black group-[.is-active]:bg-gold-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="text-black font-bold">{i + 1}</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-zinc-900 p-6 rounded border border-white/5 shadow-lg">
                  <h3 className="font-bold text-white font-serif text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
