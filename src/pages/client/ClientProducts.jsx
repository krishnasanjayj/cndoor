import { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Tag, Ruler, Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClientProducts() {
  const { products } = useAppData();
  const [filter, setFilter] = useState('all');

  const filteredProducts = products.filter(p => filter === 'all' || p.category === filter);

  return (
    <div className="p-4 sm:p-8 min-h-[calc(100vh-72px)] animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="font-heading text-[2.2rem] font-bold text-textPrimary leading-[1.2]">Products Gallery</h1>
          <p className="text-base text-textSecondary mt-2">Explore our premium range of UPVC doors and windows.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[0.85rem] font-semibold transition-all cursor-pointer whitespace-nowrap ${filter === 'all' ? 'bg-gradient-to-br from-gold to-goldDark text-[#0a0e1a] shadow-gold hover:from-goldLight hover:to-gold hover:-translate-y-[2px] hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)]' : 'bg-white/5 text-textPrimary border border-borderBase hover:bg-white/10 hover:border-borderAccent'}`} onClick={() => setFilter('all')}>All Products</button>
          <button className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[0.85rem] font-semibold transition-all cursor-pointer whitespace-nowrap ${filter === 'windows' ? 'bg-gradient-to-br from-gold to-goldDark text-[#0a0e1a] shadow-gold hover:from-goldLight hover:to-gold hover:-translate-y-[2px] hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)]' : 'bg-white/5 text-textPrimary border border-borderBase hover:bg-white/10 hover:border-borderAccent'}`} onClick={() => setFilter('windows')}>Windows</button>
          <button className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[0.85rem] font-semibold transition-all cursor-pointer whitespace-nowrap ${filter === 'doors' ? 'bg-gradient-to-br from-gold to-goldDark text-[#0a0e1a] shadow-gold hover:from-goldLight hover:to-gold hover:-translate-y-[2px] hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)]' : 'bg-white/5 text-textPrimary border border-borderBase hover:bg-white/10 hover:border-borderAccent'}`} onClick={() => setFilter('doors')}>Doors</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-[#121a2e]/70 border border-white/10 rounded-xl backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all hover:border-gold/30 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(212,175,55,0.2)] overflow-hidden flex flex-col group">
            {/* Product Image */}
            <div className="h-[240px] bg-gradient-to-tr from-[#121a2e] to-[#1a243d] flex items-center justify-center relative overflow-hidden">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <span className="text-textSecondary text-5xl">
                  {product.category === 'windows' ? '🪟' : '🚪'}
                </span>
              )}
              {product.popular && (
                <div className="absolute top-3 right-3 text-[0.7rem] font-bold tracking-widest uppercase py-1 px-3 rounded-full bg-goldGlow text-gold border border-borderAccent">
                  Popular
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading text-[1.3rem] font-bold text-textPrimary">{product.name}</h3>
                <div className="text-gold font-bold text-[0.95rem]">₹{product.pricePerSqft}/sqft</div>
              </div>
              <p className="text-textSecondary text-[0.9rem] leading-[1.6] mb-5">
                {product.description}
              </p>

              <div className="flex items-center gap-5 mt-auto mb-6">
                <div className="text-[0.85rem] flex items-center gap-1.5 text-textMuted">
                  <Ruler size={16} className="text-gold" />
                  Min: {product.minSize}
                </div>
                <div className="text-[0.85rem] flex items-center gap-1.5 text-textMuted">
                  <Tag size={16} className="text-gold" />
                  Customizable
                </div>
              </div>

              <div className="border-t border-borderBase pt-4 flex flex-col gap-2 mb-6">
                {product.features.map((f, i) => (
                  <div key={i} className="text-[0.85rem] flex items-center gap-2 text-textSecondary">
                    <Check size={14} className="text-success shrink-0" /> {f}
                  </div>
                ))}
              </div>

              <Link to={`/client/quotation?product=${product.id}`} className="mt-auto w-full inline-flex items-center justify-center gap-2 py-3 rounded-md text-[0.9rem] font-semibold transition-all cursor-pointer bg-transparent text-gold border-[1.5px] border-gold hover:bg-goldGlow hover:-translate-y-[2px]">
                Get Quote for this <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
