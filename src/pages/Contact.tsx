import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ShieldCheck, ArrowLeft } from 'lucide-react';

export function Contact() {
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
 const handleRequestOtp = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error occurred. Please check your connection.');
    }
  };
    
    try {
      const res = await fetch('/api/contact/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatus('success');
        setStep('form');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setOtp('');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Invalid OTP code.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error occurred. Please check your connection.');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-ksa-neon/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight mb-6">
            Get in <span className="text-ksa-neon">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Ready to transform your IT infrastructure? Reach out to discuss projects, consulting, or freelance opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {step === 'form' ? (
              <form onSubmit={handleRequestOtp} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-ksa-card border border-ksa-border p-4 focus:outline-none focus:border-ksa-neon transition-colors text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-ksa-card border border-ksa-border p-4 focus:outline-none focus:border-ksa-neon transition-colors text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Subject</label>
                  <input 
                    required
                    type="text" 
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-ksa-card border border-ksa-border p-4 focus:outline-none focus:border-ksa-neon transition-colors text-white"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Message</label>
                  <textarea 
                    required
                    rows={6}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-ksa-card border border-ksa-border p-4 focus:outline-none focus:border-ksa-neon transition-colors text-white resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-ksa-neon transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : (
                    <>Send Message <Send className="w-4 h-4" /></>
                  )}
                </button>

                {status === 'success' && (
                  <p className="text-ksa-neon text-sm font-mono text-center">Message sent successfully! We'll be in touch.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-500 text-sm font-mono text-center">{errorMessage}</p>
                )}
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6 glass-panel p-8 border-ksa-neon/30">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-ksa-neon/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-ksa-neon/30">
                    <ShieldCheck className="w-8 h-8 text-ksa-neon" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Verify Your Email</h3>
                  <p className="text-gray-400 text-sm">
                    We've sent a 6-digit code to <span className="text-white">{formData.email}</span>. 
                    Please enter it below to confirm your message.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-400 text-center block">Enter OTP Code</label>
                  <input 
                    required
                    type="text" 
                    maxLength={6}
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-ksa-card border border-ksa-border p-4 text-center text-2xl tracking-[0.5em] font-mono focus:outline-none focus:border-ksa-neon transition-colors text-white"
                    placeholder="000000"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading' || otp.length !== 6}
                  className="w-full py-4 bg-ksa-neon text-black font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Verifying...' : 'Verify & Send'}
                </button>

                <div className="flex justify-between items-center pt-4">
                  <button 
                    type="button"
                    onClick={() => { setStep('form'); setStatus('idle'); setErrorMessage(''); }}
                    className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" /> Back to form
                  </button>
                  <button 
                    type="button"
                    onClick={handleRequestOtp}
                    className="text-xs text-ksa-neon hover:text-white transition-colors"
                  >
                    Resend Code
                  </button>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-mono text-center mt-4">{errorMessage}</p>
                )}
              </form>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <a href="mailto:info@ksatech.in" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-ksa-card border border-ksa-border flex items-center justify-center group-hover:border-ksa-neon transition-colors">
                    <Mail className="w-5 h-5 text-ksa-neon" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Email Us</div>
                    <div className="text-lg group-hover:text-ksa-neon transition-colors">info@ksatech.in</div>
                  </div>
                </a>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-ksa-card border border-ksa-border flex items-center justify-center group-hover:border-ksa-neon transition-colors">
                    <Phone className="w-5 h-5 text-ksa-neon" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Call/Message Us</div>
                    <div className="text-lg group-hover:text-ksa-neon transition-colors">+1 (940) 644-4449</div>
                    <div className="text-xs text-gray-400 mt-1">24x7 Support</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-ksa-card border border-ksa-border flex items-center justify-center group-hover:border-ksa-neon transition-colors">
                    <MapPin className="w-5 h-5 text-ksa-neon" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Registration</div>
                    <div className="text-lg">MSME: UDYAM-RJ-17-0023660</div>
                    <div className="text-sm text-gray-400 mt-1">Management Consultancy Services</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
