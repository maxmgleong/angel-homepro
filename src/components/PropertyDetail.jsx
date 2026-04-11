import { ArrowLeft, Wifi, Snowflake, Refrigerator, Car, Bed } from 'lucide-react'

const ICONS = { wifi: Wifi, ac: Snowflake, peti_sejuk: Refrigerator, car: Car }
const FAC_LABEL = { wifi: 'WiFi', ac: 'AC', peti_sejuk: 'Peti Sejuk', car: 'Parking' }

function formatFacilityName(f) {
  if (FAC_LABEL[f]) return FAC_LABEL[f]
  return f.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

export default function PropertyDetail({ property, onBack, onRoomClick }) {
  return (
    <div className="min-h-screen bg-accent">
      {/* Header with Property Image */}
      <div className="relative">
        <img src={property.image} alt={property.name} className="w-full h-64 object-cover"
          onError={e => e.target.src = 'https://placehold.co/600x400/e8f5f1/4A9B8C?text=Property'} />
        <button onClick={onBack} className="absolute top-4 left-4 bg-white/90 w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
          <ArrowLeft size={20} className="text-primary" />
        </button>
      </div>
      
      <div className="px-4 -mt-8 relative z-10">
        {/* Property Info Card */}
        <div className="bg-white rounded-3xl card-shadow p-5 mb-4">
          <h2 className="text-xl font-bold text-primary mb-2">{property.name}</h2>
          <p className="text-muted text-sm mb-3">📍 {property.location}</p>
          
          {/* Description */}
          {property.description && (
            <div className="bg-accent rounded-xl p-4">
              <p className="text-sm font-semibold text-primary mb-2">📝 Deskripsi:</p>
              <p className="text-sm text-gray-700 leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>{property.description}</p>
            </div>
          )}
        </div>

        {/* Rooms Section */}
        <h3 className="text-base font-bold text-primary mb-3">🏠 {property.rooms.length} Bilik Tersedia</h3>
        
        <div className="space-y-4 pb-6">
          {property.rooms.map(room => {
            const kosong = room.beds.filter(b => !b.occupied).length
            return (
              <div key={room.id} onClick={() => onRoomClick(room)} className="bg-white rounded-2xl card-shadow overflow-hidden cursor-pointer active:scale-[0.99] transition-transform">
                {/* Room Image */}
                <div className="relative">
                  <img src={room.image || property.image} alt={room.name} className="w-full h-40 object-cover"
                    onError={e => e.target.src = 'https://placehold.co/600x300/e8f5f1/4A9B8C?text=Room'} />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${kosong > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      {kosong > 0 ? `🟢 ${kosong} Katil` : '🔴 Penuh'}
                    </span>
                  </div>
                </div>
                
                {/* Room Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-primary text-base">{room.name}</h4>
                    <p className="text-primary font-bold">RM {room.price || 0}/bulan</p>
                  </div>
                  
                  {/* Room Description */}
                  {room.description && (
                    <p className="text-xs text-gray-500 mb-3 leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>{room.description}</p>
                  )}
                  
                  {/* Beds */}
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-primary mb-1">🛏️ Katil:</p>
                    <div className="flex flex-wrap gap-1">
                      {room.beds.map(b => (
                        <span key={b.id} className={`px-2 py-1 rounded-lg text-xs font-medium ${b.occupied ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                          {b.name}: RM {b.price || room.price || 0}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Facilities */}
                  {room.facilities.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {room.facilities.map(f => {
                        const Icon = ICONS[f]
                        return (
                          <span key={f} className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded text-xs text-blue-700">
                            {Icon ? <Icon size={10} /> : <span>✨</span>}
                            {formatFacilityName(f)}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
