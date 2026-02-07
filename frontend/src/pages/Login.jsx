import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AsteroidBackground3D from "../components/AsteroidBackground3D";
import FloatingParticles3D from "../components/FloatingParticles3D";
import InteractiveStars3D from "../components/InteractiveStars3D";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError("Email and password are required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const user = {
        email,
        name: email.split("@")[0],
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authToken", "token_" + Date.now());
      onLogin(user);
      navigate("/dashboard");
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AsteroidBackground3D />
      <FloatingParticles3D />
      <InteractiveStars3D />

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3), 
                        0 20px 60px rgba(0,0,0,0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.6), 
                        0 20px 60px rgba(0,0,0,0.3);
          }
        }
        .login-container {
          animation: slideIn 0.6s ease-out, float 3s ease-in-out infinite;
        }
        .login-btn:hover {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
        }
      `}</style>

      <div
        className="login-container"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          padding: "40px",
          width: "100%",
          maxWidth: "420px",
          position: "relative",
          zIndex: 10,
          backdropFilter: "blur(10px)",
          animation:
            "float 3s ease-in-out infinite, glow 2s ease-in-out infinite",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{ fontSize: "32px", color: "#0b3d91", margin: "0 0 10px 0" }}
          >
            🚀 Asteroid Monitor
          </h1>
          <p style={{ color: "#666", margin: 0, fontSize: "14px" }}>
            Risk Assessment Dashboard
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                color: "#1e3a8a",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "inherit",
                boxSizing: "border-box",
                transition: "all 0.3s",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#0b3d91";
                e.target.style.boxShadow = "0 0 0 3px rgba(11, 61, 145, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                color: "#1e3a8a",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "inherit",
                boxSizing: "border-box",
                transition: "all 0.3s",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#0b3d91";
                e.target.style.boxShadow = "0 0 0 3px rgba(11, 61, 145, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {error && (
            <div
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
                border: "1px solid #fca5a5",
                animation: "slideIn 0.3s ease-out",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="login-btn"
            style={{
              width: "100%",
              padding: "12px 16px",
              background: loading
                ? "#9ca3af"
                : "linear-gradient(135deg, #0b3d91 0%, #1e40af 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "transform 0.2s, box-shadow 0.2s, background 0.3s",
              boxShadow: "0 4px 12px rgba(11, 61, 145, 0.3)",
              marginBottom: "16px",
            }}
            onMouseEnter={(e) =>
              !loading && (e.target.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) =>
              !loading && (e.target.style.transform = "translateY(0)")
            }
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>

          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#666",
              marginBottom: "16px",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#0b3d91",
                fontWeight: "600",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#1e40af")}
              onMouseLeave={(e) => (e.target.style.color = "#0b3d91")}
            >
              Sign Up
            </Link>
          </div>
        </form>

        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#999",
            borderTop: "1px solid #e5e7eb",
            paddingTop: "16px",
          }}
        >
          <p style={{ margin: 0 }}>
            Demo: Use any email & password (min 6 chars)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
