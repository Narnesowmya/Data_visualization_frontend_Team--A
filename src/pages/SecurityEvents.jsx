import { useState, useEffect } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import Filters from '../components/Filters.jsx'
import EventTable from '../components/EventTable.jsx'
import EventDetailDrawer from '../components/EventDetailDrawer.jsx'
import { getEvents } from '../services/api.js'

const DEFAULT_FILTERS = {
    severity: 'All',
    eventType: 'All',
    dateRange: 'All',
    searchIp: ''
}

export default function SecurityEvents() {
    const [filters, setFilters] = useState(DEFAULT_FILTERS)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [drawerOpen, setDrawerOpen] = useState(false)

    useEffect(() => {
        setLoading(true)
        getEvents(filters)
            .then((data) => {
                setEvents(data.events || [])
                setError(null)
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [filters])

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const handleResetFilters = () => {
        setFilters(DEFAULT_FILTERS)
    }

    const handleRowClick = (event) => {
        setSelectedEvent(event)
        setDrawerOpen(true)
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: '#F8FAFC', mb: 3 }}>
                Security Events
            </Typography>

            <Filters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
            />

            <Box sx={{ mt: 3 }}>
                {loading && <CircularProgress sx={{ color: '#22D3EE' }} />}
                {error && <Typography sx={{ color: '#F87171' }}>Failed to load events: {error}</Typography>}
                {!loading && !error && (
                    <EventTable events={events} loading={loading} onSelectEvent={handleRowClick} />
                )}
            </Box>

            <EventDetailDrawer
                event={selectedEvent}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
        </Box>
    )
}