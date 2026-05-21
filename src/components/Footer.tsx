import { Link } from 'react-router-dom';
import { Terminal, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-ksa-border bg-ksa-card pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img src="/logo.png" alt="KSA Tech Logo" className="w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] transition-all" />
              <div>
                <div className="font-display font-bold text-xl tracking-tight text-white">KSA TECH</div>
                <div className="text-[10px] font-mono text-ksa-neon uppercase tracking-widest">Komal Sharma Associates</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-6">
              Robust and scalable managed IT implementation services. Empowering businesses through AI deployments, cloud infrastructure, and expert consulting.
            </p>
            <div className="space-y-2">
              <a href="mailto:info@ksatech.in" className="flex items-center gap-2 text-sm text-gray-400 hover:text-ksa-neon transition-colors">
                <Mail className="w-4 h-4" /> info@ksatech.in
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4" /> +1 (940) 644-4449 <span className="text-[10px] bg-ksa-border px-2 py-0.5 rounded text-gray-300">24x7 Support</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/services" className="hover:text-ksa-neon transition-colors">Services</Link></li>
              <li><Link to="/careers" className="hover:text-ksa-neon transition-colors">Careers & Freelance</Link></li>
              <li><Link to="/blog" className="hover:text-ksa-neon transition-colors">Blog & Insights</Link></li>
              <li><Link to="/contact" className="hover:text-ksa-neon transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Legal & Compliance</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>MSME: UDYAM-RJ-17-0023660</li>
              <li>Category: Management Consultancy Services</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-ksa-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Komal Sharma Associates (KSA Tech). All rights reserved.
          </p>
          <p className="text-[10px] text-gray-600 max-w-2xl text-center md:text-right">
            Disclaimer: All brand names, logos, and trademarks (Salesforce, ServiceNow, New Relic, Microsoft, Google Workspace, Shopify, Amazon, PayHip, Twilio, Razorpay, Sophos, Zendesk, cPanel, AWS, GCP, Oracle, etc.) are the property of their respective owners. Their use on this website does not imply endorsement or direct affiliation.
          </p>
        </div>
      </div>
    </footer>
  );
}
