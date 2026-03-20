import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OwnerDashboard() {
  const { queries } = useAppData();
  const { user } = useAuth();

  const totalQueries = queries.length;
  const pendingQueries = queries.filter(q => q.status === 'pending').length;
  const repliedQueries = queries.filter(q => q.status === 'replied').length;
  const uniqueClients = new Set(queries.map(q => q.clientId)).size;

  const recentQueries = queries.slice(0, 5);

  return (
    <div className="min-h-[calc(100vh-72px)] animate-fade-in py-8 px-6 lg:px-12">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-textPrimary leading-[1.2] text-[1.8rem]">Welcome back, {user?.name}</h1>
        <p className="text-base text-textSecondary mt-2">Here's an overview of your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_8px_40px_rgba(212,175,55,0.2)]">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-info/10 text-info">
            <FileText size={24} />
          </div>
          <div className="text-[2rem] font-heading font-bold mb-1 text-textPrimary">{totalQueries}</div>
          <div className="text-[0.85rem] text-textSecondary font-medium tracking-wide">Total Quotations</div>
        </div>
        
        <div className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_8px_40px_rgba(212,175,55,0.2)]">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-warning/10 text-warning">
            <Clock size={24} />
          </div>
          <div className="text-[2rem] font-heading font-bold mb-1 text-warning">{pendingQueries}</div>
          <div className="text-[0.85rem] text-textSecondary font-medium tracking-wide">Pending Review</div>
        </div>

        <div className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_8px_40px_rgba(212,175,55,0.2)]">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-success/10 text-success">
            <CheckCircle size={24} />
          </div>
          <div className="text-[2rem] font-heading font-bold mb-1 text-success">{repliedQueries}</div>
          <div className="text-[0.85rem] text-textSecondary font-medium tracking-wide">Replied Queries</div>
        </div>

        <div className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_8px_40px_rgba(212,175,55,0.2)]">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-gold/10 text-gold">
            <Users size={24} />
          </div>
          <div className="text-[2rem] font-heading font-bold mb-1 text-textPrimary">{uniqueClients}</div>
          <div className="text-[0.85rem] text-textSecondary font-medium tracking-wide">Unique Clients</div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-borderBase">
          <h3 className="font-heading font-semibold text-textPrimary text-[1.1rem]">Recent Quotation Requests</h3>
          <Link to="/owner/queries" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-[0.8rem] font-semibold transition-all cursor-pointer bg-white/5 text-gold border border-borderBase hover:bg-white/10 hover:border-borderAccent">View All</Link>
        </div>
        
        {recentQueries.length === 0 ? (
           <div className="flex items-center justify-center text-textMuted py-12">No recent queries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-borderBase bg-white/5">
                  <th className="font-semibold text-textMuted text-[0.8rem] uppercase tracking-wider px-6 py-4">Client</th>
                  <th className="font-semibold text-textMuted text-[0.8rem] uppercase tracking-wider px-6 py-4">Product</th>
                  <th className="font-semibold text-textMuted text-[0.8rem] uppercase tracking-wider px-6 py-4">Date</th>
                  <th className="font-semibold text-textMuted text-[0.8rem] uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="font-semibold text-textMuted text-[0.8rem] uppercase tracking-wider px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentQueries.map(q => (
                  <tr key={q.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 align-middle">
                      <div className="font-semibold text-textPrimary">{q.clientName}</div>
                      <div className="text-textMuted text-[0.8rem]">{q.clientEmail}</div>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <div className="text-textPrimary">{q.productType}</div>
                      <div className="text-textMuted text-[0.8rem]">Qty: {q.quantity} • {q.width}x{q.height}ft</div>
                    </td>
                    <td className="px-6 py-4 align-middle text-textSecondary">{new Date(q.submittedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 align-middle">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.75rem] font-bold tracking-wide uppercase whitespace-nowrap ${q.status === 'pending' ? 'bg-warning/15 text-warning border border-warning/25' : 'bg-success/15 text-success border border-success/25'}`}>
                        {q.status === 'pending' ? 'Pending' : 'Replied'}
                      </span>
                    </td>
                    <td className="px-6 py-4 align-middle text-right">
                      <Link to={`/owner/queries/${q.id}`} className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-[0.8rem] font-semibold transition-all cursor-pointer bg-transparent text-gold border-[1.5px] border-gold hover:bg-goldGlow hover:-translate-y-[2px] whitespace-nowrap">
                        {q.status === 'pending' ? 'Reply' : 'View'}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
