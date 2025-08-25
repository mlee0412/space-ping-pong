import { useState } from "react";

export default function SettingsView() {
  const [settings, setSettings] = useState({
    autoRun: true,
    spotify: true,
    supabase: true,
    email: false,
    sms: false,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div className="card">
      <h3>System Settings</h3>

      <div className="settings-section">
        <h4>General</h4>
        <div className="setting-item">
          <span>Venue Name</span>
          <input defaultValue="Space Ping Pong" style={{ background: "#0b1220", color: "var(--text)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, padding: 8 }} />
        </div>
        <div className="setting-item">
          <span>Default Session Length</span>
          <select style={{ background: "#0b1220", color: "var(--text)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, padding: 8 }}>
            <option>60 min</option>
            <option selected>90 min</option>
            <option>120 min</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h4>Automation</h4>
        <div className="setting-item">
          <span>Auto-run workflows</span>
          <div className={`toggle-switch ${settings.autoRun ? "active" : ""}`} onClick={() => toggle("autoRun")}></div>
        </div>
        <div className="setting-item">
          <span>Spotify integration</span>
          <div className={`toggle-switch ${settings.spotify ? "active" : ""}`} onClick={() => toggle("spotify")}></div>
        </div>
        <div className="setting-item">
          <span>Supabase sync</span>
          <div className={`toggle-switch ${settings.supabase ? "active" : ""}`} onClick={() => toggle("supabase")}></div>
        </div>
      </div>

      <div className="settings-section">
        <h4>Notifications</h4>
        <div className="setting-item">
          <span>Email notifications</span>
          <div className={`toggle-switch ${settings.email ? "active" : ""}`} onClick={() => toggle("email")}></div>
        </div>
        <div className="setting-item">
          <span>SMS alerts</span>
          <div className={`toggle-switch ${settings.sms ? "active" : ""}`} onClick={() => toggle("sms")}></div>
        </div>
      </div>

      <div className="row" style={{ marginTop: 20 }}>
        <button className="btn primary">💾 Save Settings</button>
        <button className="btn">📤 Export Config</button>
        <button className="btn">📥 Import Config</button>
        <button className="btn danger">🔄 Reset to Default</button>
      </div>
    </div>
  );
}
