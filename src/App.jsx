import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppDataProvider } from './context/AppDataContext';

// Pages
import Login from './pages/Login';

// Client pages
import ClientHome from './pages/client/ClientHome';
import ClientProducts from './pages/client/ClientProducts';
import ClientQuotation from './pages/client/ClientQuotation';
import ClientQueries from './pages/client/ClientQueries';

// Owner pages
import OwnerDashboard from './pages/owner/OwnerDashboard';
import OwnerQueries from './pages/owner/OwnerQueries';
import OwnerQueryDetail from './pages/owner/OwnerQueryDetail';
import OwnerProducts from './pages/owner/OwnerProducts';

// Layout
import ClientLayout from './layouts/ClientLayout';
import OwnerLayout from './layouts/OwnerLayout';

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'owner' ? '/owner' : '/client'} replace />;
  }
  return children;
}

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === 'owner' ? '/owner' : '/client'} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppDataProvider>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<Login />} />

            {/* Client Portal */}
            <Route path="/client" element={
              <ProtectedRoute requiredRole="client">
                <ClientLayout />
              </ProtectedRoute>
            }>
              <Route index element={<ClientHome />} />
              <Route path="products" element={<ClientProducts />} />
              <Route path="quotation" element={<ClientQuotation />} />
              <Route path="queries" element={<ClientQueries />} />
            </Route>

            {/* Owner Portal */}
            <Route path="/owner" element={
              <ProtectedRoute requiredRole="owner">
                <OwnerLayout />
              </ProtectedRoute>
            }>
              <Route index element={<OwnerDashboard />} />
              <Route path="queries" element={<OwnerQueries />} />
              <Route path="queries/:id" element={<OwnerQueryDetail />} />
              <Route path="products" element={<OwnerProducts />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
