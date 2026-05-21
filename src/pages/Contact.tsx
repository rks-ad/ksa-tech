import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ShieldCheck, KeyRound, AlertTriangle } from 'lucide-react';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending-otp' | 'otp-sent' | 'verified' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtpInput, setUserOtpInput] = useState('');

  // Step 1: Send OTP code
  const handleSendOtp = async () => {
    if (!formData.name || !formData.email) {
      setErrorMessage('Please fill out your Name and Email first before requesting verification.');
      setStatus('error');
      return;
    }

    setStatus('sending-otp');
    setErrorMessage('');

    const secureCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(secureCode);

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'request-otp',
          email: formData.email,
          otp: secureCode
        })
      });

      if (res.ok) {
        setStatus('otp-sent');
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send security verification code. Please retry.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network timeout. Please check your data connection.');
    }
  };

  // Step 2: Validate token
  const handleVerifyOtp = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (userOtpInput === generatedOtp && generatedOtp !== '') {
      setStatus('verified');
    } else {
      setErrorMessage('Incorrect token validation. Please check your spam folder or re-verify.');
    }
  };

  // Step 3: Block direct submissions or handle valid triggers
  const handleFinalSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (status !== 'verified') {
      setStatus('error');
      setErrorMessage('Verification Required: You must verify your email address via OTP before submitting.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit-form',
          ...formData
        })
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setGeneratedOtp('');
        setUserOtpInput('');
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMessage(data.error || 'Failed to broadcast communications payload.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network configuration fault occurred.');
    }
  };

  return (
    <div className="min-gradient py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400"
          >
            GET IN TOUCH
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Authenticate your terminal session using two-factor identity routing to establish a secure link.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-800"
          >
            {status === 'success' ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Transmission Secure!</h3>
                <p className="text-gray-400 mb-6">Your message has been verified and processed by KSA Tech infrastructure.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Return to form
                </button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                
                {/* Form Input Setup */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">NAME</label>
                    <input
                      type="text"
                      required
                      disabled={status === 'otp-sent' || status === 'verified' || status === 'loading'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">EMAIL ADDRESS</label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        required
                        disabled={status === 'otp-sent' || status === 'verified' || status === 'loading'}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="flex-1 bg-slate-950 border border-slate-800 disabled:opacity-40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="your@email.com"
                      />
                      {status !== 'otp-sent' && status !== 'verified' && (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={status === 'sending-otp'}
                          className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 px-4 rounded-xl font-medium text-xs text-white flex items-center justify-center transition-all shadow-md"
                        >
                          {status === 'sending-otp' ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : 'Verify Email'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Inline OTP Validation Row */}
                {status === 'otp-sent' && (
                  <motion.form 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleVerifyOtp} 
                    className="p-4 bg-slate-950 rounded-xl border border-blue-500/30 flex flex-col sm:flex-row items-end gap-4"
                  >
                    <div className="flex-1 w-full">
                      <label className="block text-xs font-semibold text-blue-400 tracking-wider mb-2 uppercase flex items-center gap-1">
                        <KeyRound className="w-3.5 h-3.5" /> Enter verification token
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        placeholder="000000"
                        value={userOtpInput}
                        onChange={(e) => setUserOtpInput(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-center tracking-widest text-lg font-bold text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 rounded-xl font-medium text-sm text-white transition-colors whitespace-nowrap"
                    >
                      Confirm Code
                    </button>
                  </motion.form>
                )}

                {/* Message Body Elements */}
                <form onSubmit={handleFinalSubmit} className="space-y-6">
                  <div className={status === 'verified' || status === 'loading' ? 'opacity-100 transition-opacity' : 'opacity-30 pointer-events-none'}>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-400 mb-2">SUBJECT</label>
                      <input
                        type="text"
                        required={status === 'verified'}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Project Scope"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">MESSAGE</label>
                      <textarea
                        required={status === 'verified'}
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        placeholder="Tell us about your system requirements..."
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm flex items-center gap-1.5 font-medium bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                      <AlertTriangle className="w-4 h-4 shrink-0" /> {errorMessage}
                    </motion.p>
                  )}

                  {status === 'verified' && (
                    <p className="text-emerald-400 text-xs font-semibold tracking-wide flex items-center gap-1">✓ Identity Confirmed. Secure access tunnel opened.</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-gray-500 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    {status === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        SEND VERIFIED MESSAGE
                        <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">EMAIL US</p>
                    <a href="mailto:info@ksatech.in" className="text-white hover:text-blue-400 transition-colors">info@ksatech.in</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">CALL/MESSAGE US</p>
                    <p className="text-white">+1 (940) 644-4449</p>
                    <p className="text-xs text-gray-500">Signal App Only</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">24x7 Support</p>
                    <p className="text-white">Remote & On-site Available</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/10">
              <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Registration</h4>
              <p className="text-white font-medium text-sm mb-1">MSME: UDYAM-RJ-17-0023660</p>
              <p className="text-xs text-gray-400">Management Consultancy Services</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
