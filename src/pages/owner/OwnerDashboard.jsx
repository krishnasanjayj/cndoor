import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './OwnerDashboard.css';

export default function OwnerDashboard() {
  const { queries } = useAppData();
  const { user } = useAuth();

  const totalQueries = queries.length;
  const pendingQueries = queries.filter(q => q.status === 'pending').length;
  const repliedQueries = queries.filter(q => q.status === 'replied').length;
  const uniqueClients = new Set(queries.map(q => q.clientId)).size;

  const recentQueries = queries.slice(0, 5);

  return (
    <div className="owner-dashboard">
      <div className="owner-dashboard-header">
        <h1 className="owner-dashboard-title">Welcome back, {user?.name}</h1>
        <p className="owner-dashboard-subtitle">Here's an overview of your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="owner-stats-grid">
        <div className="owner-stat-card">
          <div className="owner-stat-icon-wrapper-info">
            <FileText size={24} />
          </div>
          <div className="owner-stat-value owner-stat-value-primary">{totalQueries}</div>
          <div className="owner-stat-label">Total Quotations</div>
        </div>
        
        <div className="owner-stat-card">
          <div className="owner-stat-icon-wrapper-warning">
            <Clock size={24} />
          </div>
          <div className="owner-stat-value owner-stat-value-warning">{pendingQueries}</div>
          <div className="owner-stat-label">Pending Review</div>
        </div>

        <div className="owner-stat-card">
          <div className="owner-stat-icon-wrapper-success">
            <CheckCircle size={24} />
          </div>
          <div className="owner-stat-value owner-stat-value-success">{repliedQueries}</div>
          <div className="owner-stat-label">Replied Queries</div>
        </div>

        <div className="owner-stat-card">
          <div className="owner-stat-icon-wrapper-gold">
            <Users size={24} />
          </div>
          <div className="owner-stat-value owner-stat-value-primary">{uniqueClients}</div>
          <div className="owner-stat-label">Unique Clients</div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="owner-table-card">
        <div className="owner-table-header">
          <h3 className="owner-table-title">Recent Quotation Requests</h3>
          <Link to="/owner/queries" className="owner-btn-outline">View All</Link>
        </div>
        
        {recentQueries.length === 0 ? (
           <div className="owner-table-empty">No recent queries found.</div>
        ) : (
          <div className="owner-table-wrapper">
            <table className="owner-table">
              <thead>
                <tr className="owner-table-head-row">
                  <th className="owner-table-th">Client</th>
                  <th className="owner-table-th">Product</th>
                  <th className="owner-table-th">Date</th>
                  <th className="owner-table-th">Status</th>
                  <th className="owner-table-th owner-table-th-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentQueries.map(q => (
                  <tr key={q.id} className="owner-table-row">
                    <td className="owner-table-td">
                      <div className="owner-client-name">{q.clientName}</div>
                      <div className="owner-client-email">{q.clientEmail}</div>
                    </td>
                    <td className="owner-table-td">
                      <div className="owner-product-type">{q.productType}</div>
                      <div className="owner-product-details">Qty: {q.quantity} • {q.width}x{q.height}ft</div>
                    </td>
                    <td className="owner-date-cell">{new Date(q.submittedAt).toLocaleDateString()}</td>
                    <td className="owner-table-td">
                      <span className={`owner-status-badge ${q.status === 'pending' ? 'owner-status-pending' : 'owner-status-replied'}`}>
                        {q.status === 'pending' ? 'Pending' : 'Replied'}
                      </span>
                    </td>
                    <td className="owner-table-td owner-table-td-right">
                      <Link to={`/owner/queries/${q.id}`} className="owner-action-btn">
                        {q.status === 'pending' ? 'Reply' : 'View'}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
