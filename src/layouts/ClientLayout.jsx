import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, Home, Grid3x3, Layers, FileText, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/client', label: 'Home', icon: Home, end: true },
  { to: '/client/products', label: 'Products', icon: Grid3x3 },
  { to: '/client/materials', label: 'Materials', icon: Layers },
  { to: '/client/quotation', label: 'Get Quotation', icon: FileText },
  { to: '/client/queries', label: 'My Queries', icon: MessageSquare },
];

export default function ClientLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-bgPrimary">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-[100] bg-[#0a0e1a]/92 backdrop-blur-md border-b border-borderBase">
        <div className="flex items-center justify-between px-6 h-[68px] gap-6">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-gold to-goldDark rounded-sm flex items-center justify-center text-[#0a0e1a] font-bold">
              <Building2 size={20} />
            </div>
            <span className="font-heading text-base font-bold text-textPrimary tracking-[0.02em]">PrimeVision UPVC</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[0.88rem] font-medium transition-colors whitespace-nowrap ${isActive ? 'text-gold bg-goldGlow' : 'text-textMuted hover:text-textPrimary hover:bg-white/5'}`}
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-[34px] h-[34px] bg-gradient-to-br from-gold to-goldDark rounded-full flex items-center justify-center text-xs font-bold text-[#0a0e1a]">{user?.avatar}</div>
            <span className="hidden lg:block text-[0.85rem] font-medium text-textSecondary">{user?.name}</span>
            <button className="hidden lg:flex items-center gap-2 rounded-md font-semibold transition-all px-4 py-2 text-[0.82rem] bg-white/5 text-textPrimary border border-borderBase hover:bg-white/10 hover:border-borderAccent" onClick={handleLogout} id="client-logout-btn">
              <LogOut size={15} /> Logout
            </button>
            <button className="flex lg:hidden bg-transparent border-none text-textPrimary cursor-pointer p-1.5" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="flex flex-col px-4 pt-3 pb-4 border-t border-borderBase gap-1 lg:hidden">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `flex items-center gap-2.5 px-3.5 py-3 rounded-md text-[0.9rem] transition-colors ${isActive ? 'text-gold bg-goldGlow' : 'text-textMuted'}`}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
            <button className="flex justify-center items-center gap-2 rounded-md font-semibold transition-all px-4 py-2 text-[0.9rem] bg-white/5 text-textPrimary border border-borderBase hover:bg-white/10 hover:border-borderAccent mt-2" onClick={handleLogout}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="min-h-[calc(100vh-68px)]">
        <Outlet />
      </main>
    </div>
  );
}
