import { useNavigate } from "react-router-dom";
import AsteroidBackground3D from "../components/AsteroidBackground3D";
import FloatingParticles3D from "../components/FloatingParticles3D";
import InteractiveStars3D from "../components/InteractiveStars3D";
import Planet3D from "../components/Planet3D";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
      }}
    >
      <AsteroidBackground3D />
      <FloatingParticles3D />
      <InteractiveStars3D />

      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .get-started-text {
          animation: fadeInLeft 0.8s ease-out;
        }
        .get-started-visual {
          animation: fadeInRight 0.8s ease-out;
        }
        .cta-button {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(16, 185, 129, 0.4) !important;
        }
      `}</style>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "80px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <div className="get-started-text">
            <h1
              style={{
                fontSize: "48px",
                margin: 0,
                color: "#ffffff",
                textShadow: "0 6px 24px rgba(0,0,0,0.6)",
              }}
            >
              Asteroid Risk Monitor
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "rgba(255,255,255,0.9)",
                marginTop: "18px",
                lineHeight: 1.5,
              }}
            >
              Stay ahead of near-earth threats with real-time tracking,
              interactive 3D visualizations and expert risk scoring. Sign up to
              receive notifications and access detailed dashboards.
            </p>

            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button
                onClick={() => navigate("/signup")}
                className="cta-button"
                style={{
                  padding: "12px 20px",
                  background: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 8px 20px rgba(16,185,129,0.18)",
                }}
              >
                Get Started — Sign Up
              </button>
              <button
                onClick={() => navigate("/login")}
                className="cta-button"
                style={{
                  padding: "12px 20px",
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                }}
              >
                Sign In
              </button>
            </div>

            <ul
              style={{
                color: "rgba(255,255,255,0.9)",
                marginTop: 28,
                paddingLeft: 20,
              }}
            >
              <li style={{ marginBottom: 8 }}>
                • Live asteroid feed with risk classification
              </li>
              <li style={{ marginBottom: 8 }}>
                • Interactive 3D previews and telemetry
              </li>
              <li style={{ marginBottom: 8 }}>
                • Custom alerts & lightweight analytics
              </li>
            </ul>
          </div>

          <div
            className="get-started-visual"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: 16,
              padding: 18,
              boxShadow: "0 12px 40px rgba(2,6,23,0.6)",
              color: "white",
              textAlign: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            <h3 style={{ margin: 0, fontSize: 18, marginBottom: 12 }}>
              🌍 Live Preview
            </h3>
            <p
              style={{
                marginTop: 0,
                marginBottom: 12,
                color: "rgba(255,255,255,0.85)",
                fontSize: 13,
              }}
            >
              Interactive 3D model of Earth
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <Planet3D size={300} />
            </div>
          </div>
        </div>
      </div>

      <footer
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "24px 10px",
          color: "rgba(255,255,255,0.75)",
        }}
      >
        © {new Date().getFullYear()} Asteroid Risk Monitor — Demo
      </footer>
    </div>
  );
};

export default GetStarted;
