import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Shield, Lock, AlertTriangle, FileText, Cpu, HardDrive } from 'lucide-react';
import '../styles/Dashboard.css';

const data = [
  { time: '2 PM', reads: 140, writes: 40, renames: 10, encryption: 5 },
  { time: '3 PM', reads: 180, writes: 60, renames: 15, encryption: 8 },
  { time: '4 PM', reads: 210, writes: 70, renames: 40, encryption: 12 },
  { time: '6 PM', reads: 170, writes: 110, renames: 25, encryption: 60 }, 
  { time: '8 PM', reads: 240, writes: 50, renames: 15, encryption: 10 },
  { time: '10 PM', reads: 200, writes: 140, renames: 10, encryption: 5 },
];

const pieData = [
  { name: 'Normal', value: 99.8, color: '#10b981' },
  { name: 'Suspicious', value: 0.15, color: '#f59e0b' },
  { name: 'High Risk', value: 0.05, color: '#ef4444' },
];

const StatCard = ({ title, value, color, subtext, icon: Icon }) => (
  <div className="card stat-card">
    <div className="stat-content">
      <div className="stat-icon-wrapper" style={{ backgroundColor: `${color}15`, color: color }}>
        <Icon size={20} />
      </div>
      <div className="stat-info">
        <p className="label-text">{title}</p>
        <h2 className="value-text">{value}</h2>
        <p className="sub-label" style={{ color: color }}>{subtext}</p>
      </div>
    </div>
    <div className="accent-bar" style={{ backgroundColor: color }}></div>
  </div>
);

const ResourceBar = ({ label, icon: Icon, pct, color, val }) => (
  <div className="res-item">
    <div className="res-meta"><Icon size={14} /> <span>{label}</span></div>
    <div className="res-track"><div className="res-fill" style={{ width: `${pct}%`, backgroundColor: color }}></div></div>
    <span className="res-val">{val}</span>
  </div>
);

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dash-header">
        <div className="brand">
          <h1>CYBER SENTINEL</h1>
          <span className="version">System Version 1.1 | Status: <span className="text-green">Active</span></span>
        </div>
      </header>

      <section className="stats-row">
        <StatCard title="Files Monitored" value="12,540 / 71GB" color="#3b82f6" subtext="Total Size: 71GB" icon={FileText} />
        <StatCard title="Suspicious Activities" value="12" color="#f59e0b" subtext="Elevated Risk" icon={AlertTriangle} />
        <StatCard title="Encrypted Files Detected" value="5" color="#ef4444" subtext="Immediate Action" icon={Lock} />
        {/* Replace the old Threat Score div with this */}
<div className="card stat-card threat-card">
  <div className="stat-content">
    <div className="stat-icon-wrapper" style={{ backgroundColor: `rgba(239, 68, 68, 0.15)`, color: '#ef4444' }}>
      <Shield size={20} />
    </div>
    <div className="stat-info">
      <p className="label-text">Threat Score</p>
      <h2 className="value-text">72%</h2>
      <p className="sub-label" style={{ color: '#ef4444' }}>High Risk</p>
    </div>
  </div>
  <div className="accent-bar" style={{ backgroundColor: '#ef4444' }}></div>
