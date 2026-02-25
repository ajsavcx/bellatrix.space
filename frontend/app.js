const { useState, useEffect, useRef } = React;

// --- API Service ---
const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? "http://localhost:8000/api"
    : "/api";

// --- Components ---

// 1. Animated Star Background
function StarBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const stars = [];
        const numStars = 200;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5
            });
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();

                star.y -= star.speed;
                if (star.y < 0) star.y = height;
            });
            requestAnimationFrame(animate);
        }
        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas id="star-canvas" ref={canvasRef} />;
}

// 2. Satellite Card
function SatelliteCard({ sat, onClick }) {
    const riskColor = sat.risk_level === 'High' ? 'var(--risk-high)' :
        sat.risk_level === 'Medium' ? 'var(--risk-med)' :
            'var(--risk-safe)';

    return (
        <div className={`sat-card risk-${sat.risk_level}`} onClick={() => onClick(sat)}>
            <div className="card-header">
                <span className="sat-name">{sat.name}</span>
                <span className="sat-type">{sat.orbit_type}</span>
            </div>
            <div className="card-metrics">
                <div className="metric">
                    <label>Altitude</label>
                    <value>{sat.altitude_km} km</value>
                </div>
                <div className="metric">
                    <label>Velocity</label>
                    <value>{sat.velocity_kms} km/s</value>
                </div>
            </div>
            <div className="risk-indicator" style={{ color: riskColor }}>
                <div className="dot" style={{ backgroundColor: riskColor }}></div>
                {sat.risk_level} Risk
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {sat.description}
            </div>
        </div>
    );
}

// 3. 3D Visualization (Simplified for the new layout)
// In a full implementation, this would receive the selected satellite ID and render its orbit
function OrbitViz({ selectedSat }) {
    const mountRef = useRef(null);
    useEffect(() => {
        if (!mountRef.current) return;

        // Basic Three.js setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 10000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.innerHTML = '';
        mountRef.current.appendChild(renderer.domElement);

        // Earth
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x001133,
            emissive: 0x000510,
            specular: 0x111111,
            shininess: 10,
            wireframe: true // Holographic look
        });
        const earth = new THREE.Mesh(geometry, material);
        scene.add(earth);

        // Lights
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 10, 10);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0x404040));

        camera.position.z = 15;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            earth.rotation.y += 0.002;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (!mountRef.current) return;
            const w = mountRef.current.clientWidth;
            const h = mountRef.current.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Run once for demo

    return (
        <div className="viz-container" style={{ width: '100%', height: '100%' }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%' }}></div>
            <div className="viz-overlay">
                <div className="viz-panel">
                    <h3>Scanning Sector 4</h3>
                    {selectedSat ? (
                        <div>Tracking: <span style={{ color: 'var(--primary-glow)' }}>{selectedSat.name}</span></div>
                    ) : (
                        <div>Select a satellite to track</div>
                    )}
                </div>
            </div>
        </div>
    );
}

// 4. Main App
function App() {
    const [satellites, setSatellites] = useState([]);
    const [selectedSat, setSelectedSat] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch dashboard data
        fetch(`${API_BASE}/satellites`)
            .then(res => res.json())
            .then(data => {
                setSatellites(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch satellites:", err);
                setLoading(false);
            });
    }, []);

    return (
        <React.Fragment>
            <StarBackground />

            <header className="app-header">
                <div className="brand">
                    <h1>Bellatrix</h1>
                    <p>Advanced satellite risk monitoring and orbital analytics</p>
                </div>
                <div className="header-status">
                    <div className="status-item"><span>Status:</span> ONLINE</div>
                    <div className="status-item"><span>Objects:</span> {satellites.length}</div>
                    <div className="status-item"><span>Risk:</span> LOW</div>
                </div>
            </header>

            <div className="main-content">
                {/* Sidebar Cards */}
                <div className="dashboard-grid">
                    {loading ? (
                        <div className="state-msg">Initializing Uplink...</div>
                    ) : (
                        satellites.map(sat => (
                            <SatelliteCard
                                key={sat.norad_id}
                                sat={sat}
                                onClick={setSelectedSat}
                            />
                        ))
                    )}
                </div>

                {/* Main 3D View */}
                <OrbitViz selectedSat={selectedSat} />
            </div>
        </React.Fragment>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
