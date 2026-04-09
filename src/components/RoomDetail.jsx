import { ArrowLeft, Wifi, Snowflake, Refrigerator, MapPin, Maximize } from 'lucide-react'
import { FACILITIES } from '../data/rooms'

const ICONS = { Wifi, Snowflake, Refrigerator }

export default function RoomDetail({ room, onBack, onBook }) {
  return (
    <div className="min-h-screen bg-accent">
      <div className="relative">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-72 object-cover"
          onError={e => { e.target.src = 'https://placehold.co/600x300/e8f5f1/4A9B8C?text=Bilik' }}
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/90 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
        >
          <ArrowLeft size={20} className="text-primary" />
        </button>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            room.status === 'kosong' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {room.status === 'kosong' ? 'Kosong' : 'Telah Ditempah'}
          </span>
        </div>
      </div>

      <div className="px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-3xl card-shadow p-5 mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-lg font-bold text-primary">{room.name}</h2>
              <div className="flex items-center gap-1 text-muted text-sm mt-1">
                <MapPin size={14} />
                {room.location}
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">RM {room.price}</p>
              <p className="text-muted text-xs">sebulan</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted mb-4">
            <Maximize size={14} />
            {room.size}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-4">{room.description}</p>

          <div className="border-t pt-4">
            <p className="text-xs text-muted mb-2 font-semibold uppercase tracking-wide">Fasiliti</p>
            <div className="flex flex-wrap gap-2">
              {room.facilities.map(f => {
                const Icon = ICONS[f]
                return (
                  <div key={f} className="flex items-center gap-1.5 bg-accent px-3 py-2 rounded-xl">
                    {Icon && <Icon size={16} className="text-primary" />}
                    <span className="text-sm text-primary font-medium">{FACILITIES[f]?.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {room.status === 'kosong' && (
          <button onClick={onBook} className="btn-primary w-full text-center mb-6">
            📋 Tempah Sekarang & Isi Maklumat
          </button>
        )}
      </div>
    </div>
  )
}