</div>
      </section>

      <section className="middle-grid">
        <div className="card chart-box">
          <div className="box-header">
            <div className="header-left">
              <h3 className="side-heading">File Activity - 24H Overview</h3>
              <div className="chart-legend">
                <div className="legend-item"><span className="line blue"></span><span>File Reads</span></div>
                <div className="legend-item"><span className="line red"></span><span>File Writes</span></div>
                <div className="legend-item"><span className="line yellow"></span><span>Suspicious Renames</span></div>
                <div className="legend-item"><span className="line purple"></span><span>Encryption Attempts</span></div>
              </div>
            </div>
            <div className="time-filters">
              <span>1H</span><span>6H</span><span className="active">12H</span><span>24H</span>
            </div>
          </div>
          
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} opacity={0.2} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dx={-5} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #3b82f6' }} />
                
                <Area type="monotone" dataKey="reads" stroke="#3b82f6" fillOpacity={0.1} fill="#3b82f6" strokeWidth={2} />
                <Area type="monotone" dataKey="writes" stroke="#ef4444" fill="transparent" strokeWidth={2} />
                <Area type="monotone" dataKey="renames" stroke="#f59e0b" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                <Area type="monotone" dataKey="encryption" stroke="#a855f7" fillOpacity={0.1} fill="#a855f7" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card monitor-box">
          <h3 className="side-heading">System Monitor</h3>
          <p className="tiny-muted">Machine Learning Model Status</p>
          <div className="mon-row"><span>Model:</span> <span>Isolation Forest V2.3</span></div>
          <div className="mon-row"><span>Last Trained:</span> <span>15m ago</span></div>
          
          <div className="pie-section">
            <div className="pie-wrapper">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={pieData} innerRadius={45} outerRadius={60} paddingAngle={5} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-center-label">
                <span className="big-pct">99.8%</span>
                <span className="sub-txt">Secure</span>
              </div>
            </div>

            <div className="risk-legend">
              <div className="legend-item"><span className="dot" style={{backgroundColor: '#10b981'}}></span><span>Normal: 99.8%</span></div>
              <div className="legend-item"><span className="dot" style={{backgroundColor: '#f59e0b'}}></span><span>Suspicious: 0.15%</span></div>
              <div className="legend-item"><span className="dot" style={{backgroundColor: '#ef4444'}}></span><span>High Risk: 0.05%</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bottom-grid">
        <div className="card logs-box">
          <h3 className="side-heading">Anomalous Process Logs</h3>
          <table className="data-table">
            <thead>
              <tr><th>Timestamp</th><th>Process</th><th>Action</th><th>Risk</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>10:15 AM</td>
                <td><span className="p-name">ransom.py</span><br/><span className="p-id">PID: 7207</span></td>
                <td>Sequential Write</td>
                <td><span className="risk-tag high">HIGH</span></td>
              </tr>
              {/* High Risk Entry */}
      <tr>
        <td>10:15 AM</td>
        <td>
          <span className="p-name">ransom.py</span><br/>
          <span className="p-id">PID: 7207</span>
        </td>
        <td>Sequential Write</td>
        <td><span className="risk-tag high">HIGH</span></td>
      </tr>
      
      {/* Medium Risk Entry */}
      <tr>
        <td>10:12 AM</td>
        <td>
          <span className="p-name">powershell.exe</span><br/>
          <span className="p-id">PID: 4821</span>
        </td>
        <td>Mass Rename</td>
        <td><span className="risk-tag med">MEDIUM</span></td>
      </tr>

      {/* Another High Risk Entry */}
      <tr>
        <td>10:08 AM</td>
        <td>
          <span className="p-name">cmd.exe</span><br/>
          <span className="p-id">PID: 9912</span>
        </td>
        <td>VSS Admin Delete</td>
        <td><span className="risk-tag high">HIGH</span></td>
      </tr>

      {/* Low Risk / Information Entry */}
      <tr>
        <td>10:01 AM</td>
        <td>
          <span className="p-name">svchost.exe</span><br/>
          <span className="p-id">PID: 1024</span>
        </td>
        <td>Registry Change</td>
        <td><span className="risk-tag low">SAFE</span></td>
      </tr>
            </tbody>
          </table>
        </div>
        

        <div className="card alerts-box">
          <h3 className="side-heading">Recent Alerts Feed <span className="live-pill">Live</span></h3>
          <div className="alert-entry high">
            <span className="alert-time">10:14 AM</span>
            <p>⚠️ ALERT: Multiple encrypted files detected</p>
          </div>
          {/* NEW: Medium Alert (Suspicious Activity) */}
  <div className="alert-entry med">
    <span className="alert-time">10:18 AM</span>
    <p>⚠️ WARNING: Rapid file renaming in "Documents" folder</p>
  </div>

  {/* NEW: Low/Info Alert (System Monitoring) */}
  <div className="alert-entry low">
    <span className="alert-time">10:22 AM</span>
    <p>ℹ️ INFO: New backup shadow copy created</p>
  </div>

  {/* Existing Medium Alert */}
  <div className="alert-entry med">
    <span className="alert-time">10:12 AM</span>
    <p>⚠️ Unusual PowerShell execution detected</p>
  </div>
        </div>

        <div className="card resource-box">
          <h3 className="side-heading">Live Resource Usage</h3>
          <ResourceBar label="CPU" icon={Cpu} pct={65} color="#3b82f6" val="65%" />
          <ResourceBar label="RAM" icon={Activity} pct={75} color="#10b981" val="12/16GB" />
          <ResourceBar label="DISK" icon={HardDrive} pct={40} color="#f59e0b" val="420 MB/s" />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;