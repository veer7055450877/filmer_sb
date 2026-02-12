import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, Phone, Calendar, Trash2, RefreshCw } from 'lucide-react';
import Button from '../../components/ui/Button';
import SEO from '../../components/seo/SEO';
import axios from 'axios';
import { IS_PRODUCTION, ENDPOINTS } from '../../config';

interface Request {
  id: number;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  event_date?: string;
  date?: string;
  message: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Wrap in useCallback to prevent recreation on every render
  const fetchData = useCallback(async () => {
      setLoading(true);
      if (IS_PRODUCTION) {
          try {
              const response = await axios.get(ENDPOINTS.FETCH_REQUESTS);
              setRequests(response.data);
          } catch (error) {
              console.error("Failed to fetch requests", error);
          }
      } else {
          // Mock Data Logic
          const storedRequests = JSON.parse(localStorage.getItem('filmer_sb_requests') || '[]');
          if (storedRequests.length === 0) {
            const dummyData = [
                { id: 1, name: "Alice Smith", email: "alice@example.com", phone: "+1 555 0101", eventType: "Wedding Film", date: "2025-06-15", message: "Looking for a cinematic edit for our wedding.", created_at: new Date().toISOString() },
                { id: 2, name: "Bob Jones", email: "bob@studio.com", phone: "+1 555 0102", eventType: "Commercial", date: "2025-04-20", message: "Need a promo video for our new product launch.", created_at: new Date().toISOString() }
            ];
            setRequests(dummyData);
            localStorage.setItem('filmer_sb_requests', JSON.stringify(dummyData));
          } else {
            setRequests(storedRequests);
          }
      }
      setLoading(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('filmer_sb_admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [navigate, fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('filmer_sb_admin_token');
    navigate('/admin');
  };

  const handleDelete = (id: number) => {
    const updated = requests.filter(r => r.id !== id);
    setRequests(updated);
    if (!IS_PRODUCTION) {
        localStorage.setItem('filmer_sb_requests', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-cinematic-black pt-24 pb-12 px-6">
      <SEO title="Admin Dashboard" description="Manage incoming booking requests and client communications." />
      
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-white font-serif">Booking Requests</h1>
            {IS_PRODUCTION && (
                <span className="bg-green-900/50 text-green-400 text-xs px-2 py-1 rounded border border-green-500/30">Live DB</span>
            )}
            {!IS_PRODUCTION && (
                <span className="bg-yellow-900/50 text-yellow-400 text-xs px-2 py-1 rounded border border-yellow-500/30">Mock Mode</span>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={fetchData} size="sm" className="border-white/20">
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </Button>
            <Button variant="outline" onClick={handleLogout} size="sm">
                <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {requests.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No requests yet.</p>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="bg-zinc-900 border border-white/10 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{req.name}</h3>
                    <span className="px-3 py-1 bg-gold-500/10 text-gold-500 text-xs font-bold uppercase rounded-full border border-gold-500/20">
                      {req.eventType}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-gray-400">
                     <div className="flex items-center gap-2">
                        <Calendar size={14} /> {req.date || req.event_date || 'No Date'}
                     </div>
                     <div className="text-xs opacity-50">
                        Received: {new Date(req.created_at).toLocaleDateString()}
                     </div>
                  </div>

                  <p className="text-gray-300 bg-black/30 p-4 rounded border border-white/5 text-sm leading-relaxed">
                    "{req.message}"
                  </p>
                </div>

                <div className="flex flex-row md:flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 shrink-0">
                  <a href={`mailto:${req.email}`} className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-bold transition-colors">
                    <Mail size={16} /> Email
                  </a>
                  <a href={`tel:${req.phone}`} className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-bold transition-colors">
                    <Phone size={16} /> Call
                  </a>
                  <button onClick={() => handleDelete(req.id)} className="flex items-center justify-center gap-2 px-4 py-2 bg-red-900/50 hover:bg-red-900 text-red-200 rounded text-sm font-bold transition-colors">
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
