import { motion } from 'framer-motion';
import { Server, Layout, Database, ShoppingCart, MessageSquare, Shield, Cloud, Bot } from 'lucide-react';

export function Services() {
  const services = [
    {
      category: "Cloud & Infrastructure",
      icon: Cloud,
      items: ["AWS", "Google Cloud Platform (GCP)", "Oracle", "cPanel Hosting"]
    },
    {
      category: "Enterprise Software",
      icon: Server,
      items: ["Salesforce", "ServiceNow", "Microsoft Ecosystem", "Google Workspace"]
    },
    {
      category: "E-Commerce & Retail",
      icon: ShoppingCart,
      items: ["Shopify", "Amazon Seller Central", "PayHip"]
    },
    {
      category: "Development & Web",
      icon: Layout,
      items: ["Frontend Website Making", "Backend Architecture", "Full-Stack Solutions"]
    },
    {
      category: "Communications & Support",
      icon: MessageSquare,
      items: ["Twilio", "Zendesk", "Helpcenter Creation"]
    },
    {
      category: "Security & Payments",
      icon: Shield,
      items: ["Sophos Security", "Razorpay Integration"]
    },
    {
      category: "AI & Automation",
      icon: Bot,
      items: ["AI Agentic Deployments", "Custom Automation Workflows"]
    },
    {
      category: "Consulting & Education",
      icon: Database,
      items: ["App Education & Training", "Manpower Provisioning", "Management Consultancy"]
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight mb-6">
            Managed <span className="text-ksa-neon">IT Services</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Comprehensive implementation, deployment, and management across the world's leading technology platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group h-72 perspective-1000 cursor-pointer"
            >
              <div className="relative w-full h-full duration-700 preserve-3d group-hover:rotate-y-180">
                {/* Front of Card */}
                <div className="absolute w-full h-full backface-hidden glass-panel p-8 flex flex-col items-center justify-center text-center border-ksa-border group-hover:border-ksa-neon transition-colors">
                  <service.icon className="w-16 h-16 text-ksa-neon mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                  <h3 className="text-2xl font-bold">{service.category}</h3>
                  <p className="text-xs text-gray-500 mt-6 uppercase tracking-widest font-mono border border-gray-800 px-4 py-2 rounded-full">Hover to view</p>
                </div>
                
                {/* Back of Card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 glass-panel p-8 bg-ksa-card border-ksa-neon flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-6 text-ksa-neon border-b border-ksa-neon/30 pb-4">{service.category}</h3>
                  <ul className="space-y-4">
                    {service.items.map((item, j) => (
                      <li key={j} className="text-gray-300 text-sm flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-ksa-neon rounded-full mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
