import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { Clock, CheckCircle2, IndianRupee } from 'lucide-react';

export default function ClientQueries() {
  const { getClientQueries } = useAppData();
  const { user } = useAuth();
  
  const myQueries = getClientQueries(user.id);

  return (
    <div className="p-4 sm:p-8 min-h-[calc(100vh-72px)] max-w-[1200px] mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="font-heading text-[2.2rem] font-bold text-textPrimary leading-[1.2]">My Queries</h1>
        <p className="text-base text-textSecondary mt-3">Track the status of your quotation requests and correspondence.</p>
      </div>

      {myQueries.length === 0 ? (
        <div className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] text-center p-16">
          <div className="text-textMuted mb-4 text-[3rem]">📋</div>
          <h3 className="font-heading font-bold mb-2 text-[1.4rem] text-textPrimary">No Queries Yet</h3>
          <p className="text-textSecondary text-[0.95rem]">You haven't requested any quotations yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {myQueries.map(q => (
            <div key={q.id} className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col p-6 transition-all hover:border-gold/30 hover:shadow-[0_8px_40px_rgba(212,175,55,0.2)]">
              <div className="flex flex-wrap gap-4 items-center justify-between border-b border-borderBase pb-4 mb-4">
                <div>
                  <h3 className="font-heading font-bold mb-1 text-[1.2rem] text-textPrimary">{q.productType}</h3>
                  <div className="text-textMuted text-[0.85rem]">
                    Submitted: {new Date(q.submittedAt).toLocaleDateString()} at {new Date(q.submittedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
                <div>
                  {q.status === 'pending' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.85rem] font-semibold bg-warning/15 text-warning border border-warning/25"><Clock size={14} /> Pending Review</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.85rem] font-semibold bg-success/15 text-success border border-success/25"><CheckCircle2 size={14} /> Replied</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-b border-borderBase pb-4 mb-6">
                <div>
                  <div className="text-[0.8rem] font-semibold tracking-widest uppercase text-gold">Dimensions</div>
                  <div className="text-textPrimary mt-1 font-semibold">{q.width}ft × {q.height}ft</div>
                </div>
                <div>
                  <div className="text-[0.8rem] font-semibold tracking-widest uppercase text-gold">Quantity</div>
                  <div className="text-textPrimary mt-1 font-semibold">{q.quantity} units</div>
                </div>
                <div>
                  <div className="text-[0.8rem] font-semibold tracking-widest uppercase text-gold">Address</div>
                  <div className="text-textPrimary mt-1 truncate" title={q.address}>{q.address}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-4 rounded-md">
                  <div className="text-[0.8rem] font-semibold tracking-widest uppercase text-gold mb-2">Your Message</div>
                  <p className="text-textSecondary text-[0.9rem] whitespace-pre-wrap">{q.message}</p>
                </div>
                
                {q.status === 'replied' ? (
                  <div className="bg-gold/5 border border-borderAccent p-4 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[0.8rem] font-semibold tracking-widest uppercase text-gold">Business Reply</div>
                      <div className="text-textMuted text-[0.75rem]">
                        {new Date(q.repliedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-textPrimary text-[0.9rem] whitespace-pre-wrap">{q.reply}</p>
                    
                    {q.estimatedPrice && (
                      <div className="mt-4 pt-4 flex items-center justify-between border-t border-dashed border-borderAccent">
                        <div className="text-textSecondary text-[0.9rem]">Estimated Price:</div>
                        <div className="text-gold font-heading font-bold text-[1.4rem] flex items-center">
                          <IndianRupee size={20} className="mr-1" />
                          {q.estimatedPrice.toLocaleString('en-IN')}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-center bg-white/5 p-4 rounded-md">
                    <span className="text-textMuted text-[0.9rem]">Waiting for business owner to reply...</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
