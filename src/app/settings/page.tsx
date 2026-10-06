export default function SettingsPage() {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Account</div>
          <h2>Profile & settings</h2>
        </div>
      </div>

      <div className="settings-grid">
        <div className="detail-card">
          <div className="profile-header">
            <div className="profile-avatar-large">YP</div>
            <div>
              <div className="row-title">Yash Patel</div>
              <div className="row-meta">Admin</div>
            </div>
          </div>

          <div className="field-list">
            <div className="field-row">
              <span>Email</span>
              <strong>yash.patel@sellsync.io</strong>
            </div>
            <div className="field-row">
              <span>Role</span>
              <strong>Administrator</strong>
            </div>
            <div className="field-row">
              <span>Region</span>
              <strong>Canada</strong>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <div className="section-header">
            <h2>Workspace settings</h2>
          </div>

          <div className="field-list">
            <div className="field-row">
              <span>Currency</span>
              <strong>CAD</strong>
            </div>
            <div className="field-row">
              <span>Timezone</span>
              <strong>Eastern Time (ET)</strong>
            </div>
            <div className="field-row">
              <span>Notifications</span>
              <strong>Enabled</strong>
            </div>
            <div className="field-row">
              <span>Tax settings</span>
              <strong>GST/HST</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
