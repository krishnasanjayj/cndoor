import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { Send, CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function ClientQuotation() {
  const { products, submitQuery } = useAppData();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([
    { productType: '', width: '', height: '', quantity: '1' }
  ]);
  const [details, setDetails] = useState({
    address: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const prodId = searchParams.get('product');
    if (prodId) {
      const p = products.find(x => x.id === prodId);
      if (p) {
        setItems([{ productType: p.name, width: '', height: '', quantity: '1' }]);
      }
    }
  }, [searchParams, products]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { productType: '', width: '', height: '', quantity: '1' }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validItems = items.filter(item => item.productType);
    if (validItems.length === 0) return;

    submitQuery({
      clientId: user.id,
      clientName: user.name,
      clientEmail: user.email,
      clientPhone: user.phone || 'N/A',
      items: validItems.map(item => ({
        productType: item.productType,
        quantity: Number(item.quantity) || 1,
        width: Number(item.width) || 0,
        height: Number(item.height) || 0,
      })),
      address: details.address,
      message: details.message,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-4 sm:p-8 min-h-[calc(100vh-72px)] flex items-center justify-center animate-fade-in">
        <div className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-12 max-w-[500px] w-full text-center">
          <CheckCircle size={64} className="text-success mx-auto mb-6" />
          <h2 className="font-heading font-bold mb-4 text-[2rem] text-textPrimary">Request Sent!</h2>
          <p className="text-textSecondary mb-8 text-[0.95rem] leading-relaxed">
            Thank you for your inquiry. Our team will review your requirements and send a quotation shortly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-md text-[0.9rem] font-semibold transition-all cursor-pointer bg-transparent text-gold border-[1.5px] border-gold hover:bg-goldGlow hover:-translate-y-[2px]" onClick={() => navigate('/client')}>Back Home</button>
            <button className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-md text-[0.9rem] font-semibold transition-all cursor-pointer bg-gradient-to-br from-gold to-goldDark text-[#0a0e1a] shadow-gold hover:from-goldLight hover:to-gold hover:-translate-y-[2px] hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)]" onClick={() => navigate('/client/queries')}>View My Queries</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 min-h-[calc(100vh-72px)] max-w-[1200px] mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="font-heading text-[2.2rem] font-bold text-textPrimary leading-[1.2]">Get a Free Quotation</h1>
        <p className="text-base text-textSecondary mt-3">Fill out the details below, and we'll get back to you with an estimated price.</p>
      </div>

      <div className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] max-w-[800px] p-8 w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          <div className="flex flex-col gap-6">
            {items.map((item, idx) => (
              <div key={idx} className="p-5 border border-white/10 rounded-lg relative bg-white/[0.02] shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gold font-heading font-bold text-[0.95rem] tracking-wider uppercase">Product {idx + 1}</h3>
                  {items.length > 1 && (
                    <button type="button" onClick={() => handleRemoveItem(idx)} className="text-textMuted hover:text-error transition-colors p-1" title="Remove Product">
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.85rem] font-medium text-textSecondary tracking-[0.02em]">Product Type *</label>
                    <select 
                      className="bg-white/5 border-[1.5px] border-borderBase rounded-md text-textPrimary py-3 px-4 text-[0.9rem] transition-colors w-full focus:border-gold focus:bg-gold/5 focus:ring-[3px] focus:ring-gold/10 outline-none [&>option]:bg-bgCard [&>option]:text-textPrimary" 
                      required
                      value={item.productType}
                      onChange={e => handleItemChange(idx, 'productType', e.target.value)}
                    >
                      <option value="">Select a product...</option>
                      {products.map(p => (
                        <option key={p.id} value={p.name}>{p.name} ({p.category})</option>
                      ))}
                      <option value="Other">Other / Custom</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.85rem] font-medium text-textSecondary tracking-[0.02em]">Quantity *</label>
                    <input 
                      type="number" min="1" className="bg-white/5 border-[1.5px] border-borderBase rounded-md text-textPrimary py-3 px-4 text-[0.9rem] transition-colors w-full focus:border-gold focus:bg-gold/5 focus:ring-[3px] focus:ring-gold/10 outline-none placeholder:text-textMuted" required
                      value={item.quantity}
                      onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.85rem] font-medium text-textSecondary tracking-[0.02em]">Approx Width (feet)</label>
                    <input 
                      type="number" step="0.5" className="bg-white/5 border-[1.5px] border-borderBase rounded-md text-textPrimary py-3 px-4 text-[0.9rem] transition-colors w-full focus:border-gold focus:bg-gold/5 focus:ring-[3px] focus:ring-gold/10 outline-none placeholder:text-textMuted" placeholder="e.g. 4"
                      value={item.width}
                      onChange={e => handleItemChange(idx, 'width', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.85rem] font-medium text-textSecondary tracking-[0.02em]">Approx Height (feet)</label>
                    <input 
                      type="number" step="0.5" className="bg-white/5 border-[1.5px] border-borderBase rounded-md text-textPrimary py-3 px-4 text-[0.9rem] transition-colors w-full focus:border-gold focus:bg-gold/5 focus:ring-[3px] focus:ring-gold/10 outline-none placeholder:text-textMuted" placeholder="e.g. 5"
                      value={item.height}
                      onChange={e => handleItemChange(idx, 'height', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-center sm:justify-start">
              <button type="button" onClick={handleAddItem} className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-gold/50 text-gold rounded-md hover:bg-gold/10 transition-colors text-[0.9rem] font-medium w-full sm:w-auto">
                <Plus size={16} /> Add Another Product
              </button>
            </div>
          </div>
          
          <div className="h-px bg-white/10 w-full my-4"></div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[0.85rem] font-medium text-textSecondary tracking-[0.02em]">Installation Address *</label>
            <input 
              type="text" className="bg-white/5 border-[1.5px] border-borderBase rounded-md text-textPrimary py-3 px-4 text-[0.9rem] transition-colors w-full focus:border-gold focus:bg-gold/5 focus:ring-[3px] focus:ring-gold/10 outline-none placeholder:text-textMuted" required placeholder="Full address for site survey"
              value={details.address}
              onChange={e => setDetails({...details, address: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[0.85rem] font-medium text-textSecondary tracking-[0.02em]">Additional Details</label>
            <textarea 
              className="bg-white/5 border-[1.5px] border-borderBase rounded-md text-textPrimary py-3 px-4 text-[0.9rem] transition-colors w-full focus:border-gold focus:bg-gold/5 focus:ring-[3px] focus:ring-gold/10 outline-none placeholder:text-textMuted min-h-[100px] resize-y" 
              placeholder="Any specific glass type, color preference (white/wood finish), or special requirements?"
              value={details.message}
              onChange={e => setDetails({...details, message: e.target.value})}
            />
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-8 rounded-md text-[1rem] font-semibold transition-all cursor-pointer bg-gradient-to-br from-gold to-goldDark text-[#0a0e1a] shadow-gold hover:from-goldLight hover:to-gold hover:-translate-y-[2px] hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)]">
              Submit Request <Send size={18} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
