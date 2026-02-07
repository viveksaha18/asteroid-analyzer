import CardOrbitViewer from "./CardOrbitViewer";

const AsteroidCard = ({ asteroid }) => {
  // Enhanced risk color scheme with gradients
  let riskColor = "#10b981";
  let riskBg = "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)";
  let riskEmoji = "✅";
  let borderColor = "#10b981";
  let accentColor = "#06b6d4";
  let tagBg = "#ecfdf5";
  let textColor = "#0f3460";

  if (asteroid.riskLevel === "Medium") {
    riskColor = "#f59e0b";
    riskBg = "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)";
    riskEmoji = "⚠️";
    borderColor = "#f59e0b";
    accentColor = "#f59e0b";
    tagBg = "#fffbeb";
  }
  if (asteroid.riskLevel === "High") {
    riskColor = "#ef4444";
    riskBg = "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)";
    riskEmoji = "🚨";
    borderColor = "#ef4444";
    accentColor = "#ef4444";
    tagBg = "#fef2f2";
  }

  return (
    <div
      style={{
        border: `2px solid ${borderColor}`,
        borderRadius: "16px",
        padding: "20px",
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        boxShadow: `0 8px 24px rgba(15, 52, 96, 0.12)`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-12px)";
        e.currentTarget.style.boxShadow = `0 20px 40px rgba(15, 52, 96, 0.2)`;
        e.currentTarget.style.borderColor = accentColor;
        e.currentTarget.style.background =
          "linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 8px 24px rgba(15, 52, 96, 0.12)`;
        e.currentTarget.style.borderColor = borderColor;
        e.currentTarget.style.background =
          "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)";
      }}
    >
      {/* Animated gradient border effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, ${borderColor}, ${accentColor}, ${borderColor})`,
          backgroundSize: "200% 100%",
          animation: "slide 3s linear infinite",
        }}
      ></div>

      {/* Header with name and risk badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          marginBottom: "18px",
          paddingTop: "6px",
          gap: "12px",
        }}
      >
        <h2
          style={{
            fontWeight: "700",
            color: textColor,
            margin: 0,
            fontSize: "18px",
            maxWidth: "65%",
            wordBreak: "break-word",
            letterSpacing: "-0.3px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          {asteroid.name}
        </h2>
        <span
          style={{
            background: tagBg,
            color: riskColor,
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "700",
            whiteSpace: "nowrap",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            border: `1.5px solid ${riskColor}`,
          }}
        >
          {riskEmoji} {asteroid.riskLevel}
        </span>
      </div>

      {/* 3D Orbit Visualization - Enhanced styling */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #0a1428 100%)",
          borderRadius: "12px",
          padding: "8px",
          marginBottom: "18px",
          overflow: "hidden",
          border: `1.5px solid ${borderColor}`,
          boxShadow: `inset 0 4px 12px rgba(0, 0, 0, 0.3)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "228px",
          position: "relative",
        }}
      >
        <CardOrbitViewer asteroid={asteroid} size={220} />
      </div>

      {/* Data grid with enhanced typography */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          marginBottom: "16px",
        }}
      >
        {/* Diameter */}
        <div
          style={{
            padding: "12px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)",
            border: "1px solid #c7d2fe",
          }}
        >
          <p
            style={{
              margin: "0 0 6px 0",
              fontSize: "11px",
              color: "#4f46e5",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.4px",
            }}
          >
            📏 Diameter
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "800",
              color: "#1e40af",
              lineHeight: "1.2",
            }}
          >
            {asteroid.diameter}
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#4f46e5",
                marginLeft: "4px",
              }}
            >
              m
            </span>
          </p>
        </div>

        {/* Velocity */}
        <div
          style={{
            padding: "12px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)",
            border: "1px solid #fcd34d",
          }}
        >
          <p
            style={{
              margin: "0 0 6px 0",
              fontSize: "11px",
              color: "#b45309",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.4px",
            }}
          >
            🚀 Velocity
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "800",
              color: "#92400e",
              lineHeight: "1.2",
            }}
          >
            {(asteroid.velocity / 1000).toFixed(1)}
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#b45309",
                marginLeft: "4px",
              }}
            >
              km/s
            </span>
          </p>
        </div>

        {/* Miss Distance */}
        <div
          style={{
            padding: "12px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
            border: "1px solid #93c5fd",
          }}
        >
          <p
            style={{
              margin: "0 0 6px 0",
              fontSize: "11px",
              color: "#0369a1",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.4px",
            }}
          >
            🌍 Miss Distance
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "800",
              color: "#075985",
              lineHeight: "1.2",
            }}
          >
            {(asteroid.missDistance / 1e6).toFixed(2)}
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#0369a1",
                marginLeft: "4px",
              }}
            >
              M km
            </span>
          </p>
        </div>

        {/* Risk Score */}
        <div
          style={{
            padding: "12px",
            borderRadius: "10px",
            background: riskBg,
            border: `1.5px solid ${riskColor}`,
          }}
        >
          <p
            style={{
              margin: "0 0 6px 0",
              fontSize: "11px",
              color: riskColor,
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.4px",
            }}
          >
            📊 Risk Score
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "800",
              color: riskColor,
              lineHeight: "1.2",
            }}
          >
            {asteroid.riskScore}
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: riskColor,
                marginLeft: "4px",
              }}
            >
              pts
            </span>
          </p>
        </div>
      </div>

      {/* Status footer with enhanced styling */}
      <div
        style={{
          borderTop: `2px solid ${borderColor}30`,
          paddingTop: "14px",
          marginTop: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "12px",
          }}
        >
          <span
            style={{
              color: "#6b7280",
              fontWeight: "600",
              letterSpacing: "0.3px",
              textTransform: "uppercase",
            }}
          >
            Status
          </span>
          <span
            style={{
              background: tagBg,
              color: riskColor,
              padding: "6px 14px",
              borderRadius: "8px",
              fontWeight: "700",
              border: `1.5px solid ${riskColor}`,
              letterSpacing: "0.3px",
            }}
          >
            {asteroid.riskLevel === "High"
              ? "🚨 Hazardous"
              : asteroid.riskLevel === "Medium"
                ? "⚠️ Monitor"
                : "✅ Safe"}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes slide {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default AsteroidCard;
