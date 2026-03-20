import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, LayoutDashboard, MessageSquare, Package, LogOut, ChevronRight } from 'lucide-react';

const navItems = [
  { to: '/owner', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/owner/queries', label: 'Client Queries', icon: MessageSquare },
  { to: '/owner/products', label: 'Products', icon: Package },
];

export default function OwnerLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-bgPrimary">
      {/* Sidebar */}
      <aside className="w-[260px] max-lg:w-[220px] bg-bgSecondary border-r border-borderBase flex flex-col fixed top-0 left-0 h-screen z-[100] overflow-y-auto">
        <div className="flex items-center gap-3 px-5 pt-6 pb-5 border-b border-borderBase">
          <div className="w-9 h-9 bg-gradient-to-br from-gold to-goldDark rounded-sm flex items-center justify-center text-[#0a0e1a] font-bold shrink-0">
            <Building2 size={20} />
          </div>
          <div>
            <div className="font-heading text-[0.95rem] font-bold text-textPrimary">CN Doors</div>
            <div className="text-[0.7rem] text-gold font-medium tracking-[0.05em]">Business Portal</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-5 border-b border-borderBase">
          <div className="w-[42px] h-[42px] bg-gradient-to-br from-gold to-goldDark rounded-full flex items-center justify-center text-[0.85rem] font-bold text-[#0a0e1a] shrink-0">{user?.avatar}</div>
          <div>
            <div className="text-[0.88rem] font-semibold text-textPrimary">{user?.name}</div>
            <div className="text-[0.75rem] text-gold mt-0.5 font-medium">Business Owner</div>
          </div>
        </div>

        <nav className="flex-1 py-5 px-3 flex flex-col gap-1">
          <div className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-textMuted px-2 mb-2">Navigation</div>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `group flex items-center gap-3 px-3.5 py-3 rounded-md text-[0.88rem] font-medium transition-colors ${isActive ? 'text-gold bg-goldGlow border-l-2 border-gold' : 'text-textMuted hover:text-textPrimary hover:bg-white/5'}`}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  <ChevronRight size={14} className={`ml-auto transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button className="flex items-center gap-2.5 py-4 px-5 bg-transparent border-t border-borderBase text-textMuted text-[0.88rem] cursor-pointer transition-colors font-body w-full hover:text-error hover:bg-[#ef4444]/10" onClick={handleLogout} id="owner-logout-btn">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-[260px] max-lg:ml-[220px] min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
