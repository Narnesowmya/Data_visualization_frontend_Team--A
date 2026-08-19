import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SecurityEvents from './pages/SecurityEvents.jsx'
import ThreatIntelligence from './pages/ThreatIntelligence.jsx'
import Vulnerabilities from './pages/Vulnerabilities.jsx'

function EmptyPage({ title }) {
    return (
        <div
            style={{
                padding: '40px',
                color: '#F8FAFC',
                fontFamily: 'Sora, sans-serif'
            }}
        >
            <h1>{title}</h1>
            <p style={{ color: '#94A3B8' }}>
                This section is ready to be connected to the dashboard data.
            </p>
        </div>
    )
}

function App() {
    return (
        <Routes>
            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Main Dashboard */}
            <Route path="/dashboard" element={<Dashboard />}>
                {/* Dashboard sub-pages */}
                <Route
                    path="events"
                    element={<SecurityEvents />}
                />
                <Route
                    path="threat-intel"
                    element={<ThreatIntelligence />}
                />
                <Route
                    path="vulnerabilities"
                    element={<Vulnerabilities />}
                />
                <Route
                    path="analytics"
                    element={<EmptyPage title="Analytics" />}
                />
            </Route>

            {/* Default */}
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            {/* Unknown route */}
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    )
}

export default App