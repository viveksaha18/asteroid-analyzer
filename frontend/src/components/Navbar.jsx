import { useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "1rem 2rem",
        background: "linear-gradient(135deg, #0b3d91 0%, #1e40af 100%)",
        color: "white",
        fontSize: "1.2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span>🚀</span>
        <span style={{ fontWeight: "600" }}>Asteroid Risk Monitoring</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {user && (
          <div
            style={{
              padding: "8px 16px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>👤</span>
            <span>{user.name}</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#b91c1c")}
          onMouseLeave={(e) => (e.target.style.background = "#dc2626")}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
