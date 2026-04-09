import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, LayoutDashboard, MessageSquare, Package, LogOut, ChevronRight } from 'lucide-react';
import './OwnerLayout.css';

const navItems = [
  { to: '/owner', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/owner/queries', label: 'Client Queries', icon: MessageSquare },
  { to: '/owner/products', label: 'Products', icon: Package },
];

//const API_KEY = "1234SECRETKEY"
export default function OwnerLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="owner-layout">
      {/* Sidebar */}
      <aside className="owner-sidebar">
        <div className="owner-sidebar-header">
          <div className="owner-sidebar-logo">
            <Building2 size={20} />
          </div>
          <div>
            <div className="owner-sidebar-title">CN Doors</div>
            <div className="owner-sidebar-subtitle">Business Portal</div>
          </div>
        </div>

        <div className="owner-user-profile">
          <div className="owner-user-avatar">{user?.avatar}</div>
          <div>
            <div className="owner-user-name">{user?.name}</div>
            <div className="owner-user-role">Business Owner</div>
          </div>
        </div>

        <nav className="owner-nav">
          <div className="owner-nav-header">Navigation</div>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `group owner-nav-item ${isActive ? 'owner-nav-item-active' : 'owner-nav-item-inactive'}`}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  <ChevronRight size={14} className={`owner-nav-icon ${isActive ? 'owner-nav-icon-active' : 'owner-nav-icon-inactive group-hover:opacity-100'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button className="owner-logout-btn" onClick={handleLogout} id="owner-logout-btn">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main */}
      <main className="owner-main">
        <Outlet />
      </main>
    </div>
  );
}
