import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  Activity, Shield, Lock, AlertTriangle, FileText,
  Cpu, HardDrive, Play, Pause, RefreshCw, XCircle,
  Archive, Trash2, Bell, Settings, User, Search,
  ChevronDown, Filter, Download, MoreVertical,
  FolderPlus, Clock, Info, X
} from 'lucide-react';
import '../styles/Dashboard.css';

const ROUTE_MAP = {
  'Dashboard':  '/dashboard',
  'Threat Log': '/threat-log',
  'Alerts':     '/alerts',
  'Settings':   '/settings',
  'About':      '/about',
};

/* ── Chart Data ── */
const chartData = [
  { time: '4 PM',  reads: 80,  writes: 40, renames: 10, encryption: 5  },
  { time: '6 PM',  reads: 140, writes: 60, renames: 20, encryption: 8  },
  { time: '8 PM',  reads: 110, writes: 90, renames: 40, encryption: 60 },
  { time: '10 PM', reads: 180, writes: 50, renames: 15, encryption: 10 },
  { time: '12 AM', reads: 120, writes: 110, renames: 10, encryption: 5 },
  { time: '2 AM',  reads: 200, writes: 140, renames: 8,  encryption: 3 },
];

const pieData = [
  { name: 'Active',   value: 89.2, color: '#3b82f6' },
  { name: 'SCTaCS',   value: 89.2, color: '#10b981' },
  { name: 'WetOW',    value: 16.4, color: '#f59e0b' },
];

/* ── Logs Data ── */
const logsData = [
  { time: '10:26 AM', process: 'ransomwure.py', pid: '7207', action: 'Sequential Write', risk: 'HIGH', reason: 'High file rename rate' },
  { time: '10:18 AM', process: 'ransomwure.py', pid: '7207', action: 'Sequential Write', risk: 'HIGH', reason: 'High file rename rate' },
  { time: '10:14 AM', process: 'ransomwure.py', pid: '7207', action: 'Delakco',          risk: 'HIGH', reason: 'Rapid file encryption calls, Togtr: Baloke' },
  { time: '10:12 AM', process: 'ransomwure.py', pid: '2007', action: 'Rearmy',           risk: 'SAFE', reason: 'Lastabors detecte ceare, detected' },
];

/* ── Sub-components ── */
const StatCard = ({ title, value, color, subtext, icon: Icon }) => (
  <div className="card stat-card">
    <div className="accent-bar" style={{ backgroundColor: color }} />
    <div className="stat-content">
      <div className="stat-icon-wrapper" style={{ backgroundColor: `${color}20`, color }}>
        <Icon size={18} />
      </div>
      <div className="stat-info">
        <p className="label-text">{title}</p>
        <h2 className="value-text">{value}</h2>
        <p className="sub-label" style={{ color }}>{subtext}</p>
      </div>
    </div>
  </div>
);

const ResourceBar = ({ label, icon: Icon, pct, color, val }) => (
  <div className="res-item">
    <div className="res-meta"><Icon size={13} /><span>{label}</span></div>
    <div className="res-track">
      <div className="res-fill" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
    <span className="res-val">{val}</span>
  </div>
);

const RiskBadge = ({ level }) => {
  const map = {
    HIGH:   { cls: 'high',   label: 'HIGH' },
    MEDIUM: { cls: 'med',    label: 'MEDIUM' },
    SAFE:   { cls: 'safe',   label: 'SAFE' },
  };
  const { cls, label } = map[level] || map.SAFE;
  return <span className={`risk-tag ${cls}`}>{label}</span>;
};

