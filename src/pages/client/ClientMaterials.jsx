import { useAppData } from '../../context/AppDataContext';
import { CheckCircle2 } from 'lucide-react';

export default function ClientMaterials() {
  const { materials } = useAppData();

  return (
    <div className="p-4 sm:p-8 min-h-[calc(100vh-72px)] animate-fade-in">
      <div className="mb-8">
        <h1 className="font-heading text-[2.2rem] font-bold text-textPrimary leading-[1.2]">Materials & Craftsmanship</h1>
        <p className="text-base text-textSecondary mt-3">Learn about the world-class components used in every PrimeVision product.</p>
        <div className="w-[60px] h-[3px] bg-gradient-to-r from-gold to-transparent rounded-full my-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {materials.map(mat => (
          <div key={mat.id} className="bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all hover:border-gold/30 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(212,175,55,0.2)] flex flex-col sm:flex-row gap-6 p-8">
            <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-goldGlow to-transparent rounded-lg border border-borderAccent flex items-center justify-center text-[2.5rem]">
              {mat.icon}
            </div>
            <div className="flex flex-col">
              <h3 className="font-heading font-bold mb-2 text-[1.4rem] text-textPrimary">
                {mat.name}
              </h3>
              <p className="text-textSecondary mb-4 text-[0.95rem] leading-relaxed">
                {mat.description}
              </p>

              <div className="mb-5 flex-1">
                <div className="text-[0.8rem] font-semibold tracking-widest uppercase text-gold mb-2">Specifications</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mat.specs.map((spec, i) => (
                    <div key={i} className="flex gap-2 items-center text-textMuted text-[0.85rem]">
                      <CheckCircle2 size={14} className="text-gold shrink-0" />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.85rem] font-semibold bg-success/15 text-success border border-success/25 self-start">
                ✨ {mat.benefit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
