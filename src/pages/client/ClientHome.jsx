import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Wrench, Home as HomeIcon } from 'lucide-react';

export default function ClientHome() {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center py-16 px-6 border-b border-borderBase overflow-hidden bg-[linear-gradient(rgba(10,14,26,0.7),rgba(10,14,26,0.9)),url('../../assets/hero-bg.jpg')] bg-center bg-cover bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_60%)] before:z-[1]">
        <div className="relative z-[2] max-w-[800px] mx-auto text-center animate-fade-in w-full">
          <div className="inline-flex items-center gap-1 py-1 px-2.5 rounded-full text-xs font-semibold tracking-wide bg-goldGlow text-gold border border-borderAccent mb-4">
            Premium Quality UPVC
          </div>
          <h1 className="text-[2.4rem] md:text-[3.5rem] font-extrabold leading-[1.1] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] font-heading text-textPrimary">
            Transform Your Home with <span className="text-gold">PrimeVision</span>
          </h1>
          <p className="text-[1.15rem] text-textSecondary mb-8 max-w-[600px] mx-auto">
            Discover the perfect blend of elegance, security, and energy efficiency with our world-class UPVC doors and windows.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link to="/client/products" className="w-full md:w-auto inline-flex items-center justify-center gap-2 py-4 px-9 rounded-md text-base font-semibold transition-all cursor-pointer bg-gradient-to-br from-gold to-goldDark text-[#0a0e1a] shadow-gold hover:from-goldLight hover:to-gold hover:-translate-y-[2px] hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)]">
              Explore Products <ChevronRight size={18} />
            </Link>
            <Link to="/client/quotation" className="w-full md:w-auto inline-flex items-center justify-center gap-2 py-4 px-9 rounded-md text-base font-semibold transition-all cursor-pointer bg-transparent text-gold border-[1.5px] border-gold hover:bg-goldGlow hover:-translate-y-[2px]">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="md:-mt-10 mt-10 relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-heading text-[2.2rem] font-bold text-textPrimary mt-2 leading-[1.2]">Why Choose PrimeVision?</h2>
          <div className="w-[60px] h-[3px] bg-gradient-to-r from-gold to-transparent rounded-full my-4 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="text-center bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all hover:border-gold/30 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(212,175,55,0.2)]">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={32} className="text-gold" />
            </div>
            <h3 className="mb-2 text-[1.2rem] font-heading font-bold text-textPrimary">Unmatched Security</h3>
            <p className="text-textSecondary text-[0.9rem]">Multi-point locking systems and toughened glass options to keep your home safe and secure.</p>
          </div>

          <div className="text-center bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all hover:border-gold/30 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(212,175,55,0.2)]">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <HomeIcon size={32} className="text-gold" />
            </div>
            <h3 className="mb-2 text-[1.2rem] font-heading font-bold text-textPrimary">Energy Efficient</h3>
            <p className="text-textSecondary text-[0.9rem]">Advanced thermal insulation reduces energy costs and maintains comfortable indoor temperatures.</p>
          </div>

          <div className="text-center bg-[#121a2e]/70 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all hover:border-gold/30 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(212,175,55,0.2)]">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wrench size={32} className="text-gold" />
            </div>
            <h3 className="mb-2 text-[1.2rem] font-heading font-bold text-textPrimary">Low Maintenance</h3>
            <p className="text-textSecondary text-[0.9rem]">Weather-resistant UPVC profiles that never rot, rust, or need repainting. Simply wipe clean.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
