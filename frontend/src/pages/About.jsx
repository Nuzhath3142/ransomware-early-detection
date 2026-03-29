import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Shield, Activity, FileText, Bell, Settings, Info,
  User, BookOpen, Users, Headphones, Clock, ExternalLink
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

const TEAM = [
  { name: 'Member One',  initials: 'M1', color: '#3b82f6' },
  { name: 'Member Two',  initials: 'M2', color: '#10b981' },
  { name: 'Member Three',initials: 'M3', color: '#a855f7' },
  { name: 'Member Four', initials: 'M4', color: '#f59e0b' },
];

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

export default function About() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <Info size={16} className="page-header-icon" />
          <h2 className="page-title">About · Cyber Sentinel Project</h2>
        </div>

        <div className="card about-card">
          {/* Hero */}
          <div className="about-hero">
            <div className="about-logo-wrap">
              <Shield size={36} className="about-shield-icon" />
            </div>
            <div className="about-brand-text">
              <span className="about-brand-name">CYBER SENTINEL</span>
            </div>
            <div className="about-meta">
              <Clock size={12} />
              <span>Mini Project</span>
              <span className="about-meta-dash">────</span>
              <span>Last Updated: April 2024</span>
            </div>
          </div>

          {/* Description */}
          <p className="about-desc">
            <strong>Cyber Sentinel</strong> is a real-time cyber threat detection system.
            It uses machine learning to detect suspicious file activity, ransomware-like behavior,
            and anomalous process patterns — providing immediate alerts and automated response capabilities.
          </p>

          {/* Team */}
          <div className="about-section-title">Team Members</div>
          <div className="about-team-row">
            {TEAM.map(member => (
              <div key={member.name} className="about-member">
                <div className="about-avatar" style={{ borderColor: `${member.color}40`, color: member.color }}>
                  {member.initials}
                </div>
                <span className="about-member-name">{member.name}</span>
              </div>
            ))}

            {/* GitHub card */}
            <div className="about-github-card">
              <div className="about-github-header">
                <ExternalLink size={14} />
                <span>GitHub</span>
              </div>
              <span className="about-github-handle">● cybersentinel (public)</span>
              <div className="about-tech-badges">
                <span className="tech-badge">Python</span>
                <span className="tech-badge">FastAPI</span>
                <span className="tech-badge">React</span>
              </div>
            </div>
          </div>

          <div className="about-divider" />

          {/* Links */}
          <div className="about-links-row">
            <div className="about-link-card">
              <BookOpen size={15} className="about-link-icon" />
              <div>
                <div className="about-link-title">Documentation</div>
                <div className="about-link-url">docs.cybersentinel.com</div>
              </div>
            </div>
            <div className="about-link-card">
              <Users size={15} className="about-link-icon" />
              <div>
                <div className="about-link-title">User Management</div>
                <div className="about-link-url">admin.cybersentinel.com</div>
              </div>
            </div>
            <div className="about-link-card">
              <Headphones size={15} className="about-link-icon" />
              <div>
                <div className="about-link-title">Support</div>
                <div className="about-link-url">support.cybersentinel.com</div>
              </div>
            </div>
          </div>

          <div className="about-version">Version 1.5.4 · Build stable · April 2024</div>
        </div>
      </div>
    </div>
  );
}
