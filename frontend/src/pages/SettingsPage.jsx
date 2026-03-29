import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Shield, Activity, FileText, Bell, Settings, Info,
  User, Download, Lock, Users, Monitor
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

const monitoringData = [
  { time: '10:28 AM', process: 'ranomgmere.py', pid: '2422-17:20', risk: 'HIGH',   reason: 'High file rename rate',          score: '0.25' },
  { time: '10:28 AM', process: 'dobrelie.rere',  pid: '2422-17:20', risk: 'MEDIUM', reason: 'Sequential writes detected',     score: '0.91' },
  { time: '10:31 AM', process: 'raltfooo.rere',  pid: '3622-17:23', risk: 'HIGH',   reason: 'VSS admin delete attempted',     score: '0.90' },
  { time: '10:28 AM', process: 'medtune.exe',    pid: '1h32-17:20', risk: 'SAFE',   reason: 'Normal registry read activity',  score: '0.26' },
];

const LEFT_MENU = [
  { icon: Monitor,  label: 'Monitoring Settings' },
  { icon: Bell,     label: 'Notifications',       active: true },
  { icon: Settings, label: 'System Settings' },
  { icon: Users,    label: 'User Management' },
  { icon: Lock,     label: 'Security Settings' },
];

const RiskBadge = ({ level }) => {
  const styles = {
    HIGH:   { color: '#ef4444', bg: 'rgba(239,68,68,0.12)'  },
    MEDIUM: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    SAFE:   { color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  };
  const s = styles[level] || styles.SAFE;
  return (
    <span style={{
      padding: '2px 8px', borderRadius: '4px', fontSize: '0.62rem',
      fontWeight: 700, border: `1px solid ${s.color}`,
      color: s.color, background: s.bg
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
        <button className="nav-icon-btn"><Bell size={16} /></button>
        <button className="nav-icon-btn"><Settings size={16} /></button>
        <button className="nav-icon-btn"><User size={16} /></button>
      </div>
    </nav>
  );
};

export default function SettingsPage() {
  const [activeSetting, setActiveSetting] = useState('Notifications');
  const [scanInterval,  setScanInterval]  = useState('5s');
  const [sensitivity,   setSensitivity]   = useState('High');

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <Settings size={16} className="page-header-icon" />
          <h2 className="page-title">Settings</h2>
        </div>

        <div className="settings-layout">
          {/* Sidebar */}
          <div className="card settings-sidebar">
            {LEFT_MENU.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className={`settings-menu-item ${activeSetting === label ? 'settings-menu-active' : ''}`}
                onClick={() => setActiveSetting(label)}
              >
                <Icon size={14} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Right panel */}
          <div className="card settings-right-panel">
            <div className="settings-panel-title">Monitoring Settings</div>

            <div className="settings-controls-row">
              <div className="settings-ctrl-group">
                <label className="settings-ctrl-label">Scan Interval</label>
                <div className="sensitivity-tabs">
                  {['5s', '10s', '30s'].map(v => (
                    <button
                      key={v}
                      className={`sens-tab ${scanInterval === v ? 'sens-active-high' : ''}`}
                      onClick={() => setScanInterval(v)}
                    >{v}</button>
                  ))}
                </div>
              </div>
              <div className="settings-ctrl-group">
                <label className="settings-ctrl-label">Sensitivity Level</label>
                <div className="sensitivity-tabs">
                  {['Low', 'Medium', 'High'].map(lvl => (
                    <button
                      key={lvl}
                      className={`sens-tab ${sensitivity === lvl ? `sens-active-${lvl.toLowerCase()}` : ''}`}
                      onClick={() => setSensitivity(lvl)}
                    >{lvl}</button>
                  ))}
                </div>
              </div>
            </div>

            <table className="data-table" style={{ marginTop: '14px' }}>
              <thead>
                <tr>
                  <th>Timestamp / Process</th>
                  <th>Risk</th>
                  <th>Reason</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {monitoringData.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <span className="p-name">{row.process}</span><br />
                      <span className="p-id">{row.pid}</span>
                    </td>
                    <td><RiskBadge level={row.risk} /></td>
                    <td className="reason-cell">{row.reason}</td>
                    <td><span className="score-badge">{row.score}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="tl-footer" style={{ marginTop: '14px' }}>
              <button className="tl-action-btn"><Download size={13} /> Export Logs</button>
              <button className="tl-action-btn"><FileText size={13} /> CSV</button>
              <button className="tl-action-btn"><FileText size={13} /> PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
