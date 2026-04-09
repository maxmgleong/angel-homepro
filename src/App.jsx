import { useState, useEffect } from 'react'
import { INITIAL_PROPERTIES } from './data/properties'
import Header from './components/Header'
import PropertyCard from './components/PropertyCard'
import PropertyDetail from './components/PropertyDetail'
import RoomDetail from './components/RoomDetail'
import TenantForm from './components/TenantForm'
import SuccessPage from './components/SuccessPage'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'

const STORAGE_KEY = 'bilik_properties'

export default function App() {
  const [view, setView] = useState('rooms') // 'rooms' | 'detail' | 'room' | 'form' | 'success' | 'dashboard' | 'admin'
  const [filter, setFilter] = useState('semua') // 'semua' | 'kosong'
  const [properties, setProperties] = useState([])
  const [selectedProp, setSelectedProp] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [tenants, setTenants] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setProperties(JSON.parse(saved))
    } else {
      setProperties(INITIAL_PROPERTIES)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROPERTIES))
    }
    const savedTenants = localStorage.getItem('bilik_tenants')
    if (savedTenants) setTenants(JSON.parse(savedTenants))
  }, [])

  function saveProperties(props) {
    setProperties(props)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(props))
  }

  function getFilteredProperties() {
    if (filter === 'kosong') {
      return properties.filter(p => p.rooms.some(r => r.beds.some(b => !b.occupied)))
    }
    return properties
  }

  function handlePropertyClick(prop) {
    setSelectedProp(prop)
    setView('detail')
  }

  function handleRoomClick(room, prop) {
    setSelectedRoom(room)
    setSelectedProp(prop)
    setView('room')
  }

  function handleBook(room) {
    setSelectedRoom(room)
    setView('form')
  }

  function handleFormSubmit(tenantData) {
    const newTenant = { ...tenantData, roomId: selectedRoom.id, propId: selectedProp.id, appliedAt: new Date().toISOString() }
    const updated = [...tenants, newTenant]
    setTenants(updated)
    localStorage.setItem('bilik_tenants', JSON.stringify(updated))
    setView('success')
  }

  function handleConfirmEntry(propId, roomId) {
    const updatedProps = properties.map(p => {
      if (p.id !== propId) return p
      return {
        ...p,
        rooms: p.rooms.map(r => {
          if (r.id !== roomId) return r
          return { ...r, status: 'ditempah' }
        })
      }
    })
    saveProperties(updatedProps)
    if (selectedProp) {
      const updated = updatedProps.find(p => p.id === selectedProp.id)
      if (updated) setSelectedProp(updated)
    }
  }

  const kosongCount = properties.reduce((a, p) => a + p.rooms.reduce((b, r) => b + r.beds.filter(b => !b.occupied).length, 0), 0)
  const totalBeds = properties.reduce((a, p) => a + p.rooms.reduce((b, r) => b + r.beds.length, 0), 0)

  return (
    <div className="min-h-screen bg-accent pb-8">
      {view === 'rooms' && (
        <>
          <Header onDashboard={() => setView('dashboard')} onAdmin={() => setView('admin')} kosongCount={kosongCount} totalBeds={totalBeds} />
          <FilterTabs filter={filter} onFilterChange={setFilter} />
          <div className="px-4 space-y-4">
            {getFilteredProperties().map(prop => (
              <PropertyCard key={prop.id} property={prop} onClick={() => handlePropertyClick(prop)} />
            ))}
            {getFilteredProperties().length === 0 && (
              <div className="text-center py-12 text-muted">
                <p className="text-lg">Tiada property dijumpai</p>
              </div>
            )}
          </div>
          <div className="px-4 mt-6 mb-4">
            <div className="bg-white rounded-3xl card-shadow p-5 text-center">
              <div className="text-lg mb-1">🏠 Angel HomePro</div>
              <p className="text-muted text-xs mb-3">Tambah ke skrin utama telefon anda</p>
              <a href="https://bilik-rental.maxmgleong.workers.dev/" className="inline-block bg-primary hover:bg-dark text-white font-semibold py-3 px-6 rounded-2xl transition-all active:scale-95 text-sm">
                🌐 Buka & Pasang
              </a>
              <p className="text-xs text-muted mt-3 font-mono">bilik-rental.maxmgleong.workers.dev</p>
            </div>
          </div>
        </>
      )}

      {view === 'detail' && selectedProp && (
        <PropertyDetail
          property={selectedProp}
          onBack={() => setView('rooms')}
          onRoomClick={(room) => handleRoomClick(room, selectedProp)}
        />
      )}

      {view === 'room' && selectedRoom && selectedProp && (
        <RoomDetail
          room={selectedRoom}
          property={selectedProp}
          onBack={() => setView('detail')}
          onBook={() => handleBook(selectedRoom)}
        />
      )}

      {view === 'form' && selectedRoom && (
        <TenantForm
          room={selectedRoom}
          property={selectedProp}
          onBack={() => setView('room')}
          onSubmit={handleFormSubmit}
        />
      )}

      {view === 'success' && (
        <SuccessPage
          room={selectedRoom}
          property={selectedProp}
          onHome={() => { setView('rooms'); setSelectedRoom(null); setSelectedProp(null) }}
        />
      )}

      {view === 'dashboard' && (
        <Dashboard
          tenants={tenants}
          properties={properties}
          onBack={() => setView('rooms')}
          onConfirm={handleConfirmEntry}
        />
      )}

      {view === 'admin' && (
        <AdminPanel
          properties={properties}
          tenants={tenants}
          onSave={saveProperties}
          onBack={() => setView('rooms')}
        />
      )}
    </div>
  )
}
