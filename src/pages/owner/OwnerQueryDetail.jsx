import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { ArrowLeft, User, MapPin, Package, Calendar, MessageSquare, IndianRupee, Send } from 'lucide-react';

export default function OwnerQueryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { queries, replyToQuery } = useAppData();
  
  const [query, setQuery] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [priceEstimate, setPriceEstimate] = useState('');

  useEffect(() => {
    const q = queries.find(q => q.id === id);
    if (q) {
      setQuery(q);
      setReplyText(q.reply || '');
      setPriceEstimate(q.estimatedPrice?.toString() || '');
    }
  }, [id, queries]);

  if (!query) return <div className="p-16 text-center text-textMuted animate-pulse">Loading...</div>;

  const handleReplySubmit = (e) => {
    e.preventDefault();
    replyToQuery(query.id, replyText, priceEstimate);
    
    // Auto-generate a beautifully pre-filled email to the customer
    const subject = encodeURIComponent(`PrimeVision UPVC - Response to your Query #${query.id.toUpperCase()}`);
    let bodyText = `Hello ${query.clientName},\n\nThank you for reaching out to PrimeVision UPVC! We have reviewed your request for ${query.productType} (${query.quantity} units). \n\nHere is our response:\n\n${replyText}\n`;
    
    if (priceEstimate) {
      bodyText += `\nEstimated Price: ₹${priceEstimate}\n`;
    }
    
    bodyText += `\nBest Regards,\nThe PrimeVision UPVC Team\nPhone: +91 94454-77574`;
    
    const mailtoUrl = `mailto:${query.clientEmail}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    
    // Safely trigger the default mail client without breaking React Router navigation
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    navigate('/owner/queries');
  };

  return (
    <div className="p-4 sm:p-8 min-h-[calc(100vh-72px)] max-w-[1000px] mx-auto animate-fade-in">
      
      <button 
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-[0.85rem] font-semibold transition-all cursor-pointer bg-white/5 text-textPrimary border border-borderBase hover:bg-white/10 hover:border-borderAccent mb-6" 
        onClick={() => navigate('/owner/queries')}
      >
        <ArrowLeft size={16} /> Back to Queries
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading font-bold text-textPrimary leading-[1.2] text-[1.8rem]">Query {query.id.toUpperCase()}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.75rem] font-bold tracking-wide uppercase whitespace-nowrap ${query.status === 'pending' ? 'bg-warning/15 text-warning border border-warning/25' : 'bg-success/15 text-success border border-success/25'}`}>
              {query.status.toUpperCase()}
            </span>
            <span className="text-textMuted flex items-center gap-1.5 text-[0.85rem]">
              <Calendar size={14} /> Submitted: {new Date(query.submittedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Client Details */}
        <div className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-6">
          <h3 className="flex items-center gap-2 mb-4 font-heading text-gold uppercase text-[0.9rem] tracking-widest font-bold">
            <User size={16} /> Client Information
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-textMuted text-[0.8rem] mb-0.5">Name</div>
              <div className="text-textPrimary font-semibold">{query.clientName}</div>
            </div>
            <div>
              <div className="text-textMuted text-[0.8rem] mb-0.5">Email</div>
              <div className="text-textPrimary">{query.clientEmail}</div>
            </div>
            <div>
              <div className="text-textMuted text-[0.8rem] mb-0.5">Phone</div>
              <div className="text-textPrimary">{query.clientPhone}</div>
            </div>
            <div>
              <div className="text-textMuted text-[0.8rem] mb-1">Installation Address</div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span className="text-textPrimary text-[0.95rem] leading-snug">{query.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-6">
          <h3 className="flex items-center gap-2 mb-4 font-heading text-gold uppercase text-[0.9rem] tracking-widest font-bold">
            <Package size={16} /> Requirements
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-textMuted text-[0.8rem] mb-0.5">Product Type</div>
              <div className="text-textPrimary font-semibold">{query.productType}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-textMuted text-[0.8rem] mb-0.5">Quantity</div>
                <div className="text-textPrimary">{query.quantity} units</div>
              </div>
              <div>
                <div className="text-textMuted text-[0.8rem] mb-0.5">Dimensions</div>
                <div className="text-textPrimary">{query.width}ft × {query.height}ft</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-borderBase">
            <h3 className="flex items-center gap-2 mb-2 font-heading text-gold uppercase text-[0.8rem] tracking-widest font-bold">
              <MessageSquare size={14} /> Client Message
            </h3>
            <p className="text-textSecondary text-[0.95rem] leading-relaxed whitespace-pre-wrap">
              {query.message || <span className="text-textMuted italic">No additional message provided.</span>}
            </p>
          </div>
        </div>
      </div>

      {/* Reply Section */}
      <div className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-8">
        <h3 className="font-heading font-bold text-textPrimary leading-[1.2] mb-6 text-[1.4rem]">
          {query.status === 'replied' ? 'Your Reply' : 'Draft Reply'}
        </h3>
        
        <form onSubmit={handleReplySubmit}>
          <div className="flex flex-col gap-1.5 mb-6">
            <label className="text-[0.85rem] font-medium text-textSecondary tracking-[0.02em]">Response Message *</label>
            <textarea 
              className="bg-white/5 border-[1.5px] border-borderBase rounded-md text-textPrimary py-3 px-4 text-[0.9rem] transition-colors w-full focus:border-gold focus:bg-gold/5 focus:ring-[3px] focus:ring-gold/10 outline-none placeholder:text-textMuted min-h-[150px] resize-y" 
              required
              placeholder="Type your response, confirm availability, or request site survey timing..."
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              disabled={query.status === 'replied'}
            />
          </div>

          <div className="flex flex-col gap-1.5 mb-8 max-w-[300px]">
            <label className="text-[0.85rem] font-medium text-textSecondary tracking-[0.02em]">Estimated Price (₹)</label>
            <div className="relative flex items-center">
              <IndianRupee size={16} className="text-textMuted absolute left-3.5" />
              <input 
                type="number" 
                className="bg-white/5 border-[1.5px] border-borderBase rounded-md text-textPrimary py-3 pl-10 pr-4 text-[0.9rem] transition-colors w-full focus:border-gold focus:bg-gold/5 focus:ring-[3px] focus:ring-gold/10 outline-none placeholder:text-textMuted" 
                placeholder="e.g. 45000"
                value={priceEstimate}
                onChange={e => setPriceEstimate(e.target.value)}
                disabled={query.status === 'replied'}
              />
            </div>
            <div className="text-textMuted text-[0.75rem] mt-1">Leave blank if a site survey is required first.</div>
          </div>

          {query.status === 'pending' ? (
            <div className="flex justify-end mt-6 pt-6 border-t border-borderBase">
              <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-8 rounded-md text-[1rem] font-semibold transition-all cursor-pointer bg-gradient-to-br from-gold to-goldDark text-[#0a0e1a] shadow-gold hover:from-goldLight hover:to-gold hover:-translate-y-[2px] hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)]">
                Send Reply <Send size={18} />
              </button>
            </div>
          ) : (
            <div className="flex justify-end mt-6 pt-6 border-t border-borderBase">
              <div className="text-success font-semibold flex items-center gap-2">
                <CheckCircle2 size={20} /> Reply Sent on {new Date(query.repliedAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </form>
      </div>

    </div>
  );
}
