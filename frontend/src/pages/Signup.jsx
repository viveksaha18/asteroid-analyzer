import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AsteroidBackground3D from "../components/AsteroidBackground3D";
import FloatingParticles3D from "../components/FloatingParticles3D";
import InteractiveStars3D from "../components/InteractiveStars3D";

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const calculatePasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return false;
    }

    if (formData.name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const user = {
        email: formData.email,
        name: formData.name,
        signupTime: new Date().toISOString(),
      };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authToken", "token_" + Date.now());
      onSignup(user);
      navigate("/dashboard");
      setLoading(false);
    }, 1000);
  };

  const strengthLabels = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Very Strong",
  ];
  const strengthColors = [
    "#dc2626",
    "#ea580c",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#16a34a",
  ];

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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
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
        .signup-container {
          animation: slideIn 0.6s ease-out, float 3s ease-in-out infinite;
        }
        .signup-btn:hover {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
        }
      `}</style>

      <div
        className="signup-container"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          padding: "40px",
          width: "100%",
          maxWidth: "500px",
          position: "relative",
          zIndex: 10,
          animation: "glow 2s ease-in-out infinite",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{ fontSize: "32px", color: "#0b3d91", margin: "0 0 10px 0" }}
          >
            🚀 Create Account
          </h1>
          <p style={{ color: "#666", margin: 0, fontSize: "14px" }}>
            Join the asteroid monitoring network
          </p>
        </div>

        <form onSubmit={handleSignup}>
          {/* Name Field */}
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
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
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

          {/* Email Field */}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
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

          {/* Password Field */}
          <div style={{ marginBottom: "8px" }}>
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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

          {/* Password Strength Indicator */}
          {formData.password && (
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  marginBottom: "8px",
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: "6px",
                      background:
                        i < passwordStrength
                          ? strengthColors[passwordStrength - 1]
                          : "#e5e7eb",
                      borderRadius: "3px",
                      transition: "background 0.3s",
                    }}
                  ></div>
                ))}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: strengthColors[passwordStrength - 1] || "#666",
                  fontWeight: "600",
                }}
              >
                Password Strength:{" "}
                {strengthLabels[passwordStrength] || "Enter password"}
              </p>
            </div>
          )}

          {/* Confirm Password Field */}
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
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 16px",
                border:
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword
                    ? "2px solid #dc2626"
                    : "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "inherit",
                boxSizing: "border-box",
                transition: "all 0.3s",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = "0 0 0 3px rgba(11, 61, 145, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = "none";
              }}
            />
            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p
                  style={{
                    margin: "6px 0 0 0",
                    fontSize: "12px",
                    color: "#dc2626",
                  }}
                >
                  ⚠️ Passwords do not match
                </p>
              )}
          </div>

          {/* Error Message */}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="signup-btn"
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
              transition: "all 0.3s",
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Login Link */}
          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#666",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#0b3d91",
                fontWeight: "600",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#1e40af")}
              onMouseLeave={(e) => (e.target.style.color = "#0b3d91")}
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
