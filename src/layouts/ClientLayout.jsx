import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, Home, Grid3x3, FileText, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './ClientLayout.css';

const navItems = [
  { to: '/client', label: 'Home', icon: Home, end: true },
  { to: '/client/products', label: 'Products', icon: Grid3x3 },
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
    <div className="client-layout">
      {/* Top Navbar */}
      <nav className="client-nav">
        <div className="client-nav-container">
          <div className="client-logo-container">
            <div className="client-logo-icon">
              <Building2 size={20} />
            </div>
            <span className="client-logo-text">CN Doors</span>
          </div>

          {/* Desktop Nav */}
          <div className="client-desktop-nav">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `client-nav-item ${isActive ? 'client-nav-item-active' : 'client-nav-item-inactive'}`}
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="client-user-actions">
            <div className="client-user-avatar">{user?.avatar}</div>
            <span className="client-user-name">{user?.name}</span>
            <button className="client-logout-btn-desktop" onClick={handleLogout} id="client-logout-btn">
              <LogOut size={15} /> Logout
            </button>
            <button className="client-mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="client-mobile-menu">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `client-mobile-nav-item ${isActive ? 'client-mobile-nav-item-active' : 'client-mobile-nav-item-inactive'}`}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
            <button className="client-logout-btn-mobile" onClick={handleLogout}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="client-main">
        <Outlet />
      </main>
    </div>
  );
}
