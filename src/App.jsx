import { useState, useEffect } from 'react'
import { ROOMS, FACILITIES } from './data/rooms'
import Header from './components/Header'
import FilterTabs from './components/FilterTabs'
import RoomCard from './components/RoomCard'
import RoomDetail from './components/RoomDetail'
import TenantForm from './components/TenantForm'
import SuccessPage from './components/SuccessPage'
import Dashboard from './components/Dashboard'

export default function App() {
  const [view, setView] = useState('rooms') // 'rooms' | 'detail' | 'form' | 'success' | 'dashboard'
  const [filter, setFilter] = useState('semua') // 'semua' | 'kosong'
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [tenants, setTenants] = useState([])
  const [rooms, setRooms] = useState(ROOMS)

  useEffect(() => {
    const saved = localStorage.getItem('bilik_tenants')
    if (saved) setTenants(JSON.parse(saved))
  }, [])

  const filteredRooms = filter === 'kosong'
    ? rooms.filter(r => r.status === 'kosong')
    : rooms

  function handleRoomClick(room) {
    setSelectedRoom(room)
    setView('detail')
  }

  function handleBook(room) {
    setSelectedRoom(room)
    setView('form')
  }

  function handleFormSubmit(tenantData) {
    const newTenant = { ...tenantData, roomId: selectedRoom.id, appliedAt: new Date().toISOString() }
    const updated = [...tenants, newTenant]
    setTenants(updated)
    localStorage.setItem('bilik_tenants', JSON.stringify(updated))
    setView('success')
  }

  function handleConfirmEntry(tenantId) {
    const updated = rooms.map(r =>
      r.id === tenantId ? { ...r, status: 'ditempah' } : r
    )
    setRooms(updated)
  }

  const kosongCount = rooms.filter(r => r.status === 'kosong').length

  return (
    <div className="min-h-screen bg-accent pb-8">
      {view === 'rooms' && (
        <>
          <Header onDashboard={() => setView('dashboard')} kosongCount={kosongCount} />
          <FilterTabs filter={filter} onFilterChange={setFilter} />
          <div className="px-4 space-y-4">
            {filteredRooms.map(room => (
              <RoomCard
                key={room.id}
                room={room}
                onClick={() => handleRoomClick(room)}
              />
            ))}
            {filteredRooms.length === 0 && (
              <div className="text-center py-12 text-muted">
                <p className="text-lg">Tiada bilik dijumpai</p>
              </div>
            )}
          </div>
        </>
      )}

      {view === 'detail' && selectedRoom && (
        <RoomDetail
          room={selectedRoom}
          onBack={() => setView('rooms')}
          onBook={() => handleBook(selectedRoom)}
        />
      )}

      {view === 'form' && selectedRoom && (
        <TenantForm
          room={selectedRoom}
          onBack={() => setView('detail')}
          onSubmit={handleFormSubmit}
        />
      )}

      {view === 'success' && (
        <SuccessPage
          room={selectedRoom}
          onHome={() => { setView('rooms'); setSelectedRoom(null) }}
        />
      )}

      {view === 'dashboard' && (
        <Dashboard
          tenants={tenants}
          rooms={rooms}
          onBack={() => setView('rooms')}
          onConfirm={handleConfirmEntry}
        />
      )}
    </div>
  )
}
