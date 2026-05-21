import { motion } from 'framer-motion';
import { Briefcase, Code, Users } from 'lucide-react';

export function Careers() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight mb-6">
            Join <span className="text-ksa-neon">KSA Tech</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            We work with freelancers and small teams to deliver robust IT solutions. Explore pay-per-project opportunities and full-time roles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {[
              {
                title: "Freelance Full-Stack Developer",
                type: "Pay Per Project",
                desc: "Looking for experienced React/Node.js developers for upcoming web architecture projects.",
                icon: Code
              },
              {
                title: "Salesforce Implementation Specialist",
                type: "Contract",
                desc: "Help our clients migrate and optimize their Salesforce environments.",
                icon: Briefcase
              },
              {
                title: "AI Deployment Engineer",
                type: "Pay Per Project",
                desc: "Deploy and configure AI agents for enterprise workflows and customer support.",
                icon: Users
              }
            ].map((job, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 border-l-4 border-l-ksa-neon hover:bg-ksa-card transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                    <span className="inline-block px-3 py-1 bg-ksa-neon/10 text-ksa-neon text-xs font-mono uppercase tracking-wider rounded">
                      {job.type}
                    </span>
                  </div>
                  <job.icon className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-gray-400 mb-6">{job.desc}</p>
                <a href={`mailto:info@ksatech.in?subject=Application for ${job.title}`} className="text-sm font-bold uppercase tracking-wider hover:text-ksa-neon transition-colors inline-flex items-center gap-2">
                  Apply Now &rarr;
                </a>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="glass-panel p-8 sticky top-32">
              <h3 className="text-xl font-bold mb-4">Why Work With Us?</h3>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-ksa-neon rounded-full mt-1.5 flex-shrink-0" />
                  <p>Flexible pay-per-project models perfect for freelancers and small agencies.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-ksa-neon rounded-full mt-1.5 flex-shrink-0" />
                  <p>Exposure to top-tier enterprise tools (AWS, Salesforce, ServiceNow).</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-ksa-neon rounded-full mt-1.5 flex-shrink-0" />
                  <p>Continuous learning and education on the latest AI agentic deployments.</p>
                </li>
              </ul>
              <div className="mt-8 pt-8 border-t border-ksa-border">
                <p className="text-sm text-gray-400 mb-4">Don't see a fit? Send your resume anyway.</p>
                <a href="mailto:info@ksatech.in" className="block w-full py-3 text-center bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-ksa-neon transition-colors">
                  Email Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
