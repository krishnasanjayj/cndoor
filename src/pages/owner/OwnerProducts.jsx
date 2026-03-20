import { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Plus, Edit2, Trash2, Tag, Search } from 'lucide-react';

export default function OwnerProducts() {
  const { products } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 min-h-[calc(100vh-72px)] lg:p-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="font-heading font-bold text-textPrimary leading-[1.2] text-[1.8rem]">Product Catalog</h1>
          <p className="text-base text-textSecondary mt-2">Manage your UPVC door and window listings.</p>
        </div>
        <div>
          <button className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-md text-[0.9rem] font-semibold transition-all cursor-pointer bg-gradient-to-br from-gold to-goldDark text-[#0a0e1a] shadow-gold hover:from-goldLight hover:to-gold hover:-translate-y-[2px] hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)]">
            <Plus size={16} /> Add New Product
          </button>
        </div>
      </div>

      <div className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] mb-6 py-4 px-6">
        <div className="flex items-center gap-3 w-full max-w-[400px]">
          <Search size={18} className="text-textMuted" />
          <input 
            type="text" 
            className="w-full bg-transparent border-none p-0 text-textPrimary text-[0.9rem] placeholder:text-textMuted focus:ring-0 outline-none" 
            placeholder="Search products by name or category..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(p => (
          <div key={p.id} className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_8px_40px_rgba(212,175,55,0.2)]">
            <div className="h-[160px] bg-gradient-to-tr from-[#121a2e] to-[#1a243d] flex items-center justify-center relative border-b border-white/10">
              <span className="text-textSecondary text-[2.5rem]">
                {p.category === 'windows' ? '🪟' : '🚪'}
              </span>
              {p.popular && (
                <div className="absolute top-3 right-3 text-[0.7rem] font-bold tracking-widest uppercase py-1 px-2.5 rounded-full bg-goldGlow text-gold border border-borderAccent">
                  Popular
                </div>
              )}
            </div>
            
            <div className="flex flex-col flex-1 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-textPrimary text-[1.1rem]">{p.name}</h3>
                <div className="text-gold font-bold text-[0.95rem]">₹{p.pricePerSqft}/sqft</div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-2 py-1 rounded bg-info/15 text-info border border-info/25 text-[0.7rem] font-semibold capitalize tracking-wide">{p.category}</span>
                <span className="flex items-center gap-1 text-textMuted text-[0.75rem]">
                  <Tag size={12} /> Min: {p.minSize}
                </span>
              </div>
              
              <p className="text-textSecondary text-[0.85rem] leading-relaxed truncate" title={p.description}>
                {p.description}
              </p>
            </div>
            
            <div className="flex border-t border-white/10">
              <button className="flex-1 py-3 flex items-center justify-center gap-2 text-textSecondary text-[0.9rem] font-medium transition-colors hover:bg-white/5 hover:text-textPrimary">
                <Edit2 size={14} /> Edit
              </button>
              <div className="w-[1px] bg-white/10" />
              <button className="flex-1 py-3 flex items-center justify-center gap-2 text-error text-[0.9rem] font-medium transition-colors hover:bg-error/10">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center text-textMuted py-16">
          No products found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}