/* ── Main Dashboard ── */
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav,      setActiveNav]      = useState('Dashboard');
  const [activeFilter,   setActiveFilter]   = useState('1H');
  const [activeRiskTab,  setActiveRiskTab]  = useState('All');
  const [showModal,      setShowModal]      = useState(true);
  const [notifToggle,    setNotifToggle]    = useState(true);
  const [sensitivityLvl, setSensitivityLvl] = useState('High');
  const [searchTerm,     setSearchTerm]     = useState('');

  const navItems = ['Dashboard', 'Threat Log', 'Alerts', 'Settings', 'About'];
  const timeFilters = ['1H', '6H', '2AM', '24H'];
  const riskFilters = ['All', 'High Risks', 'Medium', 'Safe'];

  const filteredLogs = logsData.filter(log => {
    if (activeRiskTab === 'All') return true;
    if (activeRiskTab === 'High Risks') return log.risk === 'HIGH';
    if (activeRiskTab === 'Medium')     return log.risk === 'MEDIUM';
    if (activeRiskTab === 'Safe')       return log.risk === 'SAFE';
    return true;
  }).filter(log =>
    searchTerm === '' ||
    log.process.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">

      {/* ── Navbar ── */}
      <nav className="dash-navbar">
        <div className="nav-brand">
          <div className="nav-logo-icon">
            <Shield size={18} />
          </div>
          <span className="nav-brand-name">CYBER SENTINEL</span>
        </div>

        <div className="nav-links">
          {navItems.map(item => (
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
          <button className="nav-icon-btn notif-btn">
            <Bell size={16} />
            <span className="notif-badge">65</span>
          </button>
          <button className="nav-icon-btn"><Settings size={16} /></button>
          <button className="nav-icon-btn"><User     size={16} /></button>
        </div>
      </nav>

      {/* ── File Monitoring Controls ── */}
      <section className="controls-bar card">
        <div className="controls-left">
          <FileText size={14} className="ctrl-icon" />
          <span className="ctrl-title">File Monitoring Controls</span>
        </div>
        <div className="controls-right-top">
          <button className="nav-icon-btn"><FolderPlus size={15} /></button>
          <button className="nav-icon-btn"><Clock      size={15} /></button>
          <button className="nav-icon-btn"><MoreVertical size={15} /></button>
        </div>

        <div className="scan-btn-group">
          <button className="ctrl-btn start"><Play      size={13} /> Start Scan</button>
          <button className="ctrl-btn pause"><Pause     size={13} /> Pause Scan</button>
          <button className="ctrl-btn rescan"><RefreshCw size={13} /> Rescan</button>
        </div>

        <div className="emergency-btn-group">
          <button className="ctrl-btn stop"><XCircle  size={13} /> Stop Process</button>
          <button className="ctrl-btn quarantine"><Archive  size={13} /> Quarantine File</button>
          <button className="ctrl-btn clean"><Trash2   size={13} /> Clean System</button>
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section className="stats-row">
        <StatCard title="Files Monitored"         value="12,540 / 71GB" color="#3b82f6" subtext="Total Size: 71GB"   icon={FileText}      />
        <StatCard title="Suspicious Activities"   value="12"            color="#f59e0b" subtext="Elevated Risk"      icon={AlertTriangle}  />
        <StatCard title="Encrypted Files Detected" value="5"            color="#ef4444" subtext="Immediate Action"  icon={Lock}           />
        <StatCard title="Threat Score"            value="72%"           color="#ef4444" subtext="High Risk"         icon={Shield}         />
      </section>

      {/* ── Middle Grid: Chart + System Monitor ── */}
      <section className="middle-grid">

        {/* Chart */}
        <div className="card chart-box">
          <div className="box-header">
            <div className="header-left">
              <h3 className="side-heading">File Activity - Overview</h3>
              <div className="chart-legend">
                {[
                  { cls: 'blue',   label: 'File Reads' },
                  { cls: 'red',    label: 'File Writes' },
                  { cls: 'yellow', label: 'Suspicious Renames' },
                  { cls: 'purple', label: 'Encryption Attempts' },
                ].map(l => (
                  <div key={l.label} className="legend-item">
                    <span className={`line ${l.cls}`} /><span>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="time-filters">
              {timeFilters.map(f => (
                <span
                  key={f}
                  className={activeFilter === f ? 'active' : ''}
                  onClick={() => setActiveFilter(f)}
                >{f}</span>
              ))}
            </div>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} opacity={0.2} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={8} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dx={-4} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #3b82f6', fontSize: '0.75rem' }} />
                <Area type="monotone" dataKey="reads"      stroke="#3b82f6" fillOpacity={0.12} fill="#3b82f6" strokeWidth={2} />
                <Area type="monotone" dataKey="writes"     stroke="#ef4444" fill="transparent"               strokeWidth={2} />
                <Area type="monotone" dataKey="renames"    stroke="#f59e0b" fill="transparent"               strokeWidth={2} strokeDasharray="5 5" />
                <Area type="monotone" dataKey="encryption" stroke="#a855f7" fillOpacity={0.08} fill="#a855f7" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Monitor */}
        <div className="card monitor-box">
          <h3 className="side-heading">System Monitor</h3>
          <p className="tiny-muted">Machine Learning Anomaly Detector v1.3</p>
          <div className="mon-row"><span>Model Last Trained:</span><span className="mon-val">45m ago</span></div>
          <div className="mon-row"><span>Anomaly Scores:</span><span className="mon-val">0.75</span></div>

          <div className="pie-section">
            <div className="pie-wrapper">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={pieData} innerRadius={44} outerRadius={60} paddingAngle={4} dataKey="value" stroke="none">
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-center-label">
                <span className="big-pct">80%</span>
                <span className="sub-txt pie-risk-label">High Risk</span>
              </div>
            </div>

            <div className="risk-legend">
              <div className="mon-score-row">
                <span className="mon-score-label">Threshold: 0.75</span>
              </div>
              {[
                { color: '#3b82f6', label: 'Active',  val: '0.89' },
                { color: '#10b981', label: 'SCTaCS',  val: '89.2%' },
                { color: '#f59e0b', label: 'WetOW',   val: '16.4%' },
              ].map(item => (
                <div key={item.label} className="legend-item">
                  <span className="dot" style={{ backgroundColor: item.color }} />
                  <span className="l-label">{item.label}</span>
                  <span className="l-val">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Resource Usage inside monitor box */}
          <div className="monitor-resource-section">
            <h4 className="resource-sub-heading">Live Resource Usage</h4>
            <ResourceBar label="CPU"  icon={Cpu}       pct={68} color="#4a90e2" val="68%"    />
            <ResourceBar label="NAM"  icon={Activity}  pct={71} color="#10b981" val="71/MGs" />
            <ResourceBar label="DISK" icon={HardDrive} pct={48} color="#f59e0b" val="48 Ms"  />
          </div>
        </div>
      </section>

      {/* ── Bottom: Logs + Alerts + Settings ── */}
      <section className="bottom-grid">

        {/* Anomalous Process Logs */}
        <div className="card logs-box">
          <div className="logs-header">
            <h3 className="side-heading">Anomalous Process Logs</h3>
            <div className="logs-actions">
              <span className="export-link"><Download size={12} /> Export Logs</span>
              <span className="export-link">CSV / PDF ≡</span>
            </div>
          </div>

          {/* Risk Filter Chips */}
          <div className="filter-chip-row">
            <button className="chip-icon-btn"><RefreshCw size={12} /></button>
            {riskFilters.map(f => (
              <button
                key={f}
                className={`filter-chip ${f === 'High Risks' ? 'chip-high' : f === 'Medium' ? 'chip-med' : f === 'Safe' ? 'chip-safe' : ''} ${activeRiskTab === f ? 'chip-active' : ''}`}
                onClick={() => setActiveRiskTab(f)}
              >{f}</button>
            ))}
            <div className="log-search-wrap">
              <Search size={11} className="log-search-icon" />
              <input
                className="log-search"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Process</th>
                <th>Action</th>
                <th>Risk</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, i) => (
                <tr key={i}>
                  <td>{log.time}</td>
                  <td>
                    <span className="p-name">{log.process}</span><br />
                    <span className="p-id">PID: {log.pid}</span>
                  </td>
                  <td>{log.action}</td>
                  <td><RiskBadge level={log.risk} /></td>
                  <td className="reason-cell">{log.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Filter Bottom Bar */}
          <div className="table-footer">
            <div className="footer-filters">
              <span className="footer-chip"><Filter size={10} /> Filter <ChevronDown size={10} /></span>
              <span className="footer-chip chip-high-sm">High Risk</span>
              
            </div>
            <div className="footer-right">
              <Search size={11} /> Search
            </div>
          </div>
        </div>

        {/* Recent Alerts Feed */}
        <div className="card alerts-box">
          <h3 className="side-heading">
            Recent Alerts Feed
            <span className="live-pill">Live</span>
          </h3>

          {/* High Risk Popup Alert */}
          {showModal && (
            <div className="alert-popup-modal">
              <div className="popup-header">
                <span className="popup-icon">⚠️</span>
                <span className="popup-risk-label">High Risk</span>
                <Info size={13} className="popup-info" />
                <button className="popup-close" onClick={() => setShowModal(false)}>
                  <MoreVertical size={13} />
                </button>
              </div>
              <p className="popup-msg">Rapid file renaming in "Documents" folder</p>
              <div className="popup-actions">
                <button className="popup-btn-outline">View Details</button>
                <button className="popup-btn-outline">Public ales</button>
                <button className="popup-btn-dismiss" onClick={() => setShowModal(false)}>Dismiss</button>
              </div>
            </div>
          )}

          <div className="alert-list">
            <div className="alert-entry high">
              <span className="alert-time">10:24 AM</span>
              <p>⚠️ <strong>ALERT:</strong> Multiple encrypted files detected</p>
            </div>
            <div className="alert-entry med">
              <span className="alert-time">10:16 AM</span>
              <p>⚠️ <strong>WARNING:</strong> Rapid file renaming in "Docum..."</p>
            </div>
            <div className="alert-entry low">
              <span className="alert-time">10:14 AM</span>
              <p>🔵 <strong>INFO:</strong> New backup shadow copy created</p>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        <div className="card settings-panel">
          <div className="settings-header">
            <h3 className="side-heading">Settings</h3>
            <button className="more-settings-btn"><Settings size={12} /> More Settings</button>
          </div>

          <div className="setting-item">
            <span className="setting-label">Sensitivity Level</span>
            <span className="setting-val muted">(55/10s)</span>
          </div>

          <div className="setting-item">
            <span className="setting-label">Sensitivity Level</span>
            <div className="sensitivity-tabs">
              {['Low', 'Near', 'High'].map(lvl => (
                <button
                  key={lvl}
                  className={`sens-tab ${sensitivityLvl === lvl ? `sens-active-${lvl.toLowerCase()}` : ''}`}
                  onClick={() => setSensitivityLvl(lvl)}
                >{lvl}</button>
              ))}
            </div>
          </div>

          <div className="setting-item">
            <span className="setting-label">Toggle Notifications</span>
            <div className="toggle-group">
              <span className="toggle-label-sm">email</span>
              <button
                className={`toggle-switch ${notifToggle ? 'on' : ''}`}
                onClick={() => setNotifToggle(p => !p)}
              >
                <span className="toggle-thumb" />
              </button>
            </div>
          </div>

          <div className="setting-item">
            <span className="setting-label">Role-Based User Login</span>
            <span className="setting-val muted small">Admin Corner</span>
          </div>

          <div className="setting-item">
            <span className="setting-label">Light/Dark Mode</span>
            <div className="mode-buttons">
              <button className="mode-btn active-mode">◑ Mode</button>
              <button className="mode-btn"><Settings size={11} /> Settings</button>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Dashboard;
