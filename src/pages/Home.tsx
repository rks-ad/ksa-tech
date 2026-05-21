import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Cloud, ShieldCheck, Bot, GraduationCap, Building2, ShoppingBag, Stethoscope, Landmark, Rocket } from 'lucide-react';
import { BrandMarquee } from '../components/BrandMarquee';

export function Home() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(0,240,255,0.1)_0%,_transparent_60%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ksa-neon/30 bg-ksa-neon/5 text-ksa-neon text-xs font-mono mb-6 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-ksa-neon animate-pulse" />
              Next-Gen IT Infrastructure
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight mb-8">
              ROBUST.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">SCALABLE.</span><br/>
              <span className="text-ksa-neon">SOLUTIONS.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
              KSA Tech delivers elite managed IT implementations, AI agentic deployments, and enterprise-grade infrastructure. We build the future of your business.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-4 bg-ksa-neon text-black font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors rounded-none neon-glow flex items-center gap-2">
                Deploy Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/services" className="px-8 py-4 bg-transparent border border-ksa-border text-white font-bold uppercase tracking-wider text-sm hover:bg-ksa-card transition-colors rounded-none">
                Explore Services
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-ksa-neon/20 blur-[100px] rounded-full" />
            <div className="relative glass-panel p-8 rounded-2xl border border-ksa-border transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Cloud, label: "Cloud Infra", sub: "AWS, GCP, Oracle" },
                  { icon: Code2, label: "Full-Stack", sub: "React, Node, DBs" },
                  { icon: Bot, label: "AI Agents", sub: "Custom Deployments" },
                  { icon: ShieldCheck, label: "Security", sub: "Sophos, Identity" }
                ].map((item, i) => (
                  <div key={i} className="bg-ksa-dark p-6 rounded-xl border border-ksa-border hover:border-ksa-neon/50 transition-colors">
                    <item.icon className="w-8 h-8 text-ksa-neon mb-4" />
                    <div className="font-bold mb-1">{item.label}</div>
                    <div className="text-xs text-gray-500 font-mono">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <BrandMarquee />

      {/* Core Focus Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight">
                Our Core <span className="text-ksa-neon">Focus</span>
              </h2>
            </div>
            <p className="text-gray-400 max-w-md">
              We specialize in end-to-end management consultancy and IT implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Enterprise Implementations",
                desc: "Salesforce, ServiceNow, Microsoft, Google Workspace, and Zendesk rollouts tailored to your workflow.",
                num: "01"
              },
              {
                title: "E-Commerce & Payments",
                desc: "Shopify, Amazon Seller setups, PayHip, Twilio, and Razorpay integrations for seamless transactions.",
                num: "02"
              },
              {
                title: "AI & Education",
                desc: "Deploying intelligent AI agents and providing comprehensive training for all supported applications.",
                num: "03"
              }
            ].map((feature, i) => (
              <div key={i} className="group relative glass-panel p-8 hover:bg-ksa-card transition-colors border-t-4 border-t-transparent hover:border-t-ksa-neon">
                <div className="text-6xl font-display font-bold text-ksa-border group-hover:text-ksa-neon/20 transition-colors mb-6">
                  {feature.num}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Support - Flip Cards */}
      <section className="py-32 relative bg-ksa-card border-t border-ksa-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6">
              Industries We <span className="text-ksa-neon">Support</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Delivering specialized IT implementations and AI solutions across diverse business sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "E-Commerce & Retail", icon: ShoppingBag, desc: "Scaling Shopify & Amazon operations with robust cloud backends and payment gateways." },
              { name: "Enterprise IT", icon: Building2, desc: "ServiceNow & Salesforce implementations for large-scale corporate operations." },
              { name: "Healthcare", icon: Stethoscope, desc: "Secure, compliant infrastructure and automated patient support AI agents." },
              { name: "Finance & Fintech", icon: Landmark, desc: "High-security AWS/GCP architectures and Razorpay integrations." },
              { name: "Education", icon: GraduationCap, desc: "LMS deployments, Google Workspace setups, and comprehensive IT training." },
              { name: "Startups", icon: Rocket, desc: "Rapid full-stack development and scalable cloud foundations for fast growth." }
            ].map((industry, i) => (
              <div key={i} className="group h-64 perspective-1000 cursor-pointer">
                <div className="relative w-full h-full duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Front */}
                  <div className="absolute w-full h-full backface-hidden glass-panel p-8 flex flex-col items-center justify-center text-center border-ksa-border group-hover:border-ksa-neon transition-colors">
                    <industry.icon className="w-12 h-12 text-ksa-neon mb-4 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
                    <h3 className="text-xl font-bold">{industry.name}</h3>
                  </div>
                  {/* Back */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 glass-panel p-8 bg-ksa-dark border-ksa-neon flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-bold mb-3 text-ksa-neon">{industry.name}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{industry.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
