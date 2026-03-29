import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Shield, Activity, FileText, Bell, Settings, Info,
  User, Search, Download, Trash2, ChevronLeft, ChevronRight,
  RefreshCw
} from 'lucide-react';
import '../styles/Pages.css';

const NAV_ITEMS = ['Dashboard', 'Threat Log', 'Alerts', 'Settings', 'About'];
const ROUTE_MAP = {
  'Dashboard':  '/dashboard',
  'Threat Log': '/threat-log',
  'Alerts':     '/alerts',
  'Settings':   '/settings',
  'About':      '/about',
};

const logsData = [
  { time: '10:38 AM', process: 'ranomgmere.py',  pid: '7807', action: 'Sequential Write', risk: 'HIGH',   reason: 'High file rename rate',         score: '0.59' },
  { time: '10:36 AM', process: 'softlooa.exe',   pid: '3508', action: 'Mass Rename',      risk: 'MEDIUM', reason: 'Dak Dogrt shere',               score: '0.30' },
  { time: '10:38 AM', process: 'ranaonomy.exe',  pid: '9608', action: 'Sequential Write', risk: 'HIGH',   reason: 'Vatse cor top ralck',           score: '0.85' },
  { time: '10:38 AM', process: 'ranooncy.exe',   pid: '7608', action: 'VSS Delete',       risk: 'HIGH',   reason: 'Dak dutilbes fraftre',          score: '0.26' },
  { time: '10:17 AM', process: 'softlooa.rere',  pid: '7601', action: 'Registry Change',  risk: 'SAFE',   reason: 'Doos oolpoes tame haolr.',      score: '0.50' },
];

const RiskBadge = ({ level }) => {
  const styles = {
    HIGH:   { color: '#ef4444', bg: 'rgba(239,68,68,0.12)'   },
    MEDIUM: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
    SAFE:   { color: '#10b981', bg: 'rgba(16,185,129,0.12)'  },
  };
  const s = styles[level] || styles.SAFE;
  return (
    <span style={{
      padding: '2px 8px', borderRadius: '4px', fontSize: '0.62rem',
      fontWeight: 700, border: `1px solid ${s.color}`,
      color: s.color, background: s.bg, whiteSpace: 'nowrap'
    }}>{level}</span>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="dash-navbar">
      <div className="nav-brand">
        <div className="nav-logo-icon"><Shield size={18} /></div>
        <span className="nav-brand-name">CYBER SENTINEL</span>
      </div>
      <div className="nav-links">
        {NAV_ITEMS.map(item => (
          <button
            key={item}
            className={`nav-link ${location.pathname === ROUTE_MAP[item] ? 'active' : ''}`}
            onClick={() => navigate(ROUTE_MAP[item])}
          >
            {item === 'Dashboard'  && <Activity size={13} />}
            {item === 'Threat Log' && <FileText  size={13} />}
            {item === 'Alerts'     && <Bell      size={13} />}
            {item === 'Settings'   && <Settings  size={13} />}
            {item === 'About'      && <Info      size={13} />}
            {item}
          </button>
        ))}
      </div>
      <div className="nav-actions">
        <button className="nav-icon-btn"><Bell size={16} /><span className="notif-badge">7</span></button>
        <button className="nav-icon-btn"><Settings size={16} /></button>
        <button className="nav-icon-btn"><User size={16} /></button>
      </div>
    </nav>
  );
};

export default function ThreatLog() {
  const [activeRisk, setActiveRisk] = useState('All');
  const [search, setSearch]         = useState('');
  const [page, setPage]             = useState(1);

  const filtered = logsData.filter(l => {
    if (activeRisk === 'High Risk' && l.risk !== 'HIGH')   return false;
    if (activeRisk === 'Medium'    && l.risk !== 'MEDIUM') return false;
    if (activeRisk === 'Safe'      && l.risk !== 'SAFE')   return false;
    if (search && !l.process.toLowerCase().includes(search.toLowerCase()) &&
        !l.action.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <FileText size={16} className="page-header-icon" />
          <h2 className="page-title">Threat Log</h2>
        </div>

        <div className="card page-card">
          {/* Filter & Search */}
          <div className="tl-top-row">
            <div className="chip-row">
              {['All', 'High Risk', 'Medium', 'Safe'].map(f => (
                <button
                  key={f}
                  onClick={() => setActiveRisk(f)}
                  className={`filter-chip
                    ${f === 'High Risk' ? 'chip-high' : ''}
                    ${f === 'Medium'    ? 'chip-med'  : ''}
                    ${f === 'Safe'      ? 'chip-safe' : ''}
                    ${activeRisk === f  ? 'chip-active' : ''}
                  `}
                >{f}</button>
              ))}
            </div>
            <div className="tl-search-wrap">
              <Search size={13} className="tl-search-icon" />
              <input
                className="tl-search"
                placeholder="Search PID or Process name"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Process</th>
                <th>PID</th>
                <th>Action</th>
                <th>Risk</th>
                <th>Reason</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr key={i}>
                  <td>{log.time}</td>
                  <td><span className="p-name">{log.process}</span></td>
                  <td><span className="p-id">{log.pid}</span></td>
                  <td>{log.action}</td>
                  <td><RiskBadge level={log.risk} /></td>
                  <td className="reason-cell">{log.reason}</td>
                  <td><span className="score-badge">{log.score}</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination-row">
            <span className="page-info">Showing {filtered.length} of {logsData.length} entries</span>
            <div className="page-controls">
              <button className="pg-btn" onClick={() => setPage(p => Math.max(1, p-1))}><ChevronLeft size={13} /></button>
              <button className="pg-btn pg-active">{page}</button>
              <button className="pg-btn" onClick={() => setPage(p => p+1)}><ChevronRight size={13} /></button>
            </div>
          </div>

          {/* Footer */}
          <div className="tl-footer">
            <button className="tl-action-btn"><Download size={13} /> Export Logs</button>
            <button className="tl-action-btn"><FileText size={13} /> CSV</button>
            <button className="tl-action-btn"><FileText size={13} /> PDF</button>
            <button className="tl-action-btn danger"><Trash2 size={13} /> Clear Logs</button>
          </div>
        </div>
      </div>
    </div>
  );
}
