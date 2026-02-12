import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, Award, Clock, Play, Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/seo/SEO";
import Accordion from "../components/ui/Accordion";
import Button from "../components/ui/Button";
import ExperienceTimeline from "../components/ui/ExperienceTimeline";
import HeroScene from "../components/ui/HeroScene";
import InstagramFeed from "../components/ui/InstagramFeed";
import ParallaxText from "../components/ui/ParallaxText";
import SectionHeading from "../components/ui/SectionHeading";
import SpotlightCard from "../components/ui/SpotlightCard";
import TestimonialCarousel from "../components/ui/TestimonialCarousel";
import TiltCard from "../components/ui/TiltCard";
import {
  awards,
  faqItems,
  services,
  stats,
  tools,
  workflowSteps,
} from "../data";

export default function Home() {
  const outerControls = useAnimation();
  const innerControls = useAnimation();

  useEffect(() => {
    // start forward animations and keep final state
    outerControls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    innerControls.start({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.2, duration: 0.5 },
    });
  }, [outerControls, innerControls]);

  return (
    <div className="overflow-hidden">
      <SEO
        title="Cinematic Video Editing Portfolio"
        description="Filmer SB transforms raw footage into emotional masterpieces. Specializing in high-end wedding films, Instagram reels, and commercial storytelling."
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Hero Scene */}
        <HeroScene />

        {/* Background Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-cinematic-black z-0 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={outerControls}
            className="pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={innerControls}
              className="inline-flex items-center gap-2 mb-8 px-6 py-2 border border-gold-500/30 rounded-full bg-black/40 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.1)]"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-gold-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
                Available for Booking
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white font-serif mb-6 leading-tight tracking-tight drop-shadow-2xl">
              CINEMATIC <br />
              <span className="relative inline-block">
                <span className="absolute inset-0 blur-2xl bg-gold-500/20" />
                <span className="relative text-white/50 bg-clip-text bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700">
                  STORIES
                </span>
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Transforming raw footage into emotional masterpieces. Specializing
              in weddings, commercials, and high-impact social content.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-30">
              <Link to="/contact" className="relative z-30">
                <Button
                  size="lg"
                  className="shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] border-gold-500"
                >
                  Start Project
                </Button>
              </Link>
              <Link to="/portfolio" className="relative z-30">
                <Button
                  variant="outline"
                  size="lg"
                  className="backdrop-blur-sm bg-white/5 border-white/20 hover:bg-white/10"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-20 pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold-500 to-transparent" />
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="py-10 border-y border-white/5 bg-black/50 backdrop-blur-sm">
        <ParallaxText baseVelocity={-2}>
          Cinematic • Emotional • Timeless • Creative •
        </ParallaxText>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-zinc-900/30 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity"
              >
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
                  <Trophy size={24} />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">{award.title}</p>
                  <p className="text-gray-500 text-xs uppercase">{award.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-b border-white/5 bg-zinc-900/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-gold-500 font-serif mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-400 text-xs uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeading title="The Journey" subtitle="Experience" />
          <ExperienceTimeline />
        </div>
      </section>

      {/* Showreel Preview */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading title="The Showreel" subtitle="Watch the Magic" />
          <div className="relative rounded-xl overflow-hidden aspect-video group cursor-pointer border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <img
              src="https://images.unsplash.com/photo-1606166187734-a433e10e5762?q=80&w=2000&auto=format&fit=crop"
              alt="Showreel Cover"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Link to="/portfolio">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-24 h-24 bg-gold-500/90 rounded-full flex items-center justify-center pl-2 text-black shadow-[0_0_40px_rgba(212,175,55,0.5)] cursor-pointer backdrop-blur-md"
                >
                  <Play fill="currentColor" size={36} />
                </motion.div>
              </Link>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
              <h3 className="text-3xl font-bold text-white font-serif mb-2">
                2025 Showreel
              </h3>
              <p className="text-gray-300">
                Experience the magic of storytelling
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-24 bg-zinc-900/20 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <span className="text-gold-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
                Featured Project
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-serif mb-6">
                The Alpine Elopement
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                A breathtaking journey into the mountains. We captured the raw
                emotion of two souls uniting amidst the clouds. From drone shots
                of the peaks to the intimate whispers of vows, this film
                represents our signature style.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-white/5 rounded text-xs uppercase tracking-wider text-gray-300">
                  Wedding
                </div>
                <div className="px-4 py-2 bg-white/5 rounded text-xs uppercase tracking-wider text-gray-300">
                  Cinematic
                </div>
                <div className="px-4 py-2 bg-white/5 rounded text-xs uppercase tracking-wider text-gray-300">
                  4K
                </div>
              </div>
              <div className="mt-8">
                <Link
                  to="/portfolio"
                  className="text-gold-500 font-bold uppercase tracking-wider hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  Watch Full Film <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <TiltCard className="aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
                  alt="Featured Project"
                  className="w-full h-full object-cover rounded-sm"
                />
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Spotlight Cards */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading title="Why Filmer SB?" subtitle="The Difference" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SpotlightCard>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500 mb-6 border border-gold-500/20">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 font-serif">
                  Fast Turnaround
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We understand the excitement. Get your teasers within days and
                  full films on schedule, without compromising quality.
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500 mb-6 border border-gold-500/20">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 font-serif">
                  Cinematic Quality
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  4K editing, professional color grading, and sound design that
                  rivals feature films. Your story deserves the best.
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500 mb-6 border border-gold-500/20">
                  <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 font-serif">
                  Creative Vision
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We don't just document; we create art. Every cut is
                  intentional, every transition smooth and meaningful.
                </p>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Toolkit Section */}
      <section className="py-20 bg-black/40 border-y border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-8">
            Powered by Industry Standard Tools
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            {tools.map((tool, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 group hover:opacity-100 transition-opacity"
              >
                <div className="p-4 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors text-gray-300 group-hover:text-gold-500">
                  {tool.icon}
                </div>
                <span className="text-sm font-medium text-gray-400">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-white/5 border-y border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <SectionHeading title="The Process" subtitle="From Raw to Real" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent -translate-y-1/2 z-0" />

            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center max-w-[200px]"
              >
                <div className="w-12 h-12 rounded-full bg-black border-2 border-gold-500 flex items-center justify-center text-gold-500 font-bold mb-4 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  {i + 1}
                </div>
                <h4 className="text-lg font-bold text-white font-serif mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading title="Our Expertise" subtitle="What We Do" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-8 rounded-xl hover:bg-white/10 transition-all duration-500 group border border-white/5 hover:border-gold-500/30 flex flex-col h-full"
              >
                <div className="text-gold-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-serif">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {service.desc}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center text-gold-500 text-sm font-bold uppercase tracking-wider hover:text-white transition-colors mt-auto"
                >
                  Learn More <ArrowRight size={16} className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Reels Grid */}
      <section className="py-24 bg-black/40">
        <div className="container mx-auto px-6">
          <SectionHeading title="Latest on Instagram" subtitle="Social Feed" />
          <InstagramFeed />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-black/30">
        <div className="container mx-auto px-6">
          <SectionHeading title="Client Love" subtitle="Testimonials" />
          <TestimonialCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading title="Common Questions" subtitle="FAQ" />
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=2600&auto=format&fit=crop"
            alt="CTA Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinematic-black via-cinematic-black/90 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-7xl font-bold text-white font-serif mb-8">
            Let's Create Magic
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Ready to turn your footage into a cinematic masterpiece? Let's
            discuss your project.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-gold-500 text-black hover:bg-white text-lg px-10 py-5 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Start Your Project
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
