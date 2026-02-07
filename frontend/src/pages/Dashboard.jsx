import { useEffect, useState } from "react";
import { fetchAsteroids } from "../services/api";
import AsteroidCard from "../components/asteroidCard";
import Asteroid3DViewer from "../components/Asteroid3DViewer";
import OrbitViewer3D from "../components/OrbitViewer3D";

const Dashboard = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("riskScore");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const [viewerTab, setViewerTab] = useState("3d");

  useEffect(() => {
    const loadAsteroids = async () => {
      try {
        const res = await fetchAsteroids();
        setAsteroids(res.data);
      } catch (err) {
        setError("Failed to load asteroid data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAsteroids();
  }, []);

  const getSortedAsteroids = (list) => {
    const sorted = [...list];
    switch (sortBy) {
      case "riskScore":
        return sorted.sort((a, b) => b.riskScore - a.riskScore);
      case "distance":
        return sorted.sort((a, b) => a.missDistance - b.missDistance);
      case "diameter":
        return sorted.sort((a, b) => b.diameter - a.diameter);
      case "velocity":
        return sorted.sort((a, b) => b.velocity - a.velocity);
      default:
        return sorted;
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          🚀 Loading asteroid data...
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "#dc2626",
            fontSize: "18px",
            background: "#fee2e2",
            padding: "20px 30px",
            borderRadius: "12px",
            border: "2px solid #fca5a5",
          }}
        >
          ⚠️ {error}
        </div>
      </div>
    );
  }

  const filteredAsteroids = {
    all: asteroids,
    high: asteroids.filter((a) => a.riskLevel === "High"),
    medium: asteroids.filter((a) => a.riskLevel === "Medium"),
    low: asteroids.filter((a) => a.riskLevel === "Low"),
  };

  const hazardousCount = asteroids.filter((a) => a.riskLevel === "High").length;
  const mediumCount = asteroids.filter((a) => a.riskLevel === "Medium").length;
  const safeCount = asteroids.filter((a) => a.riskLevel === "Low").length;

  const displayedAsteroids = getSortedAsteroids(filteredAsteroids[filter]);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)",
        minHeight: "100vh",
        paddingBottom: "40px",
      }}
    >
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .stat-card {
          animation: slideInUp 0.6s ease-out;
        }
      `}</style>
      {/* Header Section */}
      <div
        style={{
          padding: "40px 20px",
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(11, 61, 145, 0.05) 0%, rgba(30, 64, 175, 0.05) 100%)",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#0b3d91",
            margin: "0 0 10px 0",
          }}
        >
          🌍 Near-Earth Asteroid Risk Dashboard
        </h1>
        <p
          style={{
            color: "#1e40af",
            fontSize: "16px",
            margin: 0,
          }}
        >
          Real-time monitoring of potentially hazardous asteroids
        </p>
      </div>

      {/* Stats Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "30px 20px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          className="stat-card"
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            border: "2px solid #dbeafe",
          }}
        >
          <h3
            style={{
              color: "#0b3d91",
              margin: "0 0 10px 0",
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Total Asteroids
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "bold",
              color: "#1e40af",
            }}
          >
            {asteroids.length}
          </p>
        </div>

        <div
          className="stat-card"
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            border: "2px solid #fee2e2",
          }}
        >
          <h3
            style={{
              color: "#dc2626",
              margin: "0 0 10px 0",
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            High Risk
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "bold",
              color: "#dc2626",
            }}
          >
            {hazardousCount}
          </p>
        </div>

        <div
          className="stat-card"
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            border: "2px solid #fed7aa",
          }}
        >
          <h3
            style={{
              color: "#ea580c",
              margin: "0 0 10px 0",
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Medium Risk
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "bold",
              color: "#ea580c",
            }}
          >
            {mediumCount}
          </p>
        </div>

        <div
          className="stat-card"
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            border: "2px solid #dcfce7",
          }}
        >
          <h3
            style={{
              color: "#16a34a",
              margin: "0 0 10px 0",
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Safe
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "bold",
              color: "#16a34a",
            }}
          >
            {safeCount}
          </p>
        </div>
      </div>

      {/* Controls Section */}
      <div
        style={{
          padding: "0 20px 30px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Filter */}
        <div style={{ marginBottom: "20px" }}>
          <span
            style={{ fontWeight: "600", color: "#0b3d91", marginRight: "12px" }}
          >
            Filter:
          </span>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {[
              { key: "all", label: "All", color: "#0b3d91" },
              { key: "high", label: "High Risk", color: "#dc2626" },
              { key: "medium", label: "Medium Risk", color: "#ea580c" },
              { key: "low", label: "Safe", color: "#16a34a" },
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setFilter(btn.key)}
                style={{
                  padding: "8px 16px",
                  background: filter === btn.key ? btn.color : "white",
                  color: filter === btn.key ? "white" : btn.color,
                  border: `2px solid ${btn.color}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  if (filter !== btn.key) {
                    e.target.style.background = btn.color;
                    e.target.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== btn.key) {
                    e.target.style.background = "white";
                    e.target.style.color = btn.color;
                  }
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort and View Options */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <label
              style={{
                fontWeight: "600",
                color: "#0b3d91",
                marginRight: "12px",
              }}
            >
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "8px 16px",
                border: "2px solid #0b3d91",
                borderRadius: "8px",
                background: "white",
                color: "#0b3d91",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              <option value="riskScore">Risk Score</option>
              <option value="distance">Closest Distance</option>
              <option value="diameter">Size</option>
              <option value="velocity">Velocity</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setViewMode("grid")}
              style={{
                padding: "8px 16px",
                background: viewMode === "grid" ? "#0b3d91" : "white",
                color: viewMode === "grid" ? "white" : "#0b3d91",
                border: "2px solid #0b3d91",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.3s",
              }}
              title="Grid view"
            >
              ⊞ Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              style={{
                padding: "8px 16px",
                background: viewMode === "list" ? "#0b3d91" : "white",
                color: viewMode === "list" ? "white" : "#0b3d91",
                border: "2px solid #0b3d91",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.3s",
              }}
              title="List view"
            >
              ☰ List
            </button>
          </div>
        </div>
      </div>

      {/* Asteroids Display */}
      <div
        style={{
          padding: "0 20px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {displayedAsteroids.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#666",
              fontSize: "18px",
            }}
          >
            No asteroids found in this category
          </div>
        ) : viewMode === "grid" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {displayedAsteroids.map((asteroid, index) => (
              <div
                key={index}
                onClick={() =>
                  setSelectedAsteroid(
                    selectedAsteroid?.name === asteroid.name ? null : asteroid,
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <AsteroidCard asteroid={asteroid} />
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {displayedAsteroids.map((asteroid, index) => (
              <div
                key={index}
                onClick={() =>
                  setSelectedAsteroid(
                    selectedAsteroid?.name === asteroid.name ? null : asteroid,
                  )
                }
                style={{
                  display: "flex",
                  background: "white",
                  borderRadius: "12px",
                  padding: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  border:
                    selectedAsteroid?.name === asteroid.name
                      ? "2px solid #0b3d91"
                      : "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.15)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      color: "#0b3d91",
                      fontWeight: "600",
                    }}
                  >
                    {asteroid.name}
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: "12px",
                      fontSize: "14px",
                    }}
                  >
                    <div>
                      📏 Diameter: <strong>{asteroid.diameter}m</strong>
                    </div>
                    <div>
                      🚀 Velocity:{" "}
                      <strong>
                        {(asteroid.velocity / 1000).toFixed(1)} km/s
                      </strong>
                    </div>
                    <div>
                      🌍 Distance:{" "}
                      <strong>
                        {(asteroid.missDistance / 1e6).toFixed(2)}M km
                      </strong>
                    </div>
                    <div>
                      📊 Risk:{" "}
                      <strong
                        style={{
                          color:
                            asteroid.riskLevel === "High"
                              ? "#dc2626"
                              : asteroid.riskLevel === "Medium"
                                ? "#ea580c"
                                : "#16a34a",
                        }}
                      >
                        {asteroid.riskLevel}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3D Viewer Modal */}
      {selectedAsteroid && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setSelectedAsteroid(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(4px)",
              zIndex: 999,
              animation: "fadeIn 0.3s ease-out",
            }}
          />

          {/* Modal */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              zIndex: 1000,
              maxWidth: "750px",
              width: "90%",
              maxHeight: "85vh",
              overflow: "auto",
              animation: "slideUp 0.3s ease-out",
            }}
          >
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translate(-50%, -40%);
                }
                to {
                  opacity: 1;
                  transform: translate(-50%, -50%);
                }
              }
              .modal-close:hover {
                transform: rotate(90deg) !important;
              }
              .tab-button {
                padding: 10px 16px;
                border: none;
                background: transparent;
                color: #666;
                cursor: pointer;
                fontWeight: 600;
                fontSize: 14px;
                borderBottom: 3px solid transparent;
                transition: all 0.3s;
              }
              .tab-button.active {
                color: #0b3d91;
                borderBottomColor: #0b3d91;
              }
              .tab-button:hover {
                color: #0b3d91;
              }
            `}</style>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div>
                <h2 style={{ margin: 0, color: "#0b3d91", fontSize: "24px" }}>
                  🌑 {selectedAsteroid.name}
                </h2>
              </div>
              <button
                className="modal-close"
                onClick={() => setSelectedAsteroid(null)}
                style={{
                  background: "#fee2e2",
                  color: "#dc2626",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "20px",
                  transition: "transform 0.3s",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>

            {/* Tab Navigation */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "20px",
              }}
            >
              <button
                className={`tab-button ${viewerTab === "3d" ? "active" : ""}`}
                onClick={() => setViewerTab("3d")}
              >
                🔷 3D Model
              </button>
              <button
                className={`tab-button ${viewerTab === "orbit" ? "active" : ""}`}
                onClick={() => setViewerTab("orbit")}
              >
                🪐 Orbital Path
              </button>
            </div>

            {/* 3D Model Tab */}
            {viewerTab === "3d" && (
              <div>
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)",
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  <Asteroid3DViewer asteroid={selectedAsteroid} size={390} />
                </div>

                <p
                  style={{
                    margin: "0 0 16px 0",
                    fontSize: "13px",
                    color: "#999",
                    textAlign: "center",
                  }}
                >
                  Close-up 3D visualization of the asteroid
                </p>
              </div>
            )}

            {/* Orbit View Tab */}
            {viewerTab === "orbit" && (
              <div>
                <div
                  style={{
                    background: "#000011",
                    borderRadius: "12px",
                    padding: "10px",
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  <OrbitViewer3D asteroid={selectedAsteroid} size={400} />
                </div>

                <p
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "13px",
                    color: "#999",
                    textAlign: "center",
                  }}
                >
                  Interactive 3D view showing the asteroid's orbit relative to
                  Earth. Right-click and drag to rotate. Scroll to zoom.
                </p>
              </div>
            )}

            {/* Data Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginTop: "16px",
              }}
            >
              <div
                style={{
                  background: "#f0f4ff",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #e0e7ff",
                }}
              >
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "11px",
                    color: "#666",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  Distance
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#0b3d91",
                  }}
                >
                  {selectedAsteroid.missDistance?.toFixed(0) || "N/A"} km
                </p>
              </div>
              <div
                style={{
                  background: "#f0f4ff",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #e0e7ff",
                }}
              >
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "11px",
                    color: "#666",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  Diameter
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#0b3d91",
                  }}
                >
                  {selectedAsteroid.diameter?.toFixed(2) || "N/A"} km
                </p>
              </div>
              <div
                style={{
                  background: "#f0f4ff",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #e0e7ff",
                }}
              >
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "11px",
                    color: "#666",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  Velocity
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#0b3d91",
                  }}
                >
                  {selectedAsteroid.velocity?.toFixed(1) || "N/A"} km/s
                </p>
              </div>
              <div
                style={{
                  background: "#f0f4ff",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #e0e7ff",
                }}
              >
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "11px",
                    color: "#666",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  Risk Level
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#0b3d91",
                  }}
                >
                  {selectedAsteroid.riskLevel || "Safe"}
                </p>
              </div>
            </div>

            <p
              style={{
                margin: "12px 0 0 0",
                fontSize: "12px",
                color: "#999",
                textAlign: "center",
              }}
            >
              Click the backdrop to close
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
