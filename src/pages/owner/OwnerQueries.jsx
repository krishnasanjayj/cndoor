import { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Link } from 'react-router-dom';

export default function OwnerQueries() {
  const { queries } = useAppData();
  const [filter, setFilter] = useState('all');

  const filteredQueries = queries.filter(q => filter === 'all' || q.status === filter);

  return (
    <div className="p-4 sm:p-8 min-h-[calc(100vh-72px)] lg:p-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="font-heading font-bold text-textPrimary leading-[1.2] text-[1.8rem]">Client Queries</h1>
          <p className="text-base text-textSecondary mt-2">Manage and reply to all incoming quotation requests.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button 
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[0.85rem] font-semibold transition-all cursor-pointer whitespace-nowrap ${filter === 'all' ? 'bg-gradient-to-br from-gold to-goldDark text-[#0a0e1a] shadow-gold hover:from-goldLight hover:to-gold hover:-translate-y-[2px] hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)]' : 'bg-white/5 text-textPrimary border border-borderBase hover:bg-white/10 hover:border-borderAccent'}`}
            onClick={() => setFilter('all')}
          >
            All Queries
          </button>
          <button 
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[0.85rem] font-semibold transition-all cursor-pointer whitespace-nowrap ${filter === 'pending' ? 'bg-warning text-black shadow-none border border-transparent hover:-translate-y-[2px]' : 'bg-white/5 text-textPrimary border border-borderBase hover:bg-white/10 hover:border-borderAccent'}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[0.85rem] font-semibold transition-all cursor-pointer whitespace-nowrap ${filter === 'replied' ? 'bg-success text-white shadow-none border border-transparent hover:-translate-y-[2px]' : 'bg-white/5 text-textPrimary border border-borderBase hover:bg-white/10 hover:border-borderAccent'}`}
            onClick={() => setFilter('replied')}
          >
            Replied
          </button>
        </div>
      </div>

      <div className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] overflow-x-auto">
        {filteredQueries.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-textMuted py-16">
            <div className="text-[3rem] mb-4">📭</div>
            <div>No queries found matching this filter.</div>
          </div>
        ) : (
          <table className="w-full border-collapse text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-borderBase bg-white/5">
                <th className="font-semibold text-textMuted text-[0.8rem] uppercase tracking-wider px-6 py-4">ID #</th>
                <th className="font-semibold text-textMuted text-[0.8rem] uppercase tracking-wider px-6 py-4">Client Name</th>
                <th className="font-semibold text-textMuted text-[0.8rem] uppercase tracking-wider px-6 py-4">Contact</th>
                <th className="font-semibold text-textMuted text-[0.8rem] uppercase tracking-wider px-6 py-4">Product Specs</th>
                <th className="font-semibold text-textMuted text-[0.8rem] uppercase tracking-wider px-6 py-4">Location</th>
                <th className="font-semibold text-textMuted text-[0.8rem] uppercase tracking-wider px-6 py-4">Status</th>
                <th className="font-semibold text-textMuted text-[0.8rem] uppercase tracking-wider px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredQueries.map(q => (
                <tr key={q.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 align-middle font-heading font-semibold text-textMuted">{q.id.toUpperCase()}</td>
                  <td className="px-6 py-4 align-middle font-semibold text-textPrimary">{q.clientName}</td>
                  <td className="px-6 py-4 align-middle">
                    <div className="text-textSecondary text-[0.9rem]">{q.clientPhone}</div>
                    <div className="text-textMuted text-[0.8rem]">{q.clientEmail}</div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="font-medium text-[0.9rem]">
                      {q.items ? q.items[0].productType : q.productType}
                      {q.items && q.items.length > 1 && <span className="ml-1 text-gold text-[0.8rem]">(+{q.items.length - 1} more)</span>}
                    </div>
                    <div className="text-textMuted text-[0.8rem]">
                      Qty: {q.items ? q.items[0].quantity : q.quantity} | {q.items ? q.items[0].width : q.width}x{q.items ? q.items[0].height : q.height}ft
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle max-w-[150px]">
                    <div className="truncate text-[0.9rem]" title={q.address}>
                      {q.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.75rem] font-bold tracking-wide uppercase whitespace-nowrap ${q.status === 'pending' ? 'bg-warning/15 text-warning border border-warning/25' : 'bg-success/15 text-success border border-success/25'}`}>
                      {q.status.toUpperCase()}
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
        )}
      </div>
    </div>
  );
}
