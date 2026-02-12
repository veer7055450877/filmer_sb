import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import SEO from '../../components/seo/SEO';
import axios from 'axios';
import { IS_PRODUCTION, ENDPOINTS } from '../../config';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Forgot Password State
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStatus, setResetStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
        if (IS_PRODUCTION) {
            // --- PRODUCTION: Real Auth ---
            const response = await axios.post(ENDPOINTS.LOGIN, { username, password });
            localStorage.setItem('filmer_sb_admin_token', response.data.token);
            navigate('/admin/dashboard');
        } else {
            // --- MOCK: Simple Check ---
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('filmer_sb_admin_token', 'mock_token');
                navigate('/admin/dashboard');
            } else {
                setError('Invalid credentials (Mock: admin/admin123)');
            }
        }
    } catch (err) {
        setError('Login failed. Check credentials.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
      e.preventDefault();
      setResetStatus('idle');
      
      try {
          if (IS_PRODUCTION) {
              await axios.post(ENDPOINTS.FORGOT_PASSWORD, { email: resetEmail, new_password: newPassword });
              setResetStatus('success');
              setTimeout(() => setShowForgot(false), 2000);
          } else {
              alert("Forgot Password is only available in Production mode.");
          }
      } catch (err) {
          setResetStatus('error');
      }
  };

  return (
    <div className="min-h-screen bg-cinematic-black flex items-center justify-center p-4">
      <SEO title="Admin Portal Access" description="Secure login area for Filmer SB administration." />
      
      {!showForgot ? (
        // --- LOGIN FORM ---
        <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-8 rounded-xl shadow-2xl">
            <div className="flex justify-center mb-8">
                <div className="flex items-center gap-2">
                <Film className="w-8 h-8 text-gold-500" />
                <span className="text-2xl font-bold font-serif tracking-wider text-white">
                    ADMIN <span className="text-gold-500">PANEL</span>
                </span>
                </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
            <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Username</label>
                <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                />
            </div>
            <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Password</label>
                <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                />
            </div>

            {error && <p className="text-red-500 text-sm text-center flex items-center justify-center gap-2"><AlertCircle size={14}/> {error}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : <><Lock size={16} /> Login</>}
            </Button>
            </form>

            {IS_PRODUCTION && (
                <div className="mt-4 text-center">
                    <button onClick={() => setShowForgot(true)} className="text-xs text-gray-500 hover:text-gold-500 transition-colors">
                        Forgot Password?
                    </button>
                </div>
            )}
            
            {!IS_PRODUCTION && (
                 <p className="mt-4 text-xs text-gray-600 text-center">Mock Mode: Use admin / admin123</p>
            )}
        </div>
      ) : (
        // --- FORGOT PASSWORD FORM ---
        <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-8 rounded-xl shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Reset Password</h3>
            <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Admin Email</label>
                    <input 
                    type="email" 
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                    placeholder="admin@filmersb.com"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">New Password</label>
                    <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                    />
                </div>

                {resetStatus === 'success' && <p className="text-green-500 text-sm text-center flex items-center justify-center gap-2"><CheckCircle size={14}/> Password Updated!</p>}
                {resetStatus === 'error' && <p className="text-red-500 text-sm text-center">Error updating password. Check email.</p>}

                <div className="flex gap-3">
                    <Button type="button" variant="outline" className="w-1/2" onClick={() => setShowForgot(false)}>Cancel</Button>
                    <Button type="submit" className="w-1/2">Update</Button>
                </div>
            </form>
        </div>
      )}
    </div>
  );
}
