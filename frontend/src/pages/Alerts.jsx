import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Shield, Activity, FileText, Bell, Settings, Info,
  User, Download, Trash2, RefreshCw, Volume2, Mail, Smartphone
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

const ALERT_TABS = ['All Alerts', 'High', 'Medium', 'Low', 'False Positive', 'Dismissed'];
const LEFT_ITEMS = ['High', 'Medium', 'Low', 'False Positive', 'Dismissed'];

const ToggleSwitch = ({ on, onToggle }) => (
  <button onClick={onToggle} className={`toggle-switch ${on ? 'on' : ''}`}>
    <span className="toggle-thumb" />
  </button>
);

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

export default function AlertsPage() {
  const [activeTab,   setActiveTab]   = useState('All Alerts');
  const [activeLeft,  setActiveLeft]  = useState('High');
  const [soundAlert,  setSoundAlert]  = useState(true);
  const [popupMode,   setPopupMode]   = useState('High Risk Only');
  const [emailVal,    setEmailVal]    = useState('user@cybersentinel.com');
  const [autoExport,  setAutoExport]  = useState(true);
  const [vibration,   setVibration]   = useState(true);

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <Bell size={16} className="page-header-icon" />
          <h2 className="page-title">Alerts</h2>
        </div>

        <div className="card page-card" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Tab Bar */}
          <div className="alerts-tab-bar">
            {ALERT_TABS.map(tab => (
              <button
                key={tab}
                className={`alert-tab ${activeTab === tab ? 'alert-tab-active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >{tab}</button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px', alignItems: 'center', padding: '0 12px' }}>
              <button className="tl-action-btn"><Download size={12} /> Export Alerts</button>
              <button className="tl-action-btn danger"><Trash2 size={12} /> Clear Alerts</button>
            </div>
          </div>

          {/* Body */}
          <div className="alerts-body-grid">
            {/* Left sidebar */}
            <div className="alerts-left-list">
              <div className="alert-list-item" style={{ fontWeight: 600, color: '#e2e8f0' }}>
                <Bell size={13} /><span>Alerts</span>
              </div>
              {LEFT_ITEMS.map(item => (
                <div
                  key={item}
                  className={`alert-list-item ${activeLeft === item ? 'alert-list-active' : ''}`}
                  onClick={() => setActiveLeft(item)}
                >
                  <span className={`alert-dot ${item.toLowerCase().replace(' ', '-')}`} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Right config */}
            <div className="alerts-config-panel">
              <div className="config-section-title">
                Sound Alert Configuration
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                  <span className="tl-export-badge">CSV</span>
                  <span className="tl-export-badge active-badge">DDF</span>
                </div>
              </div>

              {/* Sound Alert */}
              <div className="config-row">
                <Volume2 size={14} className="config-icon" />
                <span className="config-label">Sound Alert</span>
                <ToggleSwitch on={soundAlert} onToggle={() => setSoundAlert(p => !p)} />
              </div>

              {/* Popup Alert */}
              <div className="config-row">
                <Smartphone size={14} className="config-icon" />
                <span className="config-label">Smart Pop-up Alert</span>
                <div className="popup-mode-toggle">
                  {['High Risk Only', 'All Alerts'].map(m => (
                    <button
                      key={m}
                      className={`popup-mode-btn ${popupMode === m ? 'popup-mode-active' : ''}`}
                      onClick={() => setPopupMode(m)}
                    >{m}</button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="config-row">
                <Mail size={14} className="config-icon" />
                <span className="config-label">Email Notifications</span>
                <input
                  className="config-input"
                  value={emailVal}
                  onChange={e => setEmailVal(e.target.value)}
                />
                <button className="config-mini-btn">Test</button>
              </div>

              <div className="config-divider-label">Others</div>

              {/* Auto Export */}
              <div className="config-row">
                <RefreshCw size={14} className="config-icon green" />
                <span className="config-label">Auto-Export Alert Reports · daily / weekly</span>
                <ToggleSwitch on={autoExport} onToggle={() => setAutoExport(p => !p)} />
              </div>

              {/* Vibration */}
              <div className="config-row">
                <Settings size={14} className="config-icon amber" />
                <span className="config-label">Toggle Vibrations</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                  <span className="config-device-label">Device</span>
                  <ToggleSwitch on={vibration} onToggle={() => setVibration(p => !p)} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button className="save-btn">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
